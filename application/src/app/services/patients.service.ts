import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Between, DeleteResult, In, Repository } from 'typeorm';
import { AppointmentDto } from '../dto/appointment.dto';
import { PatientAppointmentsDto } from '../dto/patient-appointments.dto';
import { PatientDto } from '../dto/patient.dto';
import { AppointmentService } from '../entities/appoitment-service.entity';
import { Appointment } from '../entities/appoitment.entity';
import { Patient } from '../entities/patient.entity';
import { Service } from '../entities/service.entity';

@Injectable()
export class PatientsService {
  constructor(
    @Inject('PATIENT_REPOSITORY')
    private patientRepository: Repository<Patient>,
    @Inject('APPOINTMENT_REPOSITORY')
    private appointmentRepository: Repository<Appointment>,
    @Inject('APPOINTMENT_SERVICE_REPOSITORY')
    private appointmentServiceRepository: Repository<AppointmentService>,
    @Inject('SERVICE_REPOSITORY')
    private serviceRepository: Repository<Service>,
  ) {}

  async createPatient(
    patientDto: PatientDto
  ): Promise<PatientDto> {
    let patient = await this.patientRepository.save(patientDto.toEntity());
    return PatientDto.toDto(patient);
  }

  async getPatient(
    patientId: number
  ): Promise<PatientDto> {
    let patient = await this.patientRepository.findOneBy({
      id: patientId
    });
    
    if (!patient) {
      throw new HttpException('Patient Not Found', HttpStatus.NOT_FOUND);
    }

    return PatientDto.toDto(patient);
  }

  async updatePatient(
    patientId: number, 
    patientDto: PatientDto
  ): Promise<PatientDto> {
    await this.patientRepository.update(patientId, patientDto.toEntity());

    let patient = await this.patientRepository.findOneBy({
      id: patientId,
    });

    if (!patient) {
      throw new HttpException('Patient Not Found', HttpStatus.BAD_REQUEST);
    }

    return PatientDto.toDto(patient);
  }

  async deletePatient(
    patientId: number
  ): Promise<DeleteResult> {
    let patient = await this.patientRepository.findOne({
      where: {
        id: patientId
      },
      relations: {
        appointments: true
      }
    });

    if (!patient) {
      throw new HttpException('Patient Not Found', HttpStatus.BAD_REQUEST);
    }

    if (patient.appointments.length > 0) {
      throw new HttpException("Patients with appointments can't be deleted", HttpStatus.BAD_REQUEST);
    }

    return await this.patientRepository.delete(patientId);
  }

  async createPatientAppointment(
    patientId: number, 
    appointmentDto: AppointmentDto
  ): Promise<AppointmentDto> {
    let patient = await this.patientRepository.findOneBy({
      id: patientId
    });
    
    if (!patient) {
      throw new HttpException('Patient Not Found', HttpStatus.BAD_REQUEST);
    }

    if (!patient.active) {
      throw new HttpException("Appointments for inactive patients cannot be created", HttpStatus.BAD_REQUEST);
    }

    if((appointmentDto.appointmentServices.length == 0)) {
      throw new HttpException("The appointment must have attached services", HttpStatus.BAD_REQUEST);
    }

    let serviceIds = appointmentDto.appointmentServices.map((appointmentService) => appointmentService.service.id)

    let services = await this.serviceRepository.findBy({
        id: In(serviceIds)
    })

    if (serviceIds.length != services.length) {
      throw new HttpException("Some of the sent services don't exist", HttpStatus.BAD_REQUEST);
    }

    let appointment = await this.appointmentRepository.save(appointmentDto.toEntity(patientId));
    return AppointmentDto.toDto(appointment);
  }

  async getPatientAppointment(
    appointmentId: number
  ): Promise<Appointment> {
    return await this.appointmentRepository.findOne({
      where: {
        id: appointmentId
      },
      relations: {
        appointmentServices: {
          service: true
        }
      }
    });
  }

