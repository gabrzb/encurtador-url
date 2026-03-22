ALTER TABLE urls
    ADD COLUMN IF NOT EXISTS owner_user_id BIGINT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'urls_short_code_key'
    ) THEN
        ALTER TABLE urls
            ADD CONSTRAINT urls_short_code_key UNIQUE (short_code);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_expires_at ON urls(expires_at);
CREATE INDEX IF NOT EXISTS idx_urls_owner_user_id_created_at ON urls(owner_user_id, created_at);
