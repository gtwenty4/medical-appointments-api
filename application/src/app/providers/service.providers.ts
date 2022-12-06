import { DATA_SOURCE } from 'src/constants';
import { DataSource } from 'typeorm';
import { Service } from '../entities/service.entity';

export const ServiceProviders = [
  {
    provide: DATA_SOURCE.SERVICE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Service),
    inject: ['DATA_SOURCE'],
  },
];
