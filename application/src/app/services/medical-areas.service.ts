import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { MedicalAreaDto } from '../dto/medical-area.dto';
import { ServiceDto } from '../dto/service.dto';
import { MedicalArea } from '../entities/medical-area.entity';
import { Service } from '../entities/service.entity';

@Injectable()
export class MedicalAreasService {
  constructor(
    @Inject('MEDICAL_AREA_REPOSITORY')
    private medicalAreaRepository: Repository<MedicalArea>,
    @Inject('SERVICE_REPOSITORY')
    private serviceRepository: Repository<Service>,
  ) {}

  async getMedicalArea(
    medicalAreaId: number
  ): Promise<MedicalAreaDto> {
    let medicalArea = await this.medicalAreaRepository.findOne({
      where: {
        id: medicalAreaId
      },
      relations: {
        services: true
      }
    });

    if (!medicalArea) {
      throw new HttpException("Medical Area not found", HttpStatus.NOT_FOUND);
    }

    return MedicalAreaDto.toDto(medicalArea);
  }

  async createMedicalAreaService(
    medicalAreaId: number, 
    serviceDto: ServiceDto
  ): Promise<ServiceDto> {
    let medicalArea = await this.medicalAreaRepository.findOneBy({
      id: medicalAreaId
    });

    if (!medicalArea) {
      throw new HttpException("Medical Area not found", HttpStatus.BAD_REQUEST);
    }

    let service = await this.serviceRepository.save(serviceDto.toEntity(medicalAreaId));
    return ServiceDto.toDto(service);
  }

  async updateMedicalAreaService(
    medicalAreaId: number, 
    serviceId: number, 
    serviceDto: ServiceDto
  ): Promise<ServiceDto> {
    let medicalArea = await this.medicalAreaRepository.findOneBy({
      id: medicalAreaId
    });

    if (!medicalArea) {
      throw new HttpException("Medical Area not found", HttpStatus.BAD_REQUEST);
    }

    await this.serviceRepository.update(serviceId, serviceDto.toEntity(medicalAreaId));

    let service = await this.serviceRepository.findOneBy({
      id: serviceId,
    });

    if (!service) {
      throw new HttpException('Service Not Found', HttpStatus.BAD_REQUEST);
    }

    return ServiceDto.toDto(service);
  }

  async deleteMedicalAreaService(
    medicalAreaId: number, 
    serviceId: number
  ): Promise<DeleteResult> {
    let medicalArea = await this.medicalAreaRepository.findOneBy({
      id: medicalAreaId
    });

    if (!medicalArea) {
      throw new HttpException("Medical Area not found", HttpStatus.BAD_REQUEST);
    }

    let service = await this.serviceRepository.findOne({
      where: {
        id: serviceId
      },
      relations: {
        appointmentServices: true
      }
    });

    if (!service) {
      throw new HttpException('Service Not Found', HttpStatus.BAD_REQUEST);
    }

    if (service.appointmentServices.length > 0){
      throw new HttpException("Services with appointments can't be deleted", HttpStatus.BAD_REQUEST);
    }

    return await this.serviceRepository.delete(serviceId); 
  }
}
