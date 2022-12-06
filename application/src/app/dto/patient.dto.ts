import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Patient } from '../entities/patient.entity';

export class PatientDto {

  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['M', 'F']) 
  gender: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  birthDate: Date;

  @IsOptional()
  active: Boolean;

  @IsOptional()
  entryDate: Date;

  @IsOptional()
  lastUpdate: Date;

  public toEntity() {
    let patient = new Patient();
    patient.name = this.name;
    patient.lastName = this.lastName;
    patient.gender = this.gender;
    patient.email = this.email;
    patient.phone = this.phone;
    patient.address = this.address;
    patient.birthDate = this.birthDate;
    patient.active = this.active;
    return patient;
  }

  public static toDto(
    patient: Patient
  ) {
    let patientDto = new PatientDto();
    patientDto.id = patient.id;
    patientDto.name = patient.name;
    patientDto.lastName = patient.lastName;
    patientDto.email = patient.email;
    patientDto.gender = patient.gender;
    patientDto.phone = patient.phone;
    patientDto.address = patient.address;
    patientDto.birthDate = patient.birthDate;
    patientDto.active = patient.active;
    patientDto.entryDate = patient.entryDate;
    patientDto.lastUpdate = patient.lastUpdate;
    return patientDto;
  } 

}
  