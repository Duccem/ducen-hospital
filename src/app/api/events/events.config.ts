import { helloWorldTask } from '@/app/tasks/example';
import { UpdateDoctorVectorTask } from '@/app/tasks/update-doctor-vector';
export const eventsConfig: EventConfig[] = [
  {
    aggregate: 'doctor',
    globalTasks: [helloWorldTask.id],
    events: {
      created: {
        tasks: [UpdateDoctorVectorTask.id],
      },
    },
  },
];

type EventConfig = {
  aggregate: string;
  globalTasks: string[];
  events: {
    [key: string]: {
      tasks: string[];
    };
  };
};