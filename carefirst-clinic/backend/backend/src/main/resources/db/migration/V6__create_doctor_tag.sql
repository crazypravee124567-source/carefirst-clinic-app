CREATE TABLE doctor_tag (
                            id        BIGSERIAL    PRIMARY KEY,
                            doctor_id BIGINT       NOT NULL REFERENCES doctor (id),
                            tag       VARCHAR(100) NOT NULL,
                            UNIQUE (doctor_id, tag)
);

INSERT INTO doctor_tag (doctor_id, tag) VALUES
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'family-medicine')), 'Preventive Care'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'family-medicine')), 'Women''s Health'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'cardiology')),      'Heart Health'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'cardiology')),      'Hypertension'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'pediatrics')),      'Infant Care'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'pediatrics')),      'Vaccinations'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'dermatology')),     'Acne & Eczema'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'dermatology')),     'Screenings'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'orthopedics')),     'Joint Pain'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'orthopedics')),     'Spine Rehab'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'neurology')),       'Migraine'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'neurology')),       'Sleep Disorders');