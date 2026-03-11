package com.api.urlshortener.controller;

import com.api.urlshortener.dto.UrlDTO;
import com.api.urlshortener.service.UrlService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UrlController {
    private final UrlService urlService;

    @PostMapping("/api/urls")
    public ResponseEntity<UrlDTO.UrlResponse> createShortUrl(@Valid @RequestBody UrlDTO.CreateRequest  request) {
        UrlDTO.UrlResponse response = urlService.createShortUrl(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirectToOriginalUrl(@PathVariable String shortCode) {
        String originalUrl = urlService.resolveUrl(shortCode);
        return ResponseEntity
                .status(HttpStatus.FOUND)
                .header(HttpHeaders.LOCATION, originalUrl)
                .build();
    }

    @GetMapping("/api/urls")
    public List<UrlDTO.UrlResponse> getUrlStats() {
        return urlService.listActiveUrls();
    }
}
