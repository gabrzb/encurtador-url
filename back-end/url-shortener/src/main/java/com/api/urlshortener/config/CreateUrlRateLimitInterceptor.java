package com.api.urlshortener.config;

import com.api.urlshortener.exception.RateLimitExceededException;
import com.api.urlshortener.service.IpRateLimiterService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class CreateUrlRateLimitInterceptor implements HandlerInterceptor {
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
            return forwardedFor.split(",")[0].trim();
        }

        String realIp = request.getHeader("X-Real-IP");

        if (realIp != null && !realIp.isBlank()) {
            return realIp.trim();
        }

        return request.getRemoteAddr();
    }
}
