import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AppointmentService } from '../entities/appoitment-service.entity';
import { MedicalArea } from '../entities/medical-area.entity';
import { Service } from '../entities/service.entity';

export class ServiceDto {

  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  entryDate: Date;

  @IsOptional()
  lastUpdate: Date;

  @IsArray()
  @IsOptional()
  appointmentServices: AppointmentService[];

  @IsOptional()
  medicalArea: MedicalArea | number;

  public toEntity(
    medicalAreaId: number
  ) {
    let service = new Service();
    service.name = this.name;
    service.description = this.description;

    let medicalArea = new MedicalArea();
    medicalArea.id = medicalAreaId;
    service.medicalArea = medicalArea;

    return service;
  }

  public static toDto(
    service: Service
  ) {
    let serviceDto = new ServiceDto();
    serviceDto.id = service.id;
    serviceDto.name = service.name;
    serviceDto.description = service.description;
    serviceDto.entryDate = service.entryDate;
    serviceDto.lastUpdate = service.lastUpdate;
    serviceDto.appointmentServices = service.appointmentServices;
    serviceDto.medicalArea = service.medicalArea;
    return serviceDto;
  } 

}
  