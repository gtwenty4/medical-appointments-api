import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Appointment } from './appoitment.entity';
import { Service } from './service.entity';

@Entity({name:"appointment_services"})
export class AppointmentService {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: "entry_date",
    type: "datetime"
  })
  entryDate: Date;

  @ManyToOne(
    () => Appointment, 
    (appointment) => appointment.appointmentServices, 
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ 
    name: "appointment_id" 
  })
  appoitnment: Appointment;

  @ManyToOne(
    () => Service, 
    (service) => service.appointmentServices
  )
  @JoinColumn({ 
    name: "service_id" 
  })
  service: Service;
}