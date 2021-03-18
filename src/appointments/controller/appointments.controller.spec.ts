import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from '../service/appointments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './../../entities/appointment.entity';
import { Note } from './../../entities/note.entity';
import { AppointmentDto } from '../dto/appointment.dto';
import { AddNoteDto } from '../dto/add-note.dto';
import { NotFoundException } from '@nestjs/common';

describe('AppointmentsController', () => {
    let controller: AppointmentsController;
    let service: AppointmentsService;

    let serviceMock = {
        create: function (patientDto: AppointmentDto) { return },
        findAll: function (): Promise<Appointment[]> { return },
        findOne: function (id: number): Promise<Appointment> { return },
        findNotes: function (id: number): Promise<Appointment> { return },
        update: function (id: number, patientDto: AppointmentDto) { return },
        remove: function (id: number) { return },
        addNote: function (appointmentId: number, addNoteDto: AddNoteDto) { return },
        findByPatient: function (): Promise<Appointment[]> { return }
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppointmentsController],
            providers: [
                {
                    provide: AppointmentsService,
                    useValue: serviceMock
                }
            ]
        }).compile();

        controller = module.get<AppointmentsController>(AppointmentsController);
        service = module.get<AppointmentsService>(AppointmentsService)
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create appointment successfully', async () => {
            const appointment = new AppointmentDto();
            jest.spyOn(service, 'create').mockResolvedValueOnce();
            await controller.create(appointment);
            expect(service.create).toBeCalled();
        });
    });

    describe('findAll', () => {
        it('should retrieve appointments successfully', async () => {
            const result = [new Appointment(), new Appointment()];
            jest.spyOn(service, 'findAll').mockResolvedValueOnce(result);
            expect(await controller.findAll()).toBe(result);
            expect(service.findAll).toBeCalled();
        });
    });

    describe('findOne', () => {
        it('should retrieve appointment successfully', async () => {
            const result = new Appointment();
            jest.spyOn(service, 'findOne').mockResolvedValueOnce(result);
            expect(await controller.findOne('1')).toBe(result);
            expect(service.findOne).toBeCalled();
        });

        it('should throw NotFoundException when service throw NotFoundException', () => {
            jest.spyOn(service, 'findOne').mockImplementation((): Promise<Appointment> => {
                throw new NotFoundException();
            });
            expect(() => { controller.findOne('1') }).toThrow(NotFoundException);
            expect(service.findOne).toBeCalled();
        });
    });


    describe('update', () => {
        it('should update appointment successfully', () => {
            const appointment = new AppointmentDto();
            jest.spyOn(service, 'update').mockResolvedValueOnce();
            controller.update('1', appointment)
            expect(service.update).toBeCalled();
        });

        it('should throw NotFoundException when service throw NotFoundException', () => {
            const appointment = new AppointmentDto();
            jest.spyOn(service, 'update').mockImplementation(() => {
                throw new NotFoundException()
            });
            expect(() => { controller.update('1', appointment) }).toThrow(NotFoundException);
            expect(service.update).toBeCalled();
        });
    });


    describe('remove', () => {
        it('should remove appointments successfully', () => {
            jest.spyOn(service, 'remove').mockResolvedValueOnce();
            controller.remove('1')
            expect(service.remove).toBeCalled();
        });

        it('should throw NotFoundException when service throw NotFoundException', () => {
            jest.spyOn(service, 'remove').mockImplementation(() => {
                throw new NotFoundException()
            });
            expect(() => { controller.remove('1') }).toThrow(NotFoundException);
            expect(service.remove).toBeCalled();
        });
    });

    describe('addNote', () => {
        it('should addNote to appointment successfully', () => {
            const addNoteDto = new AddNoteDto();
            jest.spyOn(service, 'addNote').mockResolvedValueOnce();
            controller.addNote('1', addNoteDto)
            expect(service.remove).toBeCalled();
        });
    });

    describe('findByPatient', () => {
        it('should retrieve appointments successfully', async () => {
            const result = [new Appointment(), new Appointment()];
            jest.spyOn(service, 'findByPatient').mockResolvedValueOnce(result);
            expect(await controller.findByPatient('123')).toBe(result);
            expect(service.findByPatient).toBeCalled();
        });
    });
});
