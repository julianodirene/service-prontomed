import { Module } from '@nestjs/common';
import { AppointmentsService } from './service/appointments.service';
import { AppointmentsController } from './controller/appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRepository } from './repository/appointment.repository';
import { Note } from './../entities/note.entity';
import { Patient } from './../entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentRepository, Note, Patient])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService]
})
export class AppointmentsModule { }
