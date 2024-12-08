import FilterList from '@/libs/ducen-ui/components/filter-list';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { formatDateRange } from 'little-date';

type Props = {
  filters: { [key: string]: string | number | boolean | string[] | number[] | null };
  loading: boolean;
  onRemove: (key: any) => void;
  specialties?: { id: string; name: string }[];
  types?: { id: string; name: string; color: string }[];
  states: string[];
};

const stateLabel: Record<string, string> = {
  SCHEDULED: 'Agendada',
  RESCHEDULED: 'Reagendada',
  CONFIRMED: 'Confirmada',
  LATE: 'Tarde',
  CANCELLED: 'Cancelada',
  WAITING_DOCTOR: 'Esperando al doctor',
  WAITING_PATIENT: 'Esperando al paciente',
  STARTED: 'Iniciada',
  MISSED: 'Perdida',
  FINISHED: 'Finalizada',
};

const AppointmentSearchFilters = ({ filters, loading, onRemove, specialties, states, types }: Props) => {
  const renderFilter = ({ key, value }: { key: string; value: any }) => {
    switch (key) {
      case 'start': {
        if (key === 'start' && value && filters.end) {
          return formatDateRange(new Date(value), new Date(filters.end as string), {
            includeTime: false,
          });
        }

        return key === 'start' && value && format(new Date(value), 'MMM d, yyyy');
      }
      case 'specialties': {
        return value.map((slug: string) => specialties?.find((category) => category.name === slug)?.name).join(', ');
      }
      case 'date': {
        return formatInTimeZone(value, 'America/Caracas', 'MMM d, yyyy');
      }

      case 'states': {
        return value
          .map((slug: string) => {
            const label = states?.find((state) => state === slug);
            return stateLabel[label!];
          })
          .join(', ');
      }

      case 'types': {
        return value
          .map((slug: string) => {
            return types?.find((state) => state.name === slug)?.name;
          })
          .join(', ');
      }

      default:
        return null;
    }
  };

  return <FilterList filters={filters} loading={loading} onRemove={onRemove} renderFilter={renderFilter} />;
};

export default AppointmentSearchFilters;
