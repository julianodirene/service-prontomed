import { EntityRepository, Repository } from "typeorm";
import { Appointment } from "../../entities/appointment.entity";

@EntityRepository(Appointment)
export class AppointmentRepository extends Repository<Appointment> {

    findOneJoinRelations(id: number): Promise<Appointment> {
        return this.createQueryBuilder("appointment")
            .innerJoinAndSelect("appointment.patient", "patient")
            .leftJoinAndSelect("appointment.notes", "note")
            .where("appointment.id = :id", { id: id })
            .getOne();
    }

    findByPatient(patientId: number): Promise<Appointment[]> {
        return this.createQueryBuilder("appointment")
            .leftJoinAndSelect("appointment.notes", "note")
            .where("appointment.patient = :patientId", { patientId: patientId })
            .getMany();
    }
}