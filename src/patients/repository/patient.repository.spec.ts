import { Patient } from '../../entities/patient.entity';
import { PatientRepository } from './patient.repository';

describe('PatientRepository', () => {
  let repository = new PatientRepository()

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('anonymize', () => {
    it('should anonymize patient successfully', async () => {
      const result = undefined;
      const patient = new Patient()
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(patient);
      jest.spyOn(repository, 'update').mockResolvedValueOnce(result);

      expect(await repository.anonymize(3)).toBe(result);
      expect(repository.findOne).toBeCalled();
      expect(repository.update).toBeCalled();
    });
  });
});
