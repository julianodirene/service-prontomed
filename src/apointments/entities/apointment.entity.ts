import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Apointment {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({nullable: false})
	dateTime: Date;

    @Column({nullable: false})
	patientId : number;

    @Column()
	note: string;
}
