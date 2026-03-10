package com.api.urlshortener.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    private Map<String, Object> buildError(String message, HttpStatus status) {
        // Keep a consistent error payload across all exception handlers.
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", status.value());
        body.put("message", message);
        return body;
    }

    @ExceptionHandler(UrlNotFoundException.class)
    public ResponseEntity<?> handleNotFound(UrlNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(buildError(ex.getMessage(), HttpStatus.NOT_FOUND));
    }

    @ExceptionHandler(UrlExpiredException.class)
    public ResponseEntity<?> handleExpired(UrlExpiredException ex) {
        return ResponseEntity
                .status(HttpStatus.GONE)
                .body(buildError(ex.getMessage(), HttpStatus.GONE));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        log.warn("Violacao de integridade detectada", ex);
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(buildError("Resource conflict", HttpStatus.CONFLICT));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneral(Exception ex) {
        log.error("Erro interno: ", ex);
        // Do not leak internal details to API consumers.
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(buildError("Ocorreu um erro inesperado", HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {
        // Return structured field errors so clients can map each error to an input field.
        List<Map<String, String>> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
            .map(e -> {
                Map<String, String> fieldError = new LinkedHashMap<>();
                fieldError.put("field", e.getField());
                fieldError.put("message", e.getDefaultMessage());
                return fieldError;
            })
            .collect(Collectors.toList());

        Map<String, Object> body = buildError("Validation failed", HttpStatus.BAD_REQUEST);
        body.put("errors", errors);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
            .body(body);
    }
}
