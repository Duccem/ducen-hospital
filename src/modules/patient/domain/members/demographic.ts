import { StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Primitives } from '@/modules/shared/domain/types/primitives';

export class PatientDemographic {
  constructor(public civilStatus: CivilStatus, public occupation: Occupation, public educativeLevel: EducativeLevel) {}

  toPrimitives(): Primitives<PatientDemographic> {
    return {
      civilStatus: this.civilStatus.value,
      occupation: this.occupation.value,
      educativeLevel: this.educativeLevel.value,
    };
  }

  static fromPrimitives(primitives: Primitives<PatientDemographic>): PatientDemographic {
    return new PatientDemographic(
      new CivilStatus(primitives.civilStatus),
      new Occupation(primitives.occupation),
      new EducativeLevel(primitives.educativeLevel)
    );
  }

  static create(civilStatus: string, occupation: string, educativeLevel: string): PatientDemographic {
    return new PatientDemographic(
      new CivilStatus(civilStatus),
      new Occupation(occupation),
      new EducativeLevel(educativeLevel)
    );
  }
}

export class CivilStatus extends StringValueObject {}
export class Occupation extends StringValueObject {}
export class EducativeLevel extends StringValueObject {}