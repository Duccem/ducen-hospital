import { DomainEvent } from '@/modules/shared/domain/core/domain-event';
import { tasks } from '@trigger.dev/sdk/v3';
import { eventsConfig } from './events.config';

export class TriggerEventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    const jobs = events.map((event) => this.trigger(event));
    const allJobs = jobs.flat();
    await Promise.all(allJobs);
  }

  private trigger(event: DomainEvent) {
    const [aggregate, eventType] = event.name.split('.');
    if (!eventType) {
      return [];
    }
    const configs = eventsConfig.find((config) => config.aggregate === aggregate);
    if (!configs) {
      return [];
    }
    const taskKeys = [...configs.globalTasks, ...(configs.events[eventType]?.tasks ?? [])];
    const jobs = taskKeys.map((key) => tasks.trigger(key, event.data));
    return jobs;
  }
}
