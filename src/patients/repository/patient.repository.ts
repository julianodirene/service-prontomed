import { EntityRepository, Repository } from "typeorm";
import { Patient } from "../entity/patient.entity";

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> {

    async anonymize(id: number){
        const patient : Patient = await this.findOne(id);
        patient.name = "***********";
        patient.phone = "***********";
        patient.email = "***********";
        return this.update(id, patient);
    }
}