import { Test, TestingModule } from '@nestjs/testing';
import { ApointmentsService } from './apointments.service';

describe('ApointmentsService', () => {
  let service: ApointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApointmentsService],
    }).compile();

    service = module.get<ApointmentsService>(ApointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
