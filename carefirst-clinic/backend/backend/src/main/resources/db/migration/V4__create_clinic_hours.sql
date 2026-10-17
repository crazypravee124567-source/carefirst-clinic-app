CREATE TABLE clinic_hours (
                              id          BIGSERIAL PRIMARY KEY,
                              clinic_id   BIGINT  NOT NULL REFERENCES clinic (id),
                              day_of_week INTEGER NOT NULL,
                              open_time   TIME,
                              close_time  TIME,
                              note        VARCHAR(150)
);

INSERT INTO clinic_hours (clinic_id, day_of_week, open_time, close_time, note) VALUES
                                                                                   ((SELECT id FROM clinic ORDER BY id LIMIT 1), 1, '08:00', '19:00', NULL),
    ((SELECT id FROM clinic ORDER BY id LIMIT 1), 2, '08:00', '19:00', NULL),
    ((SELECT id FROM clinic ORDER BY id LIMIT 1), 3, '08:00', '19:00', NULL),
    ((SELECT id FROM clinic ORDER BY id LIMIT 1), 4, '08:00', '19:00', NULL),
    ((SELECT id FROM clinic ORDER BY id LIMIT 1), 5, '08:00', '19:00', NULL),
    ((SELECT id FROM clinic ORDER BY id LIMIT 1), 6, '09:00', '15:00', NULL),
    ((SELECT id FROM clinic ORDER BY id LIMIT 1), 7, NULL,    NULL,    'Urgent triage on-call');