import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './../../entities/appointment.entity';
import { Note } from './../../entities/note.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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
    await this.appointmentRepository.insert(appointmentDto);
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne(id);
    if (appointment == undefined) {
      throw new NotFoundException();
    } else {
      return appointment;
    }
  }

  update(id: number, appointmentDto: AppointmentDto) {
    this.appointmentRepository.update(id, appointmentDto).then(function (result: UpdateResult) {
      if (result.affected < 1) {
        throw new NotFoundException();
      }
    });
  }

  async remove(id: number) {
    await this.appointmentRepository.delete(id).then(function (result: DeleteResult) {
      if (result.affected < 1) {
        throw new NotFoundException();
      }
    });
  }

  async addNote(appointmentId: number, addNoteDto: AddNoteDto) {
    const appointment = await this.appointmentRepository.findOne(appointmentId);
    if (appointment == undefined) {
      throw new NotFoundException
    }

    const note = new Note();
    note.appointmentId = appointmentId;
    note.text = addNoteDto.text;

    this.noteRepository.insert(note);

    console.log(appointmentId);
  }
}
