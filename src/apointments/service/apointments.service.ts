import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apointment } from '../entities/apointment.entity';
import { ApointmentDto } from '../dto/apointment.dto';

@Injectable()
export class ApointmentsService {
  constructor(
    @InjectRepository(Apointment)
    private apointmentRepository: Repository<Apointment>,
  ) {}

  async create(apointmentDto: ApointmentDto) {
    await this.apointmentRepository.save(apointmentDto);
  }

  findAll(): Promise<Apointment[]> {
    return this.apointmentRepository.find();
  }

  findOne(id: number) : Promise<Apointment> {
    return this.apointmentRepository.findOne(id);
  }

  async update(id: number, apointmentDto: ApointmentDto) {
    await this.apointmentRepository.update(id, apointmentDto);
  }

  async remove(id: number) {
    await this.apointmentRepository.delete(id);
  }
}
