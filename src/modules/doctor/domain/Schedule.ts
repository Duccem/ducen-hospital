import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';
import { NumberValueObject } from '@/modules/shared/domain/core/ValueObject';
import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { Day } from './Day';

export class Schedule {
  constructor(
    public id: Uuid,
    public appointmentDuration: NumberValueObject,
    public maxAppointmentsPerDay: NumberValueObject,
    public days: Day[]
  ) {}

  public static fromPrimitives(data: Primitives<Schedule>) {
    return new Schedule(
      new Uuid(data.id),
      new NumberValueObject(data.appointmentDuration),
      new NumberValueObject(data.maxAppointmentsPerDay),
      data.days.map(Day.fromPrimitives)
    );
  }

  public static create(appointmentDuration: number, maxAppointmentsPerDay: number, days: Primitives<Day>[]): Schedule {
    return new Schedule(
      Uuid.random(),
      new NumberValueObject(appointmentDuration),
      new NumberValueObject(maxAppointmentsPerDay),
      days.map((day) => Day.create(day.day, day.hours))
    );
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      appointmentDuration: this.appointmentDuration.value,
      maxAppointmentsPerDay: this.maxAppointmentsPerDay.value,
      days: this.days.map((day) => day.toPrimitives()),
    };
  }

  public static initialize(): Schedule {
    return Schedule.create(0, 0, []);
  }
}
