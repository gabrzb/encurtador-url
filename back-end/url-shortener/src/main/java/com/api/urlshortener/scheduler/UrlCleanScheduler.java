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

    // Executa diariamente às 3h da manhã para evitar sobrecarga durante horários de pico
    @Scheduled(cron = "0 0 3 * * *")
    @Transactional
    public void deleteExpiredUrls() {
        urlRepository.deleteByExpiresAtBefore(LocalDateTime.now());
    }
}
