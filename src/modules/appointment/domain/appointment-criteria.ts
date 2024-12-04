import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';

export class AppointmentCriteria {
  static searchByDoctorId(doctorId: string): Criteria {
    return Criteria.fromValues([{ field: 'doctorId', value: doctorId, operator: Operator.EQUAL }]);
  }

  static searchByStatus(status: string): Criteria {
    return Criteria.fromValues([{ field: 'status', value: status, operator: Operator.EQUAL }]);
  }

  static searchByDate(date: Date): Criteria {
    return Criteria.fromValues([{ field: 'date', value: date, operator: Operator.EQUAL }]);
  }
}
