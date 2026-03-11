package com.api.urlshortener.scheduler;

import com.api.urlshortener.repository.UrlRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class UrlCleanScheduler {
    private final UrlRepository urlRepository;

    // Daily cleanup to prevent expired URLs from growing the table indefinitely.
    // Cron runs at 03:00 every day in UTC.
    @Scheduled(cron = "0 0 3 * * *", zone = "UTC")
    @Transactional
    public void deleteExpiredUrls() {
        LocalDateTime cutoff = LocalDateTime.now();
        urlRepository.deleteByExpiresAtBefore(cutoff);
    }
}
