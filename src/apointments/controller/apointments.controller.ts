import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApointmentsService } from './../service/apointments.service';
import { ApointmentDto } from '../dto/apointment.dto';

@Controller('apointments')
export class ApointmentsController {
  constructor(private readonly apointmentsService: ApointmentsService) {}

  @Post()
  create(@Body() apointmentDto: ApointmentDto) {
    return this.apointmentsService.create(apointmentDto);
  }

  @Get()
  findAll() {
    return this.apointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apointmentsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() apointmentDto: ApointmentDto) {
    return this.apointmentsService.update(+id, apointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apointmentsService.remove(+id);
  }
}
