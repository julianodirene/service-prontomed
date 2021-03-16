import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Patient {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({nullable: false, length: 100})
	name : string;

    @Column({nullable: false, length: 11})
	phone: string;

    @Column({nullable: false, length: 100})
	email: string;

    @Column({nullable: false})
	birthDate: Date;

    @Column({nullable: false, length: 1})
	sex : Sex;

    @Column({nullable: false})
	height: number;

    @Column({nullable: false})
	weight: number;
}
