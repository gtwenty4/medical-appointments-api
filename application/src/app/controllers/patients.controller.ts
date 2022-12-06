import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { AppointmentDto } from '../dto/appointment.dto';
import { PatientAppointmentsDto } from '../dto/patient-appointments.dto';
import { PatientDto } from '../dto/patient.dto';
import { PatientsService } from '../services/patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  createPatient(
    @Body() patientDto: PatientDto
  ): Promise<PatientDto> {
    return this.patientsService.createPatient(patientDto);
  }

  @Get(':patientId')
  getPatient(
    @Param('patientId') patientId: number
  ): Promise<PatientDto> {
    return this.patientsService.getPatient(patientId);
  }

  @Patch(':patientId')
  updatePatient(
    @Param('patientId') patientId: number,
    @Body() patientDto: PatientDto
  ): Promise<PatientDto> {
    return this.patientsService.updatePatient(patientId, patientDto);
  }

  @Delete(':patientId')
  deletePatient(
    @Param('patientId') patientId: number
  ): Promise<DeleteResult> {
    return this.patientsService.deletePatient(patientId);
  }

  @Post(':patientId/appointments')
  createPatientAppointment(
    @Param('patientId') patientId: number,
    @Body() appointmentDto: AppointmentDto
  ): Promise<AppointmentDto> {
    return this.patientsService.createPatientAppointment(patientId, appointmentDto);
  }

  @Patch(':patientId/appointments/:appointmentId')
  updatePatientAppointment(
    @Param('patientId') patientId: number,
    @Param('appointmentId') appointmentId: number,
    @Body() appointmentDto: AppointmentDto
  ): Promise<AppointmentDto> {
    return this.patientsService.updatePatientAppointment(patientId, appointmentId, appointmentDto);
  }

  @Delete(':patientId/appointments/:appointmentId')
  deletePatientAppointment(
    @Param('patientId') patientId: number,
    @Param('appointmentId') appointmentId: number
  ): Promise<DeleteResult> {
    return this.patientsService.deletePatientAppointment(patientId, appointmentId);
  }

  @Get(':patientId/appointments')
  getPatientAppointments(
    @Param('patientId') patientId: number,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Query('limit') limit = 20,
    @Query('offset') offset = 0
  ): Promise<PatientAppointmentsDto> {
    return this.patientsService.getPatientAppointments(patientId, startDate, endDate, limit, offset);
  }

}
