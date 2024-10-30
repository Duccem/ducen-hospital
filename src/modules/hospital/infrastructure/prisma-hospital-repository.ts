import { Criteria } from '@/modules/shared/domain/core/criteria';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { PrismaCriteriaConverter } from '@/modules/shared/infrastructure/persistence/prisma/prisma-criteria-converter';
import { PrismaClient } from '@prisma/client';
import { Hospital } from '../domain/hospital';
import { HospitalRepository } from '../domain/hospital-repository';

export class PrismaHospitalRepository implements HospitalRepository {
  private converter = new PrismaCriteriaConverter();

  constructor(private client: PrismaClient) {}

  get model() {
    return this.client.hospital;
  }

  async save(hospital: Hospital): Promise<void> {
    const data = hospital.toPrimitives();

    await this.model.upsert({
      where: { id: data.id },
      update: {
        adminId: data.adminId,
        address: {
          update: hospital.address.toPrimitives(),
        },
      },
      create: {
        id: data.id,
        adminId: data.adminId,
        address: {
          create: hospital.address.toPrimitives(),
        },
      },
    });
  }

  async find(criteria: Criteria): Promise<Hospital | null> {
    const { where } = this.converter.criteria(criteria);
    const hospital = await this.model.findFirst({ where, include: { address: true } });

    if (!hospital) return null;

    return Hospital.fromPrimitives(hospital as unknown as Primitives<Hospital>);
  }
  async search(criteria: Criteria): Promise<Hospital[]> {
    const { where, skip, orderBy, take } = this.converter.criteria(criteria);
    const hospitals = await this.model.findMany({ where, include: { address: true }, skip, orderBy, take });

    return hospitals.map((hospital) => Hospital.fromPrimitives(hospital as unknown as Primitives<Hospital>));
  }
}