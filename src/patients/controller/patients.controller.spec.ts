
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './../../entities/note.entity';
import { Patient } from './../../entities/patient.entity';
import { PatientDto } from '../dto/patient.dto';
import { PatientRepository } from '../repository/patient.repository';
import { PatientsService } from '../service/patients.service';
import { PatientsController } from './patients.controller';

describe('PatientsController', () => {
  let controller: PatientsController;
  let service: PatientsService;

  let serviceMock = {
    create: function (patientDto: PatientDto) { return },
    findAll: function (): Promise<Patient[]> { return },
    findOne: function (): Promise<Patient> { return },
    findNotes: function (): Promise<Patient> { return },
    update: function (id: number, patientDto: PatientDto) { return },
    anonymize: function (id: number) { return }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
        {
          provide: PatientsService,
          useValue: serviceMock
        }
      ],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
    service = module.get<PatientsService>(PatientsService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('create', () => {
    it('should create successfully', async () => {
      const patient = new PatientDto();
      jest.spyOn(service, 'create').mockResolvedValueOnce();
      await controller.create(patient);
      expect(service.create).toBeCalled();
    });
  });

  describe('findAll', () => {
    it('should retrieve patients successfully', async () => {
      const result = [new Patient(), new Patient()];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(result);
      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toBeCalled();
    });
  });

  describe('findOne', () => {
    it('should retrieve patient successfully', async () => {
      const result = new Patient();
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(result);
      expect(await controller.findOne('1')).toBe(result);
      expect(service.findOne).toBeCalled();
    });

    it('should throw NotFoundException when service throw NotFoundException', () => {
      jest.spyOn(service, 'findOne').mockImplementation((): Promise<Patient> => {
        throw new NotFoundException();
      });
      expect(() => { controller.findOne('1') }).toThrow(NotFoundException);
      expect(service.findOne).toBeCalled();
    });
  });

  describe('findNotes', () => {
    it('should retrieve patient notes successfully', async () => {
      const result = new Patient();
      jest.spyOn(service, 'findNotes').mockResolvedValueOnce(result);
      expect(await controller.findNotes('1')).toBe(result);
      expect(service.findNotes).toBeCalled();
    });

    it('should throw NotFoundException when service throw NotFoundException', () => {
      jest.spyOn(service, 'findNotes').mockImplementation((): Promise<Patient> => {
        throw new NotFoundException()
      });
      expect(() => { controller.findNotes('1') }).toThrow(NotFoundException);
      expect(service.findNotes).toBeCalled();
    });
  });

  describe('update', () => {
    it('should update patient successfully', () => {
      const patient = new PatientDto();
      const result = null
      jest.spyOn(service, 'update').mockImplementation(() => result);
      expect(controller.update('1', patient)).toBe(result);
      expect(service.update).toBeCalled();
    });

    it('should throw NotFoundException when service throw NotFoundException', () => {
      const patient = new PatientDto();
      jest.spyOn(service, 'update').mockImplementation(() => {
        throw new NotFoundException()
      });
      expect(() => { controller.update('1', patient) }).toThrow(NotFoundException);
      expect(service.update).toBeCalled();
    });
  });


  describe('remove', () => {
    it('should anonymize patient successfully', () => {
      const patient = new PatientDto();
      const result = null
      jest.spyOn(service, 'anonymize').mockImplementation(() => result);
      expect(controller.remove('1')).toBe(result);
      expect(service.anonymize).toBeCalled();
    });

    it('should throw NotFoundException when service throw NotFoundException', () => {
      const patient = new PatientDto();
      jest.spyOn(service, 'anonymize').mockImplementation(() => {
        throw new NotFoundException()
      });
      expect(() => { controller.remove('1') }).toThrow(NotFoundException);
      expect(service.anonymize).toBeCalled();
    });
  });

});