  async updatePatientAppointment(
    patientId: number, 
    appointmentId: number, 
    appointmentDto: AppointmentDto
  ): Promise<AppointmentDto> {
    let patient = await this.patientRepository.findOneBy({
      id: patientId
    });
    
    if (!patient) {
      throw new HttpException('Patient Not Found', HttpStatus.BAD_REQUEST);
    }

    if (!patient.active) {
      throw new HttpException("Appointments for inactive patients cannot be updated", HttpStatus.BAD_REQUEST);
    }

    if((appointmentDto.appointmentServices.length == 0)) {
      throw new HttpException("The appointment must have attached services", HttpStatus.BAD_REQUEST);
    }

    let appointment = await this.getPatientAppointment(appointmentId);

    if (!appointment) {
      throw new HttpException('Appointment Not Found', HttpStatus.BAD_REQUEST);
    }

    let serviceIds = appointmentDto.appointmentServices.map((appointmentService) => appointmentService.service.id)

    let services = await this.serviceRepository.findBy({
        id: In(serviceIds)
    })

    if (serviceIds.length != services.length) {
      throw new HttpException("Some of the sent services don't exist", HttpStatus.BAD_REQUEST);
    }

    let currentServiceIds = appointment.appointmentServices.map((appointmentService) => appointmentService.service.id)

    let servicesToAdd = [];
    servicesToAdd = serviceIds.filter((service) => currentServiceIds.indexOf(service) == -1);

    if(servicesToAdd.length > 0){
      let newAppointmentServices: AppointmentService[] = [];

      newAppointmentServices = servicesToAdd.map((service) => {
        let appointmentService = new AppointmentService();
        appointmentService.appoitnment = appointment;
        appointmentService.service = service
        return appointmentService
      })

      await this.appointmentServiceRepository.save(newAppointmentServices);
    }

    let servicesToDelete = [];
    servicesToDelete = currentServiceIds.filter((service) => serviceIds.indexOf(service) == -1);
    
    if(servicesToDelete.length > 0){
      let oldAppointmentServices: AppointmentService[] = [];

      oldAppointmentServices = appointment.appointmentServices.filter((appointmentService) => 
        (servicesToDelete.indexOf(appointmentService.service.id) != -1)
      )

      let oldAppointmentServicesIds: number[] = oldAppointmentServices.map((appointmentService) => appointmentService.id)

      await this.appointmentServiceRepository.delete(oldAppointmentServicesIds)
    }

    appointment = await this.getPatientAppointment(appointmentId);

    let updateAppointment = appointmentDto.toEntity(patientId);
    updateAppointment.id = appointmentId;
    updateAppointment.appointmentServices = appointment.appointmentServices;

    return AppointmentDto.toDto(await this.appointmentRepository.save(updateAppointment));
  }

  async deletePatientAppointment(
    patientId: number,
    appointmentId: number
  ): Promise<DeleteResult> {
    let patient = await this.patientRepository.findOneBy({
      id: patientId
    });
    
    if (!patient) {
      throw new HttpException('Patient Not Found', HttpStatus.BAD_REQUEST);
    }

    let appointment = await this.getPatientAppointment(appointmentId);

    if (!appointment) {
      throw new HttpException('Appointment Not Found', HttpStatus.BAD_REQUEST);
    }

    if (appointment.date < new Date()) {
      throw new HttpException("Past appointments can't be deleted", HttpStatus.BAD_REQUEST);
    }

    return await this.appointmentRepository.delete(appointmentId);
  }

  async getPatientAppointments(
    patientId: number, 
    startDate: Date, 
    endDate: Date, 
    limit: number, 
    offset: number
  ): Promise<PatientAppointmentsDto> {

    if (Number.isNaN(startDate.valueOf())) {
      throw new HttpException('The start date is reqired', HttpStatus.BAD_REQUEST);
    }

    if (Number.isNaN(endDate.valueOf())) {
      throw new HttpException('The end date is reqired', HttpStatus.BAD_REQUEST);
    }
    
    let patient = await this.patientRepository.findOneBy({
      id: patientId,
      active: true
    });
    
    if (!patient) {
      throw new HttpException('Patient Not Found', HttpStatus.NOT_FOUND);
    }

    let appointments = await this.appointmentRepository.find({
      where: {
        patient: {
          id: patientId
        },
        date: Between(startDate,endDate)
      },
      skip: offset,
      take: limit,
    })

    return PatientAppointmentsDto.toDto(patientId, startDate, endDate, limit, offset, appointments);
  }
}
