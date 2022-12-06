import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MedicalArea } from '../entities/medical-area.entity';
import { Service } from '../entities/service.entity';

export class MedicalAreaDto {

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
  services: Service[];

  public toEntity() {
    let medicalArea = new MedicalArea();
    medicalArea.name = this.name;
    medicalArea.description = this.description;
    return medicalArea;
  }

  public static toDto(
    medicalArea: MedicalArea
  ) {
    let medicalAreaDto = new MedicalAreaDto();
    medicalAreaDto.id = medicalArea.id;
    medicalAreaDto.name = medicalArea.name;
    medicalAreaDto.description = medicalArea.description;
    medicalAreaDto.entryDate = medicalArea.entryDate;
    medicalAreaDto.lastUpdate = medicalArea.lastUpdate;
    medicalAreaDto.services = medicalArea.services;
    return medicalAreaDto;
  } 

}
  