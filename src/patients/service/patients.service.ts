import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { Patient } from '../entity/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private usersRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<void> {
    await this.usersRepository.save(createPatientDto);
  }

  findAll(): Promise<Patient[]> {
    return this.usersRepository.find();
  }

  findOne(id: number) : Promise<Patient> {
    return this.usersRepository.findOne(id);
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    await this.usersRepository.update(id, updatePatientDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
