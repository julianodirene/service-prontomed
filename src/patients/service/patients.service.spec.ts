import { Test, TestingModule } from '@nestjs/testing';
import { PatientRepository } from '../repository/patient.repository';
import { PatientsService } from './patients.service';
import { PatientDto } from '../dto/patient.dto';
import { Patient } from './../../entities/patient.entity';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('PatientsService', () => {
  let service: PatientsService;
  let repository: PatientRepository;

  let repositoryMock = {
    insert: function (patientDto: PatientDto): Promise<InsertResult> { return },
    find: function (): Promise<Patient[]> { return },
    findOne: function (id: number): Promise<Patient> { return },
    findNotes: function (id: number): Promise<Patient> { return },
    update: function (id: number, patientDto: PatientDto): Promise<UpdateResult> { return },
    anonymize: function (id: number) { return }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsService,
        {
          provide: getRepositoryToken(Patient),
          useValue: repositoryMock
        }
      ]
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    repository = module.get<PatientRepository>(getRepositoryToken(Patient));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create successfully', () => {
      const patient = new PatientDto();
      const result = new InsertResult();
      jest.spyOn(repository, 'insert').mockResolvedValueOnce(result);
      service.create(patient);
      expect(repository.insert).toBeCalled();
    });
  });

  describe('findAll', () => {
    it('should retrieve patients successfully', async () => {
      const result = [new Patient(), new Patient()];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(result);
      expect(await service.findAll()).toBe(result);
      expect(repository.find).toBeCalled();
    });
  });

  describe('findOne', () => {
    it('should retrieve patient successfully', async () => {
      const result = new Patient();
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(result);
      expect(await service.findOne(12)).toMatchObject(result);
      expect(repository.findOne).toBeCalled();
    });

    // it('should throw NotFoundException when repository not found the patient', () => {
    //   jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);
    //   expect(async () => { await service.findOne(12) }).toThrow(NotFoundException);
    // });

  });

  describe('update', () => {
    it('should update patient successfully', () => {
      const patient = new PatientDto();
      const result = new UpdateResult();
      result.affected = 1
      jest.spyOn(repository, 'update').mockResolvedValueOnce(result);
      service.update(12, patient)
      expect(repository.update).toBeCalled();
    });

    // it('should throw NotFoundException when update does not affect any row', async () => {
    //   const patient = new PatientDto();
    //   const result = new UpdateResult();
    //   result.affected = 0
    //   jest.spyOn(repository, 'update').mockResolvedValueOnce(result);
    //   expect(() => { service.update(12, patient) }).toThrow(NotFoundException);
    //   expect(repository.update).toBeCalled();
    // });
  });

  describe('anonymize', () => {
    it('should anonymize patient successfully', () => {
      const result = new UpdateResult();
      result.affected = 1
      jest.spyOn(repository, 'anonymize').mockResolvedValueOnce(result);
      service.anonymize(12)
      expect(repository.anonymize).toBeCalled();
    });

    // it('should throw NotFoundException when anonymize does not affect any row', async () => {
    //   const patient = new PatientDto();
    //   const result = new UpdateResult();
    //   result.affected = 0
    //   jest.spyOn(repository, 'update').mockResolvedValueOnce(result);
    //   expect(() => { service.update(12, patient) }).toThrow(NotFoundException);
    //   expect(repository.update).toBeCalled();
    // });
  });
});
