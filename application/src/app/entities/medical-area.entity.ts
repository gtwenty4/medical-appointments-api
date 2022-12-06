import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Service } from './service.entity';

@Entity({name:"medical_areas"})
export class MedicalArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "name",
    type: "varchar", 
    length: 50 
  })
  name: string;

  @Column({
    name: "description",
    type: "varchar", 
    length: 200 
  })
  description: string;

  @CreateDateColumn({
    name: "entry_date",
    type: "datetime"
  })
  entryDate: Date;

  @UpdateDateColumn({
    name: "last_update",
    type: "datetime"
  })
  lastUpdate: Date;

  @OneToMany(
    () => Service, 
    (service) => service.medicalArea
  )
  services: Service[];
}