import { NotFoundException } from "@nestjs/common";

export class PatientNotFoundException extends NotFoundException {
    constructor() {
        super(null, "Paciente não encontrado.");
    }
}