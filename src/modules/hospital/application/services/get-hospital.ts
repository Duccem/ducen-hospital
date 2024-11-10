import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';
import { NotFoundError } from '@/modules/shared/domain/core/errors/not-found-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Hospital } from '../../domain/hospital';
import { HospitalRepository } from '../../domain/hospital-repository';

export class GetHospital {
  constructor(private hospitalRepository: HospitalRepository) {}

  async run(id: string): Promise<Primitives<Hospital>> {
    const hospital = await this.hospitalRepository.find(
      Criteria.fromValues([{ field: 'adminId', value: id, operator: Operator.EQUAL }])
    );

    if (!hospital) {
      throw new NotFoundError('Hospital not found');
    }

    return hospital.toPrimitives();
  }
}