CREATE TABLE appointment (
                             id               BIGSERIAL PRIMARY KEY,
                             booking_code     VARCHAR(15)   NOT NULL UNIQUE,
                             doctor_id        BIGINT        NOT NULL REFERENCES doctor (id),
                             patient_name     VARCHAR(150)  NOT NULL,
                             patient_phone    VARCHAR(20)   NOT NULL,
                             appointment_date DATE          NOT NULL,
                             appointment_time TIME          NOT NULL,
                             status           VARCHAR(20)   NOT NULL DEFAULT 'BOOKED',
                             cancel_reason    VARCHAR(150),
                             created_at       TIMESTAMPTZ   NOT NULL DEFAULT now(),
                             CONSTRAINT appointment_status_check CHECK (status IN ('BOOKED', 'CANCELLED'))
);

-- One ACTIVE booking per doctor per date+time.
-- CANCELLED rows must NOT block the slot, so a normal UNIQUE constraint
-- would be wrong — a partial unique index covers only BOOKED rows.
CREATE UNIQUE INDEX uq_appointment_active_slot
    ON appointment (doctor_id, appointment_date, appointment_time)
    WHERE status = 'BOOKED';