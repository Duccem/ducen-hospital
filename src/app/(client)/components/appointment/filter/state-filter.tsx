'use client';

import { ComboboxDropdown } from '@/libs/shadcn-ui/components/combobox-dropdown';
type Props = {
  selected?: string;
  onChange: (selected: string) => void;
  headless?: boolean;
  states: any[];
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

function transformState(state: string) {
  return {
    id: state,
    label: stateLabel[state],
  };
}

const SelectState = ({ selected, onChange, headless, states }: Props) => {
  const selectedValue = selected ? transformState(selected) : undefined;
  return (
    <ComboboxDropdown
      headless={headless}
      placeholder="Selecciona una estado"
      searchPlaceholder="Busca una estado"
      items={states.map(transformState)}
      selectedItem={selectedValue}
      onSelect={(item) => {
        onChange(item.id);
      }}
      renderSelectedItem={(selectedItem) => (
        <div className="flex items-center space-x-2">
          <span className="text-left truncate max-w-[90%]">{selectedItem.label}</span>
        </div>
      )}
      renderOnCreate={(value) => {
        if (!headless) {
          return (
            <div className="flex items-center space-x-2">
              <span>{`Create "${value}"`}</span>
            </div>
          );
        }
      }}
      renderListItem={({ item }) => {
        return (
          <div className="flex items-center space-x-2">
            <span className="line-clamp-1">{item.label}</span>
          </div>
        );
      }}
    />
  );
};

export default SelectState;
