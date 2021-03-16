import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/entities/appointment.entity';
import { Note } from 'src/entities/note.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AddNoteDto } from '../dto/add-note.dto';
import { AppointmentDto } from '../dto/appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Note)
    private noteRepository: Repository<Appointment>,
  ) { }

  async create(appointmentDto: AppointmentDto) {
    await this.appointmentRepository.save(appointmentDto);
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  findOne(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOne(id);
  }

  async update(id: number, appointmentDto: AppointmentDto) {
    await this.appointmentRepository.update(id, appointmentDto).then(function (result: UpdateResult) {
      if (result.affected < 1) {
        throw new NotFoundException();
      }
    });
  }

  async remove(id: number) {
    await this.appointmentRepository.delete(id);
  }

  async addNote(appointmentId: number, addNoteDto: AddNoteDto) {
    await this.appointmentRepository.findOne(appointmentId).then(function (appointment: Appointment) {
      if (appointment == undefined) {
        throw new NotFoundException
      }
    });
    const note = new Note();
    note.appointmentId = appointmentId;
    note.text = addNoteDto.text;
    this.noteRepository.save(note);
  }
}
