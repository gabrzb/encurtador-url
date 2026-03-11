package com.api.urlshortener.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

public class UrlDTO {
    @Data
    public static class CreateRequest {
        @NotBlank
        @Size(max = 2048)
        @Pattern(regexp = "^https?://.*")
        private String originalUrl;

        @Min(1)
        @Max(30)
        private Integer expirationDays;
    }

    @Data
    public static class UrlResponse {
        private String shortUrl;
        private String originalUrl;
        private String expiresAt;

        private String shortCode;
        private Long clickCount;
        private String createdAt;
        private long daysUntilExpiry;
    }
}
