import { Module } from '@nestjs/common';
import { ApointmentsService } from './service/apointments.service';
import { ApointmentsController } from './controller/apointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apointment } from './entities/apointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apointment])],
  controllers: [ApointmentsController],
  providers: [ApointmentsService]
})
export class ApointmentsModule {}
