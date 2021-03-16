import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './controller/patients.controller';
import { PatientRepository } from './repository/patient.repository';
import { PatientsService } from './service/patients.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientRepository])],
  controllers: [PatientsController],
  providers: [PatientsService]
})
export class PatientsModule { }
