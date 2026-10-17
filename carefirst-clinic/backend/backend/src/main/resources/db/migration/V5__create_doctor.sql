CREATE TABLE doctor (
                        id               BIGSERIAL PRIMARY KEY,
                        department_id    BIGINT           NOT NULL REFERENCES department (id),
                        name             VARCHAR(150)     NOT NULL,
                        title            VARCHAR(150)     NOT NULL,
                        photo_url        VARCHAR(500),
                        years_experience INTEGER          NOT NULL,
                        consultation_fee NUMERIC(8, 2)    NOT NULL,
                        rating_average   DOUBLE PRECISION NOT NULL,
                        rating_count     INTEGER          NOT NULL,
                        board_certified  BOOLEAN          NOT NULL,
                        visit_type       VARCHAR(50)      NOT NULL,
                        room             VARCHAR(50),
                        featured         BOOLEAN          NOT NULL,
                        active           BOOLEAN          NOT NULL
);

INSERT INTO doctor
(department_id, name, title, photo_url, years_experience, consultation_fee,
 rating_average, rating_count, board_certified, visit_type, room, featured, active)
VALUES
    ((SELECT id FROM department WHERE slug = 'family-medicine'),
     'Dr. Sarah Jenkins', 'General Physician', NULL, 12, 75.00, 4.9, 128, TRUE, 'In-Person', 'Room 304', TRUE, TRUE),
    ((SELECT id FROM department WHERE slug = 'cardiology'),
     'Dr. Michael Chen', 'Cardiologist', NULL, 15, 95.00, 4.95, 94, TRUE, 'In-Person', NULL, TRUE, TRUE),
    ((SELECT id FROM department WHERE slug = 'pediatrics'),
     'Dr. Emily Patel', 'Lead Pediatrician', NULL, 9, 80.00, 5.0, 142, TRUE, 'In-Person', NULL, TRUE, TRUE),
    ((SELECT id FROM department WHERE slug = 'dermatology'),
     'Dr. Marcus Vance', 'Dermatologist', NULL, 11, 90.00, 4.88, 87, TRUE, 'In-Person', NULL, FALSE, TRUE),
    ((SELECT id FROM department WHERE slug = 'orthopedics'),
     'Dr. Alena Rossi', 'Orthopedic Specialist', NULL, 14, 110.00, 4.92, 115, TRUE, 'In-Person', NULL, FALSE, TRUE),
    ((SELECT id FROM department WHERE slug = 'neurology'),
     'Dr. David Kim', 'Neurologist', NULL, 16, 120.00, 4.9, 76, TRUE, 'In-Person', NULL, FALSE, TRUE);