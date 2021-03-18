import { Module } from '@nestjs/common';
import { AppointmentsService } from './service/appointments.service';
import { AppointmentsController } from './controller/appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRepository } from './repository/appointment.repository';
import { Note } from './../entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentRepository, Note])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService]
})
export class AppointmentsModule { }
