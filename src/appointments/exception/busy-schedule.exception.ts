import { BadRequestException } from "@nestjs/common";

export class BusyScheduleException extends BadRequestException {
    constructor() {
        super(null, "Já existe um agendamento no horário escolhido.");
    }
}