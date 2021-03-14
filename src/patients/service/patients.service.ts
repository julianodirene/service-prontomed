import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { Patient } from '../entity/patient.entity';
import { PatientRepository } from '../repository/patient.repository';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: PatientRepository,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<void> {
    await this.patientsRepository.save(createPatientDto);
  }

  findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }

  findOne(id: number) : Promise<Patient> {
    return this.patientsRepository.findOne(id);
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    await this.patientsRepository.update(id, updatePatientDto);
  }

  async anonymize(id: number): Promise<void> {
    this.patientsRepository.anonymize(id);
  }
}
