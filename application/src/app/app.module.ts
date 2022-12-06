import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MedicalAreasController } from './controllers/medical-areas.controller';
import { PatientsController } from './controllers/patients.controller';
import { AppointmentServiceProviders } from './providers/appointment-service.providers';
import { AppointmentProviders } from './providers/appointment.providers';
import { MedicalAreaProviders } from './providers/medical-area.providers';
import { patientProviders } from './providers/patient.providers';
import { ServiceProviders } from './providers/service.providers';
import { MedicalAreasService } from './services/medical-areas.service';
import { PatientsService } from './services/patients.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule
  ],
  controllers: [
    PatientsController,
    MedicalAreasController,
  ],
  providers: [
    ...patientProviders,
    ...AppointmentProviders,
    ...AppointmentServiceProviders,
    ...ServiceProviders,
    ...MedicalAreaProviders,
    PatientsService,
    MedicalAreasService,
  ],
})
export class AppModule {}
