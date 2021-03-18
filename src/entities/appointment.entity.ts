import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { Note } from "./note.entity";
import { Patient } from "./patient.entity";

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    dateTime: Date;

    @ManyToOne(() => Patient, patient => patient.appointments, { nullable: false })
    patient: Patient;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Note, note => note.appointment)
    notes: Note[];
}