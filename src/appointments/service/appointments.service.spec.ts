import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './../../entities/appointment.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { AppointmentDto } from '../dto/appointment.dto';
import { Note } from './../../entities/note.entity';
import { AppointmentRepository } from '../../appointments/repository/appointment.repository';
import { AppointmentsService } from './appointments.service';
import { NotFoundException } from '@nestjs/common';
import { AddNoteDto } from '../dto/add-note.dto';
import { Patient } from './../../entities/patient.entity';

describe('AppointmentsService', () => {
    let service: AppointmentsService;
    let appointmentRepository: AppointmentRepository;
    let noteRepository: Repository<Note>;
    let patientRepository: Repository<Patient>;

    let appointmentRepositoryMock = {
        insert: function (patientDto: AppointmentDto): Promise<InsertResult> { return },
        find: function (): Promise<Appointment[]> { return },
        findOne: function (id: number): Promise<Appointment> { return },
        count: function (): Promise<number> { return },
        update: function (id: number, patientDto: AppointmentDto): Promise<UpdateResult> { return },
        delete: function (id: number): Promise<DeleteResult> { return },
        findOneJoinRelations: function (id: number): Promise<Appointment> { return },
        findByPatient: function (): Promise<Appointment[]> { return }
    };

    let noteRepositoryMock = {
        insert: function (note: Note): Promise<InsertResult> { return },
    };

    let patientRepositoryMock = {
        findOne: function (id: number): Promise<Patient> { return },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppointmentsService,
                {
                    provide: getRepositoryToken(Appointment),
                    useValue: appointmentRepositoryMock
                },
                {
                    provide: getRepositoryToken(Note),
                    useValue: noteRepositoryMock
                },
                {
                    provide: getRepositoryToken(Patient),
                    useValue: patientRepositoryMock
                }
            ]
        }).compile();

        service = module.get<AppointmentsService>(AppointmentsService);
        appointmentRepository = module.get<AppointmentRepository>(getRepositoryToken(Appointment));
        noteRepository = module.get<Repository<Note>>(getRepositoryToken(Note));
        patientRepository = module.get<Repository<Patient>>(getRepositoryToken(Patient));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create appointment successfully', async () => {
            const appointment = new AppointmentDto();
            const patient = new Patient();
            const count = 0;
            const result = new InsertResult();
            jest.spyOn(patientRepository, 'findOne').mockResolvedValueOnce(patient);
            jest.spyOn(appointmentRepository, 'count').mockResolvedValueOnce(count);
            jest.spyOn(appointmentRepository, 'insert').mockResolvedValueOnce(result);
            await service.create(appointment);
            expect(appointmentRepository.insert).toBeCalled();
        });
    });

    describe('findAll', () => {
        it('should retrieve appointments successfully', async () => {
            const result = [new Appointment(), new Appointment()];
            jest.spyOn(appointmentRepository, 'find').mockResolvedValueOnce(result);
            expect(await service.findAll()).toBe(result);
            expect(appointmentRepository.find).toBeCalled();
        });
    });

    describe('findOne', () => {
        it('should retrieve appointment successfully', async () => {
            const result = new Appointment();
            jest.spyOn(appointmentRepository, 'findOneJoinRelations').mockResolvedValueOnce(result);
            expect(await service.findOne(12)).toMatchObject(result);
            expect(appointmentRepository.findOneJoinRelations).toBeCalled();
        });

        // it('should throw NotFoundException when repository not found the appointment', () => {
        //     jest.spyOn(appointmentRepository, 'findOne').mockResolvedValueOnce(undefined);
        //     expect(async () => { await service.findOne(12) }).toThrow(NotFoundException);
        // });
    });

    describe('update', () => {
        it('should update patient successfully', () => {
            const appointment = new AppointmentDto();
            const result = new UpdateResult();
            result.affected = 1
            jest.spyOn(appointmentRepository, 'update').mockResolvedValueOnce(result);
            service.update(12, appointment)
            expect(appointmentRepository.update).toBeCalled();
        });

        // it('should throw NotFoundException when update does not affect any row', async () => {
        //     const appointment = new AppointmentDto();
        //     const result = new UpdateResult();
        //     result.affected = 0
        //     jest.spyOn(appointmentRepository, 'update').mockResolvedValueOnce(result);
        //     expect(() => { service.update(12, appointment) }).toThrow(NotFoundException);
        //     expect(appointmentRepository.update).toBeCalled();
        // });
    });

    describe('remove', () => {
        it('should remove patient successfully', () => {
            const result = new DeleteResult();
            result.affected = 1
            jest.spyOn(appointmentRepository, 'delete').mockResolvedValueOnce(result);
            service.remove(12)
            expect(appointmentRepository.delete).toBeCalled();
        });

        // it('should throw NotFoundException when remove does not affect any row', async () => {
        //     const result = new UpdateResult();
        //     result.affected = 0
        //     jest.spyOn(appointmentRepository, 'delete').mockResolvedValueOnce(result);
        //     expect(() => { service.remove(12) }).toThrow(NotFoundException);
        //     expect(appointmentRepository.update).toBeCalled();
        // });
    });

    describe('addNote', () => {
        it('should add note successfully', async () => {
            const addNoteDto = new AddNoteDto();
            addNoteDto.text = "Nota de teste"
            const appointment = new Appointment();
            appointment.id = 1563;
            const insertResult = new InsertResult();
            jest.spyOn(appointmentRepository, 'findOne').mockResolvedValueOnce(appointment);
            jest.spyOn(noteRepository, 'insert').mockResolvedValueOnce(insertResult);

            await service.addNote(1563, addNoteDto)
            expect(appointmentRepository.findOne).toBeCalled();
            expect(noteRepository.insert).toBeCalled();
        });

        // it('should throw NotFoundException when remove does not affect any row', () => {
        //     const addNoteDto = new AddNoteDto();
        //     addNoteDto.text = "Nota de teste";
        //     const appointment = new Appointment();
        //     appointment.id = 1563;
        //     const insertResult = new InsertResult();
        //     jest.spyOn(appointmentRepository, 'findOne').mockResolvedValueOnce(appointment);
        //     jest.spyOn(noteRepository, 'insert').mockResolvedValueOnce(insertResult);

        //     expect(async () => { await service.addNote(223, addNoteDto) }).toThrow(NotFoundException);
        // });
    });

    describe('findByPatient', () => {
        it('should retrieve appointments successfully', async () => {
            const result = [new Appointment(), new Appointment()];
            jest.spyOn(appointmentRepository, 'findByPatient').mockResolvedValueOnce(result);
            expect(await service.findByPatient(123)).toBe(result);
            expect(appointmentRepository.findByPatient).toBeCalled();
        });
    });

});
