package com.api.urlshortener.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
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

        @JsonIgnore
        private boolean ownerUserIdPayloadDetected;

        @JsonSetter("owner_user_id")
        public void setOwnerUserIdFromSnakeCase(Object ignored) {
            this.ownerUserIdPayloadDetected = true;
        }

        @JsonSetter("ownerUserId")
        public void setOwnerUserIdFromCamelCase(Object ignored) {
            this.ownerUserIdPayloadDetected = true;
        }

        @AssertTrue(message = "owner_user_id must not be provided")
        @JsonIgnore
        public boolean isOwnerUserIdNotProvided() {
            return !ownerUserIdPayloadDetected;
        }
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
