
import { ApiProperty } from '@nestjs/swagger';

export class GetAppointmentDto {
	@ApiProperty()
	id: number

	@ApiProperty()
	dateTime: Date;

	@ApiProperty()
	patientId: number;

	@ApiProperty()
	createdAt: Date

	@ApiProperty()
	updatedAt: Date
}
