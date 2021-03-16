
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDateString } from 'class-validator';

export class AppointmentDto {
	@ApiProperty()
	@IsDateString()
	dateTime: Date;

	@ApiProperty()
	@IsNumber()
	patientId: number;
}
