import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppController } from './app.controller';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PatientsModule,
    AppointmentsModule
  ],
  controllers: [AppController],
})
export class AppModule { }
