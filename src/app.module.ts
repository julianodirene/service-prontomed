import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppController } from './app.controller';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false
      }
    }),
    PatientsModule,
    AppointmentsModule
  ],
  controllers: [AppController],
})
export class AppModule { }
