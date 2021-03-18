import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './controller/patients.controller';
import { PatientsRepository } from './repository/patient.repository';
import { PatientsService } from './service/patients.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientsRepository])],
  controllers: [PatientsController],
  providers: [PatientsService]
})
export class PatientsModule { }
