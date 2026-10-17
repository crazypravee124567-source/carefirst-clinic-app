ALTER TABLE doctor ADD COLUMN license_number VARCHAR(30);

UPDATE doctor
SET license_number = 'CF-' || LPAD(id::text, 5, '0')
WHERE license_number IS NULL;

ALTER TABLE doctor ALTER COLUMN license_number SET NOT NULL;
ALTER TABLE doctor ADD CONSTRAINT uq_doctor_license_number UNIQUE (license_number);
