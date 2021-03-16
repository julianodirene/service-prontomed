import { IsEmail, IsNumberString, IsIn, IsDateString, IsNumber, Length, IsPositive } from 'class-validator';
import { Sex } from 'src/entities/patient.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PatientDto {

	@ApiProperty()
	@Length(10, 100)
	name: string;

	@ApiProperty()
	@IsNumberString({ no_symbols: true })
	@Length(11, 11)
	phone: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsDateString()
	birthDate: Date;

	@ApiProperty()
	@IsIn(["M", "F"])
	sex: Sex;

	@ApiProperty()
	@IsNumber()
	@IsPositive()
	height: number;

	@ApiProperty()
	@IsNumber()
	@IsPositive()
	weight: number;
}
