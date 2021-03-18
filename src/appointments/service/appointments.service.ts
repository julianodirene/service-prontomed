import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './../../entities/appointment.entity';
import { Note } from './../../entities/note.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AddNoteDto } from '../dto/add-note.dto';
import { AppointmentDto } from '../dto/appointment.dto';
import { AppointmentRepository } from '../repository/appointment.repository';
import { BusyScheduleException } from '../exception/busy-schedule.exception';
import { PatientNotFoundException } from '../exception/patient-not-found.exception';
import { Patient } from './../../entities/patient.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: AppointmentRepository,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) { }

  private async isScheduleFree(dateTime: Date) {
    const count = await this.appointmentRepository.count({ dateTime: dateTime });
    return count == 0
  }

  async create(appointmentDto: AppointmentDto) {
    const patient = await this.patientRepository.findOne(appointmentDto.patientId);
    if (patient == undefined) {
      throw new PatientNotFoundException();
    }
    if (!await this.isScheduleFree(appointmentDto.dateTime)) {
      throw new BusyScheduleException();
    }
    await this.appointmentRepository.insert({
      dateTime: appointmentDto.dateTime,
      patient: patient
    });
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({ loadRelationIds: true });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneJoinRelations(id);
    if (appointment == undefined) {
      throw new NotFoundException();
    } else {
      return appointment;
    }
  }

  async update(id: number, appointmentDto: AppointmentDto) {
    const result = await this.appointmentRepository.update(id, appointmentDto);
    if (result.affected < 1) {
      throw new NotFoundException();
    }
  }

  async remove(id: number) {
    const result = await this.appointmentRepository.delete(id);
    if (result.affected < 1) {
      throw new NotFoundException();
    }
  }

  async addNote(appointmentId: number, addNoteDto: AddNoteDto) {
    const appointment = await this.appointmentRepository.findOne(appointmentId);
    if (appointment == undefined) {
      throw new NotFoundException
    }

    const note = new Note();
    note.appointmentId = appointmentId;
    note.text = addNoteDto.text;

    await this.noteRepository.insert(note);
  }

  async findByPatient(patientId: number): Promise<Appointment[]> {
    return this.appointmentRepository.findByPatient(patientId);
  }
}
