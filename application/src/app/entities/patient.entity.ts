import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Appointment } from './appoitment.entity';

@Entity({name:"patients"})
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "name",
    type: "varchar", 
    length: 50 
  })
  name: string;

  @Column({
    name: "last_name",
    type: "varchar", 
    length: 50 
  })
  lastName: string;

  @Column({
    name: "gender",
    type: "varchar", 
    length: 1 
  })
  gender: string;

  @Column({
    name: "email",
    type: "varchar",
    length: 100
  })
  email: string;

  @Column({
    name: "phone",
    type: "varchar",
    length: 15
  })
  phone: string;

  @Column({
    name: "address",
    type: "varchar",
    length: 100
  })
  address: string;

  @Column({
    name: "birth_date",
    type: "datetime"
  })
  birthDate: Date;

  @Column({
    name: "active",
    type: "boolean",
    default: true
  })
  active: Boolean;

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
    () => Appointment, 
    (appoitment) => appoitment.patient
  )
  appointments: Appointment[];
}