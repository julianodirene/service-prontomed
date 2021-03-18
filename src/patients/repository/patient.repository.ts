import { EntityRepository, Repository, UpdateResult } from "typeorm";
import { Patient } from "./../../entities/patient.entity";

@EntityRepository(Patient)
export class PatientsRepository extends Repository<Patient> {

    async anonymize(id: number): Promise<UpdateResult> {
        const patient: Patient = await this.findOne(id);
        patient.name = "***********";
        patient.phone = "***********";
        patient.email = "***********";
        return this.update(id, patient);
    }

    async findNotes(id: number): Promise<Patient> {
        return this.findOne(id);
    }
}