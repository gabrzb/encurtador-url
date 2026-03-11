package com.api.urlshortener.repository;
import com.api.urlshortener.model.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UrlRepository extends JpaRepository<Url, Long> {
    Optional<Url> findByShortCode(String shortCode);
    boolean existsByShortCode(String shortCode);

    @Modifying
    @Query("DELETE FROM Url u WHERE u.expiresAt < :cutoff")
    void deleteByExpiresAtBefore(@Param("cutoff") LocalDateTime cutoff);

    List<Url> findByExpiresAtGreaterThanOrderByCreatedAtDesc(LocalDateTime now);
}
