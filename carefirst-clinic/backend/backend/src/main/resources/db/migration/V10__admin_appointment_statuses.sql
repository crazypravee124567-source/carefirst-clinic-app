ALTER TABLE appointment DROP CONSTRAINT appointment_status_check;
ALTER TABLE appointment ADD CONSTRAINT appointment_status_check
    CHECK (status IN ('BOOKED', 'IN_PROGRESS', 'DONE', 'CANCELLED'));
