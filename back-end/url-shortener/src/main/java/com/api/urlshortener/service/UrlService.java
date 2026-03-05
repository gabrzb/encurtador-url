package com.api.urlshortener.service;

import com.api.urlshortener.dto.UrlDTO;
import com.api.urlshortener.exception.UrlExpiredException;
import com.api.urlshortener.exception.UrlNotFoundException;
import com.api.urlshortener.model.Url;
import com.api.urlshortener.repository.UrlRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UrlService {
    private final UrlRepository urlRepository;

    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;

    @Value("${app.expiration-days:30}")
    private int defaultExpirationDays;

    private static final SecureRandom secureRandom = new SecureRandom();

    private String createUniqueShortCode() {
        String shortCode;
        do {
            shortCode = generateShortCode();
        } while (urlRepository.existsByShortCode(shortCode));
        return shortCode;
    }

    private String generateShortCode() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder shortCode = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int index = secureRandom.nextInt(chars.length());;
            shortCode.append(chars.charAt(index));
        }
        return shortCode.toString();
    }

    public UrlDTO.UrlResponse createShortUrl(UrlDTO.CreateRequest  request) {
        int days = request.getExpirationDays() != null
                ? request.getExpirationDays()
                : defaultExpirationDays;

        String shortCode = createUniqueShortCode();

        Url url = Url.builder()
                .originalUrl(request.getOriginalUrl())
                .shortCode(shortCode)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusDays(days))
                .build();

        Url saved = urlRepository.save(url);
        return toResponse(saved);
    }

    public String resolveUrl(String shortCode){
        Url url = urlRepository.findByShortCode(shortCode).orElseThrow(() -> new UrlNotFoundException(shortCode));

        if (url.isExpired()) {
            throw new UrlExpiredException(shortCode);
        }

        url.setClickCount(url.getClickCount() + 1);
        urlRepository.save(url);
        return url.getOriginalUrl();
    }

    public List<UrlDTO.UrlResponse> listActiveUrls(){
        return urlRepository
                .findByExpiresAtGreaterThanOrderByCreatedAtDesc(LocalDateTime.now())
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private UrlDTO.UrlResponse toResponse(Url url) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        UrlDTO.UrlResponse response = new UrlDTO.UrlResponse();

        response.setShortUrl(baseUrl + "/"+ url.getShortCode());
        response.setOriginalUrl(url.getOriginalUrl());
        response.setExpiresAt(url.getExpiresAt().format(formatter));

        response.setShortCode(url.getShortCode());
        response.setClickCount(url.getClickCount());
        response.setCreatedAt(url.getCreatedAt().format(formatter));
        response.setDaysUntilExpiry(ChronoUnit.DAYS.between(LocalDateTime.now(), url.getExpiresAt()));

        return response;
    }
}
