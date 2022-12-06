INSERT INTO patients (name, last_name, gender, email, phone, address, birth_date)
VALUES 
("Diego", "Gutierrez", "M", "diego.g14@gmail.com", "+58 4125874125", "Los Naranjos", "1999-04-12 00:00:00"),
("Alexander", "Fernandez", "M", "ale2fer@gmail.com", "+58 4245874128", "La Panteon", "1998-07-27 00:00:00"),
("Miguel", "Diaz", "M", "miguelacho15@gmail.com", "+58 4125236984", "Chacao", "1999-08-15 00:00:00"),
("Alfonso", "Rodriguez", "M", "alfofercho.17@gmail.com", "+58 4147854125", "El Hatillo", "1998-12-17 00:00:00");

INSERT INTO appointments (description, date, patient_id)
VALUES 
("Brain tomography and Magnetic resonance", "2022-12-06 00:00:00", 1),
("Brain tomography", "2022-12-09 00:00:00", 2),
("Magnetic resonance", "2022-12-01 00:00:00", 3);

INSERT INTO medical_areas (name, description)
VALUES 
("Medical imaging", "Technique and process of imaging the interior of a body for clinical analysis");

INSERT INTO services (name, description, medical_area_id)
VALUES 
("Brain tomography", "Computed tomography of the head using a series of X-rays", 1),
("Magnetic resonance", "Technique used in radiology to form pictures of the anatomy and the physiological processes of the body", 1);

INSERT INTO appointment_services (appointment_id, service_id)
VALUES
(1,1),
(1,2),
(2,1),
(3,2);

