import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AppointmentService } from '../entities/appoitment-service.entity';
import { Appointment } from '../entities/appoitment.entity';
import { Patient } from '../entities/patient.entity';

export class AppointmentDto {

  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  date: Date;

  @IsOptional()
  entryDate: Date;

  @IsOptional()
  lastUpdate: Date;

  @IsArray()
  @IsNotEmpty()
  appointmentServices: AppointmentService[];

  @IsOptional()
  patient: Patient | number;

  public toEntity(
    patientId: number
  ) {
    let appointment = new Appointment();
    appointment.description = this.description;
    appointment.date = this.date;

    appointment.appointmentServices = []
    for (let appointmentServiceDto of this.appointmentServices) {
      let appointmentService = new AppointmentService()
      appointmentService.service = appointmentServiceDto.service;
      appointment.appointmentServices.push(appointmentService);
    }

    let patient = new Patient();
    patient.id = patientId;
    appointment.patient = patient;

    return appointment;
  }

  public static toDto(
    appointment: Appointment
  ) {
    let appointmentDto = new AppointmentDto();
    appointmentDto.id = appointment.id;
    appointmentDto.description = appointment.description;
    appointmentDto.date = appointment.date;
    appointmentDto.entryDate = appointment.entryDate;
    appointmentDto.lastUpdate = appointment.lastUpdate;
    appointmentDto.appointmentServices = appointment.appointmentServices;
    appointmentDto.patient = appointment.patient;
    return appointmentDto;
  } 

}
  