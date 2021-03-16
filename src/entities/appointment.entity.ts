import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Patient } from './patient.entity';

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({nullable: false})
	dateTime: Date;

    @Column({name: "patientId", nullable: false})
	patientId : number;
}

//     // @Column({name: "patientId", nullable: false})
