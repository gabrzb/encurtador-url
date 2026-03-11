CREATE TABLE urls (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code  VARCHAR(10) NOT NULL UNIQUE,
    click_count BIGINT NOT NULL DEFAULT 0,
    created_at  TIMESTAMP NOT NULL,
    expires_at  TIMESTAMP NOT NULL
);

CREATE INDEX idx_expires_at ON urls(expires_at);