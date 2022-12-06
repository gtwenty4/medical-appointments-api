import { DATA_SOURCE } from 'src/constants';
import { DataSource } from 'typeorm';
import { AppointmentService } from '../entities/appoitment-service.entity';

export const AppointmentServiceProviders = [
  {
    provide: DATA_SOURCE.APPOINTMENT_SERVICE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AppointmentService),
    inject: ['DATA_SOURCE'],
  },
];
