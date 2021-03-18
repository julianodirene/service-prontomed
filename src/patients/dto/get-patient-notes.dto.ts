
import { ApiProperty } from '@nestjs/swagger';
import { Sex } from './../../entities/patient.entity';

export class Note {
	@ApiProperty()
	appointmentDate: Date;

	@ApiProperty()
	text: string
}

export class GetPatientNotesDto {
	@ApiProperty()
	id: number

	@ApiProperty()
	name: string;

	@ApiProperty()
	phone: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	birthDate: Date;

	@ApiProperty()
	sex: Sex;

	@ApiProperty()
	height: number;

	@ApiProperty()
	weight: number;

	@ApiProperty()
	createdAt: Date

	@ApiProperty()
	updatedAt: Date

	@ApiProperty()
	notes: Note[]
}