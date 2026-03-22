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
    private final boolean failOpen;
    private final StringRedisTemplate redisTemplate;

    public IpRateLimiterService(
            StringRedisTemplate redisTemplate,
            @Value("${app.rate-limit.create-url.max-requests:20}") int maxRequests,
            @Value("${app.rate-limit.create-url.window-seconds:60}") long windowSeconds,
            @Value("${app.rate-limit.create-url.fail-open:true}") boolean failOpen
    ) {
        this.redisTemplate = redisTemplate;
        this.maxRequests = Math.max(1, maxRequests);
        this.windowMillis = Math.max(1, windowSeconds) * 1000L;
        this.failOpen = failOpen;
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
                if (failOpen) {
                    log.warn("Redis returned null while evaluating rate limit. failOpen=true, allowing request for {}.", normalizedIp);
                    return true;
                }

                log.warn("Redis returned null while evaluating rate limit. failOpen=false, denying request for {}.", normalizedIp);
                return false;
            }

            return requestCount <= maxRequests;
        } catch (Exception ex) {
            if (failOpen) {
                log.warn("Rate-limit backend unavailable. failOpen=true, allowing request for {}.", normalizedIp, ex);
                return true;
            }

            log.error("Rate-limit backend unavailable. failOpen=false, denying request for {}.", normalizedIp, ex);
            return false;
        }
    }

    private String normalizeIpAddress(String ipAddress) {
        if (ipAddress == null || ipAddress.isBlank()) {
            return "unknown";
        }

        return ipAddress.trim();
    }
}
