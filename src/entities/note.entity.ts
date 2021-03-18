import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./appointment.entity";

@Entity()
export class Note {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    appointmentId: number;

    @Column({ nullable: false })
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Appointment, appointment => appointment.notes, { nullable: false })
    appointment: Appointment;
}