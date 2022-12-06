import { DATA_SOURCE } from 'src/constants';
import { DataSource } from 'typeorm';
import { Patient } from '../entities/patient.entity';

export const patientProviders = [
  {
    provide: DATA_SOURCE.PATIENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Patient),
    inject: ['DATA_SOURCE'],
  },
];
