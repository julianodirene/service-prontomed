import { Patient } from "src/entities/patient.entity";

export class AppointmentDto {
	dateTime: Date;
	patientId : number;
}
