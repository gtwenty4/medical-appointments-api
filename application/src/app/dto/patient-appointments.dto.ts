import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Appointment } from '../entities/appoitment.entity';

export class PatientAppointmentsDto {

  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsArray()
  @IsOptional()
  appointments: Appointment[];

  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  offset: number;

  public static toDto(
    patientId: number, 
    startDate: Date, 
    endDate: Date, 
    limit: number, 
    offset: number, 
    appointments: Appointment[]
  ) {
    let patientAppointmetsDto = new PatientAppointmentsDto();
    patientAppointmetsDto.patientId = patientId;
    patientAppointmetsDto.startDate = startDate;
    patientAppointmetsDto.endDate = endDate;
    patientAppointmetsDto.appointments = appointments;
    patientAppointmetsDto.limit = limit;
    patientAppointmetsDto.offset = offset;
    return patientAppointmetsDto;
  } 

}
  