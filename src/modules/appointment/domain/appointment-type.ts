import { StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';

export class AppointmentType {
  constructor(public id: Uuid, public name: StringValueObject, public color: StringValueObject) {}

  public static create(name: string, color: string): AppointmentType {
    return new AppointmentType(Uuid.random(), new StringValueObject(name), new StringValueObject(color));
  }

  public static fromPrimitives(data: Primitives<AppointmentType>): AppointmentType {
    return new AppointmentType(new Uuid(data.id), new StringValueObject(data.name), new StringValueObject(data.color));
  }

  public toPrimitives(): Primitives<AppointmentType> {
    return {
      id: this.id.toString(),
      name: this.name.getValue(),
      color: this.color.getValue(),
    };
  }
}
