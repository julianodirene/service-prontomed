import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PatientDto } from '../dto/patient.dto';
import { GetPatientDto } from '../dto/get-patient.dto';
import { PatientsService } from '../service/patients.service';
import { ApiTags, ApiNotFoundResponse, ApiOkResponse, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Patient } from 'src/entities/patient.entity';

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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
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
