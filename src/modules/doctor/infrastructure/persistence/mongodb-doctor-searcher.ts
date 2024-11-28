import { Appointment } from '@/modules/appointment/domain/appointment';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { User } from '@/modules/user/domain/user';
import { format } from 'date-fns';
import { MongoClient } from 'mongodb';
import { Doctor } from '../../domain/doctor';
import { DoctorSearcher } from '../../domain/doctor-index-store';

export class MongoDBDoctorSearcher implements DoctorSearcher {
  constructor(private client: MongoClient) {}
  get collection() {
    return this.client.db().collection('doctors');
  }
  async index() {
    let response = '';
    const indexes = await this.collection.listSearchIndexes().toArray();
    const textIndexExists = await this.collection.indexExists('text_index');
    const embedded = {
      name: 'vector_index',
      type: 'vectorSearch',
      definition: {
        fields: [
          {
            type: 'vector',
            path: 'embeddings',
            similarity: 'dotProduct',
            numDimensions: 1536,
          },
        ],
      },
    };
    const index = {
      name: 'text',
      specialty: 'text',
      email: 'text',
    };
    if (!indexes.some((i) => i.name === 'vector_index')) {
      response = await this.collection.createSearchIndex(embedded);
    }
    if (!textIndexExists) {
      response = await this.collection.createIndex(index as any, { name: 'doctor_search' });
    }

    return response;
  }

  async save(
    user: User,
    doctor: Doctor,
    appointments: {
      date: string;
      appointments: Primitives<Appointment>[];
      day: { availabilities: number; name: string };
    }[]
  ) {
    const userPrimitives = user.toPrimitives();
    const doctorPrimitives = doctor.toPrimitives();
    await this.collection.deleteOne({ doctorId: doctorPrimitives.id });
    await this.collection.insertOne({
      doctorId: doctorPrimitives.id,
      userId: userPrimitives.id,
      name: userPrimitives.name,
      email: userPrimitives.email,
      specialty: doctorPrimitives.specialty?.name,
      score: doctorPrimitives.score,
      experience: doctorPrimitives.experience,
      schedule: appointments,
    });
  }

  async search({
    term,
    availability,
    minRate,
    specialties,
  }: {
    term?: string;
    availability?: Date;
    minRate?: number;
    specialties?: string[];
  }) {
    const results = await this.collection
      .aggregate([
        ...(term ? this.getTextFilter(term) : []),
        ...(availability ? this.getAvailabilityFilter(availability) : []),
        ...(minRate ? this.getMinRateFilter(minRate) : []),
        ...(specialties ? this.getSpecialtiesFilter(specialties) : []),
      ])
      .toArray();

    return results;
  }

  private getTextFilter(term: string) {
    return [
      { $match: { $text: { $search: term } } },
      { $addFields: { score: { $meta: 'textScore' } } },
      { $sort: { score: { $meta: 'textScore' } } },
    ];
  }

  private getAvailabilityFilter(availability: Date) {
    const dayOfWeek = format(availability, 'EEEE').toLowerCase();
    return [
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ['$$schedule.date', dayOfWeek] },
              { $gte: [{ $size: '$$schedule.day.availabilities' }, { $size: '$$schedule.appointments' }] },
            ],
          },
        },
      },
    ];
  }

  private getMinRateFilter(minRate: number) {
    return [{ $match: { score: { $gt: minRate } } }];
  }

  private getSpecialtiesFilter(specialties: string[]) {
    return [{ $match: { specialty: { $in: specialties } } }];
  }
}