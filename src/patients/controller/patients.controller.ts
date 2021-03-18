import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PatientDto } from '../dto/patient.dto';
import { GetPatientDto } from '../dto/get-patient.dto';
import { GetPatientNotesDto } from '../dto/get-patient-notes.dto'
import { PatientsService } from '../service/patients.service';
import { ApiTags, ApiNotFoundResponse, ApiOkResponse, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  @ApiCreatedResponse({ description: "Created successfully" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @Post()
  create(@Body() patientDto: PatientDto) {
    return this.patientsService.create(patientDto);
  }

  @ApiOkResponse({ description: 'Retrieved patients successfully', type: [GetPatientDto] })
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @ApiOkResponse({ description: 'Retrieved patient successfully', type: GetPatientDto })
  @ApiNotFoundResponse({ description: "Patient not found" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Retrieved patient notes successfully', type: GetPatientNotesDto })
  @ApiNotFoundResponse({ description: "Patient not found" })
  @Get(':id/notes')
  findNotes(@Param('id') id: string) {
    return this.patientsService.findNotes(+id);
  }

  @ApiOkResponse({ description: "Updated successfully" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @ApiNotFoundResponse({ description: "Patient not found" })
  @Put(':id')
  update(@Param('id') id: string, @Body() patientDto: PatientDto) {
    return this.patientsService.update(+id, patientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.anonymize(+id);
  }
}
