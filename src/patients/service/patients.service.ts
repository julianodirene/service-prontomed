import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/entities/patient.entity';
import { UpdateResult } from 'typeorm';
import { PatientDto } from '../dto/patient.dto';
import { PatientRepository } from '../repository/patient.repository';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: PatientRepository,
  ) { }

  async create(patientDto: PatientDto): Promise<void> {
    await this.patientsRepository.save(patientDto);
  }

  findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }

  findOne(id: number): Promise<Patient> {
    return this.patientsRepository.findOne(id);
  }

  async update(id: number, patientDto: PatientDto) {
    await this.patientsRepository.update(id, patientDto).then(function (result: UpdateResult) {
      if (result.affected < 1) {
        throw new NotFoundException();
      }
    });
  }

  anonymize(id: number) {
    this.patientsRepository.anonymize(id);
  }
}
