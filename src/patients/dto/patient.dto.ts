import { IsEmail, IsNumberString, IsIn, IsDateString, IsNumber, Length, IsPositive } from 'class-validator';

export class PatientDto {

	@Length(10, 100)
	name : string;

	@IsNumberString({no_symbols: true})
	@Length(11, 11)
	phone: string;

	@IsEmail()
	email: string;

	@IsDateString()
	birthDate: Date;

	@IsIn(["M", "F"])
	sex : Sex;

	@IsNumber()
	@IsPositive()
	height: number;

	@IsNumber()
	@IsPositive()
	weight: number;
}
