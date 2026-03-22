package com.api.urlshortener.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@Slf4j
public class IpRateLimiterService {
    private static final String RATE_LIMIT_KEY_PREFIX = "rate_limit:create_url:";
    private static final DefaultRedisScript<Long> RATE_LIMIT_SCRIPT = new DefaultRedisScript<>(
            "local current = redis.call('INCR', KEYS[1]) "
                    + "if current == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]) end "
                    + "return current",
            Long.class
    );

    private final int maxRequests;
    private final long windowMillis;
    private final StringRedisTemplate redisTemplate;

    public IpRateLimiterService(
            StringRedisTemplate redisTemplate,
            @Value("${app.rate-limit.create-url.max-requests:20}") int maxRequests,
            @Value("${app.rate-limit.create-url.window-seconds:60}") long windowSeconds
    ) {
        this.redisTemplate = redisTemplate;
        this.maxRequests = Math.max(1, maxRequests);
        this.windowMillis = Math.max(1, windowSeconds) * 1000L;
    }

    public boolean tryConsume(String ipAddress) {
        String normalizedIp = normalizeIpAddress(ipAddress);
        String key = RATE_LIMIT_KEY_PREFIX + normalizedIp;

        try {
            Long requestCount = redisTemplate.execute(
                    RATE_LIMIT_SCRIPT,
                    Collections.singletonList(key),
                    String.valueOf(windowMillis)
            );

            if (requestCount == null) {
                log.warn("Redis returned null while evaluating rate limit. Allowing request for {}.", normalizedIp);
                return true;
            }

            return requestCount <= maxRequests;
        } catch (Exception ex) {
            log.warn("Rate-limit backend unavailable. Allowing request for {}.", normalizedIp, ex);
            return true;
        }
    }

    private String normalizeIpAddress(String ipAddress) {
        if (ipAddress == null || ipAddress.isBlank()) {
            return "unknown";
        }

        return ipAddress.trim();
    }
}
