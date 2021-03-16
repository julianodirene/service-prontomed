import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    appointmentId: number;

    @Column({ nullable: false })
    text: string;
}