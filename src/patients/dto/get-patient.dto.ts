
import { ApiProperty } from '@nestjs/swagger';
import { Sex } from 'src/entities/patient.entity';

export class GetPatientDto {
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
}
