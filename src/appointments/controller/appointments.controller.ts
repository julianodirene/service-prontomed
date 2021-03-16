import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AddNoteDto } from '../dto/add-note.dto';
import { AppointmentDto } from '../dto/appointment.dto';
import { AppointmentsService } from '../service/appointments.service';


@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @Post()
  create(@Body() appointmentDto: AppointmentDto) {
    return this.appointmentsService.create(appointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() appointmentDto: AppointmentDto) {
    return this.appointmentsService.update(+id, appointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }

  @Post(':id/note')
  addNote(@Param('id') appointmentId: string, @Body() addNoteDto: AddNoteDto) {
    return this.appointmentsService.addNote(+appointmentId, addNoteDto);
  }
}
