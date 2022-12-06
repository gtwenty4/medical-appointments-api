import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { AppointmentService } from './appoitment-service.entity';
import { Patient } from './patient.entity';

@Entity({name:"appointments"})
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "description",
    type: "varchar", 
    length: 200 
  })
  description: string;

  @Column({
    name: "date",
    type: "datetime"
  })
  date: Date;

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
    (appoitmentService) => appoitmentService.appoitnment, 
    { cascade: true }
  )
  appointmentServices: AppointmentService[];

  @ManyToOne(
    () => Patient, 
    (patient) => patient.appointments
  )
  @JoinColumn({ 
    name: "patient_id" 
  })
  patient: Patient;
}