CREATE TABLE doctor_schedule (
                                 id           BIGSERIAL PRIMARY KEY,
                                 doctor_id    BIGINT  NOT NULL REFERENCES doctor (id),
                                 day_of_week  INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
                                 start_time   TIME    NOT NULL,
                                 end_time     TIME    NOT NULL,
                                 slot_minutes INTEGER NOT NULL CHECK (slot_minutes > 0),
                                 CHECK (end_time > start_time),
                                 UNIQUE (doctor_id, day_of_week, start_time)
);

-- Every doctor: Monday to Friday, two blocks a day
INSERT INTO doctor_schedule (doctor_id, day_of_week, start_time, end_time, slot_minutes)
SELECT d.id, w.weekday, b.start_time, b.end_time, 30
FROM doctor d
         CROSS JOIN generate_series(1, 5) AS w(weekday)
         CROSS JOIN (VALUES ('09:00'::time, '12:00'::time),
                            ('14:00'::time, '18:00'::time)) AS b(start_time, end_time);

-- Two doctors also work Saturday morning
INSERT INTO doctor_schedule (doctor_id, day_of_week, start_time, end_time, slot_minutes)
SELECT d.id, 6, '09:00'::time, '13:00'::time, 30
FROM doctor d
WHERE d.name IN ('Dr. Sarah Jenkins', 'Dr. Michael Chen');