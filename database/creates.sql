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