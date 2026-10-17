CREATE TABLE clinic (
                        id           BIGSERIAL PRIMARY KEY,
                        name         VARCHAR(150) NOT NULL,
                        phone        VARCHAR(50)  NOT NULL,
                        sms_number   VARCHAR(50),
                        address      VARCHAR(255) NOT NULL,
                        district     VARCHAR(150) NOT NULL,
                        parking_info VARCHAR(255),
                        map_url      VARCHAR(500)
);

INSERT INTO clinic (name, phone, sms_number, address, district, parking_info, map_url)
VALUES (
           'CareFirst Clinic',
           '(555) 234-2273',
           '(555) 382-4467',
           '482 Healthway Blvd, Suite 210',
           'Metro Health District',
           'Free parking, Level 1 Patient Garage',
           'https://www.google.com/maps/search/?api=1&query=482+Healthway+Blvd'
       );