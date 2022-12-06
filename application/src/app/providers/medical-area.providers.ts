import { DATA_SOURCE } from 'src/constants';
import { DataSource } from 'typeorm';
import { MedicalArea } from '../entities/medical-area.entity';

export const MedicalAreaProviders = [
  {
    provide: DATA_SOURCE.MEDICAL_AREA_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MedicalArea),
    inject: ['DATA_SOURCE'],
  },
];
