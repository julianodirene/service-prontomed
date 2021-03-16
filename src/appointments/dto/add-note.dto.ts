
import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class AddNoteDto {
    @ApiProperty()
    @MinLength(20)
    text: string;
}
