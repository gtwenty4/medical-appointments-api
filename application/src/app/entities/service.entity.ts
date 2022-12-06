import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { AppointmentService } from './appoitment-service.entity';
import { MedicalArea } from './medical-area.entity';

@Entity({name:"services"})
export class Service {
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
    () => AppointmentService, 
    (appoitmentService) => appoitmentService.service
  )
  appointmentServices: AppointmentService[];

  @ManyToOne(
    () => MedicalArea, 
    (medicalArea) => medicalArea.services
  )
  @JoinColumn({ 
    name: "medical_area_id" 
  })
  medicalArea: MedicalArea;
}