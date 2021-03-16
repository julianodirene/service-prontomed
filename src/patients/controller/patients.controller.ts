import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PatientDto } from '../dto/patient.dto';
import { PatientsService } from '../service/patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() patientDto: PatientDto) {
    return this.patientsService.create(patientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() patientDto: PatientDto) {
    return this.patientsService.update(+id, patientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.anonymize(+id);
  }
}
