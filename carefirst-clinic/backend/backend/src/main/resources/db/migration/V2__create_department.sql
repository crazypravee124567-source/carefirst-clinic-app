CREATE TABLE department (
                            id   BIGSERIAL PRIMARY KEY,
                            name VARCHAR(100) NOT NULL UNIQUE,
                            slug VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO department (name, slug) VALUES
                                        ('Family Medicine', 'family-medicine'),
                                        ('Cardiology',      'cardiology'),
                                        ('Pediatrics',      'pediatrics'),
                                        ('Dermatology',     'dermatology'),
                                        ('Orthopedics',     'orthopedics'),
                                        ('Neurology',       'neurology');