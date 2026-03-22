package com.api.urlshortener.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class IpRateLimiterService {
    private final int maxRequests;
    private final long windowMillis;

    private final ConcurrentHashMap<String, CounterWindow> counters = new ConcurrentHashMap<>();
    private final AtomicLong cleanupTicker = new AtomicLong(0);

    public IpRateLimiterService(
            @Value("${app.rate-limit.create-url.max-requests:20}") int maxRequests,
            @Value("${app.rate-limit.create-url.window-seconds:60}") long windowSeconds
    ) {
        this.maxRequests = Math.max(1, maxRequests);
        this.windowMillis = Math.max(1, windowSeconds) * 1000L;
    }

    public boolean tryConsume(String ipAddress) {
        long now = System.currentTimeMillis();

        CounterWindow updatedWindow = counters.compute(ipAddress, (key, current) -> {
            if (current == null || now - current.windowStartMillis() >= windowMillis) {
                return new CounterWindow(now, 1);
            }

            return new CounterWindow(current.windowStartMillis(), current.requests() + 1);
        });

        if (cleanupTicker.incrementAndGet() % 250 == 0) {
            cleanupExpiredWindows(now);
        }

        return updatedWindow.requests() <= maxRequests;
    }

    private void cleanupExpiredWindows(long now) {
        counters.entrySet().removeIf(entry -> now - entry.getValue().windowStartMillis() >= windowMillis);
    }

    private record CounterWindow(long windowStartMillis, int requests) {
    }
}
