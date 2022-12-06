import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { MedicalAreaDto } from '../dto/medical-area.dto';
import { ServiceDto } from '../dto/service.dto';
import { MedicalAreasService } from '../services/medical-areas.service';

@Controller('medical-areas')
export class MedicalAreasController {
  constructor(private readonly medicalAreasService: MedicalAreasService) {}

  @Get(':medicalAreaId')
  getMedicalArea(
    @Param('medicalAreaId') medicalAreaId: number
  ): Promise<MedicalAreaDto> {
    return this.medicalAreasService.getMedicalArea(medicalAreaId);
  }

  @Post(':medicalAreaId/services')
  createMedicalAreaService(
    @Param('medicalAreaId') medicalAreaId: number,
    @Body() serviceDto: ServiceDto
  ): Promise<ServiceDto> {
    return this.medicalAreasService.createMedicalAreaService(medicalAreaId, serviceDto);
  }

  @Patch(':medicalAreaId/services/:serviceId')
  updateMedicalAreaService(
    @Param('medicalAreaId') medicalAreaId: number,
    @Param('serviceId') serviceId: number,
    @Body() serviceDto: ServiceDto
  ): Promise<ServiceDto> {
    return this.medicalAreasService.updateMedicalAreaService(medicalAreaId, serviceId, serviceDto);
  }

  @Delete(':medicalAreaId/services/:serviceId')
  deleteMedicalAreaService(
    @Param('medicalAreaId') medicalAreaId: number,
    @Param('serviceId') serviceId: number
  ): Promise<DeleteResult> {
    return this.medicalAreasService.deleteMedicalAreaService(medicalAreaId, serviceId);
  }

}
