import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    name : string;
	phone: string;
	email: string;
	birthDate: Date;
	sex : Sex;
	height: number;
	weight: number;
}
