import { DATA_SOURCE } from 'src/constants';
import { DataSource } from 'typeorm';
import { Appointment } from '../entities/appoitment.entity';

export const AppointmentProviders = [
  {
    provide: DATA_SOURCE.APPOINTMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Appointment),
    inject: ['DATA_SOURCE'],
  },
];
