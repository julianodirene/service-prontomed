import { Patient } from './patient.entity';

describe('Patient', () => {
  it('should be defined', () => {
    expect(new Patient()).toBeDefined();
  });
});
