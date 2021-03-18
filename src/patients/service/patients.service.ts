import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './../../entities/patient.entity';
import { UpdateResult } from 'typeorm';
import { PatientDto } from '../dto/patient.dto';
import { PatientsRepository } from '../repository/patient.repository';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: PatientsRepository
  ) { }

  async create(patientDto: PatientDto) {
    await this.patientsRepository.insert(patientDto);
  }

  findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientsRepository.findOne(id);
    if (patient == undefined) {
      throw new NotFoundException();
    } else {
      return patient;
    }
  }

  async findNotes(id: number): Promise<Patient> {
    const patient = await this.patientsRepository.findNotes(id);
    if (patient == undefined) {
      throw new NotFoundException();
    } else {
      return patient;
    }
  }

  update(id: number, patientDto: PatientDto) {
    this.patientsRepository.update(id, patientDto).then(function (result: UpdateResult) {
      if (result.affected < 1) {
        throw new NotFoundException();
      }
    });
  }

  anonymize(id: number) {
    this.patientsRepository.anonymize(id).then(function (result: UpdateResult) {
      if (result.affected < 1) {
        throw new NotFoundException();
      }
    });
  }
}
