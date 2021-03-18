import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AddNoteDto } from '../dto/add-note.dto';
import { AppointmentDto } from '../dto/appointment.dto';
import { AppointmentsService } from '../service/appointments.service';
import { ApiTags, ApiNotFoundResponse, ApiOkResponse, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { GetAppointmentDto } from '../dto/get-appointment.dto';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @ApiCreatedResponse({ description: "Created successfully" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @Post()
  create(@Body() appointmentDto: AppointmentDto) {
    return this.appointmentsService.create(appointmentDto);
  }

  @ApiOkResponse({ description: 'Retrieved appointments successfully', type: [GetAppointmentDto] })
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @ApiOkResponse({ description: 'Retrieved appointment successfully', type: GetAppointmentDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @ApiOkResponse({ description: "Updated successfully" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiNotFoundResponse({ description: "Appointment not found" })
  @Put(':id')
  update(@Param('id') id: string, @Body() appointmentDto: AppointmentDto) {
    return this.appointmentsService.update(+id, appointmentDto);
  }

  @ApiOkResponse({ description: 'Deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }

  @ApiCreatedResponse({ description: "Created successfully" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiNotFoundResponse({ description: "Appointment not found" })
  @Post(':id/note')
  addNote(@Param('id') appointmentId: string, @Body() addNoteDto: AddNoteDto) {
    return this.appointmentsService.addNote(+appointmentId, addNoteDto);
  }
}
