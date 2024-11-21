import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const CREATE_SCHEDULE = gql`
  mutation createSchedule($doctorId: String!, $days: [Day]!) {
    createSchedule(doctorId: $doctorId, days: $days)
  }
`;
export const useCreateSchedule = () => {
  const [createSchedule, { loading, error }] = useMutation(CREATE_SCHEDULE);

  return { createSchedule, loading, error };
};
