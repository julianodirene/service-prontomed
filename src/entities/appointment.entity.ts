import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    dateTime: Date;

    @Column({ nullable: false })
    patientId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}