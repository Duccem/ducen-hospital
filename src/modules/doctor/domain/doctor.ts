import { Appointment } from '@/modules/appointment/domain/appointment';
import { Aggregate } from '@/modules/shared/domain/core/aggregate';
import { DateValueObject, NumberValueObject, StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { AppointmentType } from './appointment-type';
import { ConsultingRoomAddress } from './consulting-room-address';
import { Day } from './day';
import { Education } from './educations';
import { ScheduleRegistered } from './events/schedule-registered';
import { Schedule } from './schedule';
import { Specialty } from './specialty';
import { User } from '@/modules/user/domain/user';

export class Doctor extends Aggregate {
  constructor(
    id: Uuid,
    public userId: Uuid,
    public licenseMedicalNumber: StringValueObject,
    public specialtyId: Uuid,
    public score: NumberValueObject,
    public experience: NumberValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
    public schedule?: Schedule,
    public consultingRoomAddress?: ConsultingRoomAddress,
    public educations?: Education[],
    public specialty?: Specialty,
    public appointmentTypes?: AppointmentType[],
    public appointments?: Appointment[],
    public user?: User
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(id: string, userId: string, licenseMedicalNumber: string, specialtyId: string): Doctor {
    return new Doctor(
      new Uuid(id),
      new Uuid(userId),
      new StringValueObject(licenseMedicalNumber),
      new Uuid(specialtyId),
      new NumberValueObject(0),
      new NumberValueObject(1),
      DateValueObject.today(),
      DateValueObject.today(),
      Schedule.initialize()
    );
  }

  static fromPrimitives(data: Primitives<Doctor>): Doctor {
    return new Doctor(
      new Uuid(data.id),
      new Uuid(data.userId),
      new StringValueObject(data.licenseMedicalNumber),
      new Uuid(data.specialtyId),
      new NumberValueObject(data.score),
      new NumberValueObject(data.experience),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
      data.schedule ? Schedule.fromPrimitives(data.schedule) : undefined,
      data.consultingRoomAddress ? ConsultingRoomAddress.fromPrimitives(data.consultingRoomAddress) : undefined,
      data.educations
        ? data.educations.map((education: Primitives<Education>) => Education.fromPrimitives(education))
        : [],
      data.specialty ? Specialty.fromPrimitives(data.specialty) : undefined,
      data.appointmentTypes ? data.appointmentTypes.map((type) => AppointmentType.fromPrimitives(type)) : [],
      data.appointments ? data.appointments.map((appointment) => Appointment.fromPrimitives(appointment)) : [],
      data.user ? User.fromPrimitives(data.user) : undefined
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      userId: this.userId.value,
      licenseMedicalNumber: this.licenseMedicalNumber.value,
      specialtyId: this.specialtyId.value,
      score: this.score.value,
      experience: this.experience.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      schedule: this.schedule ? this.schedule.toPrimitives() : undefined,
      consultingRoomAddress: this.consultingRoomAddress ? this.consultingRoomAddress.toPrimitives() : undefined,
      educations: this.educations ? this.educations.map((education) => education.toPrimitives()) : [],
      specialty: this.specialty ? this.specialty.toPrimitives() : undefined,
      appointmentTypes: this.appointmentTypes ? this.appointmentTypes.map((type) => type.toPrimitives()) : [],
      appointments: this.appointments ? this.appointments.map((appointment) => appointment.toPrimitives()) : [],
      user: this.user ? this.user.toPrimitives() : undefined,
    };
  }

  update(data: Partial<Primitives<Doctor>>) {
    const before = this.toPrimitives();
    const after = { ...before, ...data };
    return Doctor.fromPrimitives(after);
  }

  createConsultingRoomAddress(city: string, address: string) {
    this.consultingRoomAddress = ConsultingRoomAddress.create(city, address, { latitude: 0, longitude: 0 });
  }

  addEducation(education: Primitives<Education>) {
    if (!this.educations) {
      this.educations = [];
    }
    this.educations.push(Education.create(education.title, education.institution, education.graduatedAt.toString()));
  }

  editEducation(educationId: string, education: Primitives<Education>) {
    if (!this.educations) {
      return;
    }
    const index = this.educations.findIndex((edu) => edu.id.value === educationId);
    if (index >= 0) {
      this.educations[index] = this.educations[index]!.update(
        education.title,
        education.institution,
        education.graduatedAt.toString()
      );
    } else {
      throw new Error('Education not found');
    }
  }

  saveEducation(education: Primitives<Education>) {
    if (!this.educations) {
      this.educations = [];
    }
    const index = this.educations.findIndex((edu) => edu.id.value === education.id);
    if (index >= 0) {
      this.educations[index] = Education.fromPrimitives(education);
    } else {
      this.educations.push(Education.create(education.title, education.institution, education.graduatedAt.toString()));
    }
  }

  createSchedule(days: Primitives<Day>[]) {
    this.schedule = this.schedule ? this.schedule.update(days) : Schedule.create(1, 24, days);
    this.record(new ScheduleRegistered(this.id.value, days));
  }

  saveAppointmentType(appointmentType: Primitives<AppointmentType>) {
    if (!this.appointmentTypes) {
      this.appointmentTypes = [];
    }
    const index = this.appointmentTypes.findIndex((type) => type.id.value === appointmentType.id);
    if (index >= 0) {
      this.appointmentTypes[index] = AppointmentType.fromPrimitives(appointmentType);
    } else {
      this.appointmentTypes.push(
        AppointmentType.create(
          appointmentType.name,
          this.id.value,
          appointmentType.duration,
          appointmentType.color,
          false
        )
      );
    }
  }
}
