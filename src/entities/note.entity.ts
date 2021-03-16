import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}