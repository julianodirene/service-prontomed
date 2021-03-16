import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientDto } from '../dto/patient.dto';
import { Patient } from '../entities/patient.entity';
import { PatientRepository } from '../repository/patient.repository';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: PatientRepository,
  ) {}

  async create(patientDto: PatientDto): Promise<void> {
    await this.patientsRepository.save(patientDto);
  }

  findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }

  findOne(id: number) : Promise<Patient> {
    return this.patientsRepository.findOne(id);
  }

  async update(id: number, patientDto: PatientDto) {
    await this.patientsRepository.update(id, patientDto);
  }

  anonymize(id: number) {
    this.patientsRepository.anonymize(id);
  }
}
