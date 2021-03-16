import { Test, TestingModule } from '@nestjs/testing';
import { ApointmentsController } from './apointments.controller';
import { ApointmentsService } from './../service/apointments.service';

describe('ApointmentsController', () => {
  let controller: ApointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApointmentsController],
      providers: [ApointmentsService],
    }).compile();

    controller = module.get<ApointmentsController>(ApointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
