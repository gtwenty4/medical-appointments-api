CREATE DATABASE IF NOT EXISTS medical_appointments_db;

USE medical_appointments_db;

DROP TABLE IF EXISTS appointment_services;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS medical_areas;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS patients;

CREATE TABLE patients(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(1) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(100) NOT NULL,
    birth_date DATETIME NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    entry_date DATETIME NOT NULL DEFAULT NOW(),
    last_update DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY(id)
);

CREATE TABLE appointments(
    id INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(200) NOT NULL,
    date DATETIME NOT NULL,
    entry_date DATETIME NOT NULL DEFAULT NOW(),
    last_update DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    patient_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

CREATE TABLE medical_areas(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    entry_date DATETIME NOT NULL DEFAULT NOW(),
    last_update DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY(id)
);

CREATE TABLE services(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    entry_date DATETIME NOT NULL DEFAULT NOW(),
    last_update DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    medical_area_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (medical_area_id) REFERENCES medical_areas(id)
);

CREATE TABLE appointment_services(
    id INT NOT NULL AUTO_INCREMENT,
    entry_date DATETIME NOT NULL DEFAULT NOW(),
    appointment_id INT NOT NULL,
    service_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id)
);

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