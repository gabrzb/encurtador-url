package com.api.urlshortener.config;

import com.api.urlshortener.exception.RateLimitExceededException;
import com.api.urlshortener.service.IpRateLimiterService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
@Slf4j
public class CreateUrlRateLimitInterceptor implements HandlerInterceptor {
    private static final int MAX_IP_LENGTH = 45;
    private static final Pattern IPV4_PATTERN = Pattern.compile(
            "^(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}$"
    );
    private static final Pattern IPV6_CANDIDATE_PATTERN = Pattern.compile("^[0-9a-fA-F:.]+$");

    private final IpRateLimiterService ipRateLimiterService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (!HttpMethod.POST.matches(request.getMethod())) {
            return true;
        }

        String clientIp = resolveClientIp(request);

        if (!ipRateLimiterService.tryConsume(clientIp)) {
            throw new RateLimitExceededException("Too many URL creation requests from this IP. Try again in a minute.");
        }

        return true;
    }

    private String resolveClientIp(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");

        if (forwardedFor != null && !forwardedFor.isBlank()) {
            String firstForwardedCandidate = forwardedFor.split(",")[0];
            String validatedForwarded = validateIpCandidate(firstForwardedCandidate, "X-Forwarded-For");

            if (validatedForwarded != null) {
                return validatedForwarded;
            }
        }

        String realIp = request.getHeader("X-Real-IP");
        String validatedRealIp = validateIpCandidate(realIp, "X-Real-IP");

        if (validatedRealIp != null) {
            return validatedRealIp;
        }

        String remoteAddr = request.getRemoteAddr();
        String validatedRemoteAddr = validateIpCandidate(remoteAddr, "request.getRemoteAddr");

        if (validatedRemoteAddr != null) {
            return validatedRemoteAddr;
        }

        log.warn("Could not validate client IP candidates. Falling back to raw remote address.");
        return remoteAddr;
    }

    private String validateIpCandidate(String candidate, String source) {
        if (candidate == null) {
            return null;
        }

        String normalized = candidate.trim();

        if (normalized.isEmpty() || normalized.length() > MAX_IP_LENGTH) {
            log.warn("Ignoring invalid IP from {} due to empty or oversized value.", source);
            return null;
        }

        if (!looksLikeIpLiteral(normalized)) {
            log.warn("Ignoring malformed IP candidate from {}.", source);
            return null;
        }

        try {
            InetAddress.getByName(normalized);
            return normalized;
        } catch (UnknownHostException ex) {
            log.warn("Ignoring unparseable IP candidate from {}.", source);
            return null;
        }
    }

    private boolean looksLikeIpLiteral(String candidate) {
        return IPV4_PATTERN.matcher(candidate).matches()
                || (candidate.contains(":") && IPV6_CANDIDATE_PATTERN.matcher(candidate).matches());
    }
}
