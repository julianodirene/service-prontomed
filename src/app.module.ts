import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApointmentsModule } from './apointments/apointments.module';
import { AppController } from './app.controller';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),  
    PatientsModule,
    ApointmentsModule
  ],
  controllers: [AppController],
})
export class AppModule {}
