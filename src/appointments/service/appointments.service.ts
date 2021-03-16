import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/entities/appointment.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AppointmentDto } from '../dto/appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) { }

  async create(appointmentDto: AppointmentDto) {
    await this.appointmentRepository.save(appointmentDto);
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  findOne(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOne(id);
  }

  async update(id: number, appointmentDto: AppointmentDto) {
    await this.appointmentRepository.update(id, appointmentDto).then(function (result: UpdateResult) {
      if (result.affected < 1) {
        throw new NotFoundException();
      }
    });
  }

  async remove(id: number) {
    await this.appointmentRepository.delete(id);
  }
}
