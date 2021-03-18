import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Appointment } from "./appointment.entity";

export enum Sex {
    MALE = "M",
    FEMALE = "F"
}

@Entity()
export class Patient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 100 })
    name: string;

    @Column({ nullable: false, length: 11 })
    phone: string;

    @Column({ nullable: false, length: 100 })
    email: string;

    @Column({ nullable: false, type: "date" })
    birthDate: Date;

    @Column({ nullable: false, type: "enum", enum: Sex })
    sex: Sex;

    @Column({ nullable: false, type: "decimal", precision: 10, scale: 2 })
    height: number;

    @Column({ nullable: false, type: "decimal", precision: 10, scale: 2 })
    weight: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Appointment, appointment => appointment.patient)
    appointments: Appointment[];
}
