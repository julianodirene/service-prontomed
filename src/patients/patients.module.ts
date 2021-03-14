import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './controller/patients.controller';
import { Patient } from './entity/patient.entity';
import { PatientsService } from './service/patients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientsController],
  providers: [PatientsService]
})
export class PatientsModule {}
