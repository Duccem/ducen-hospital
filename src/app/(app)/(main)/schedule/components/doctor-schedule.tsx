'use client';

import { Check, ChevronDown, Clock } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/libs/shadcn-ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/libs/shadcn-ui/components/command';
import { Label } from '@/libs/shadcn-ui/components/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/libs/shadcn-ui/components/popover';
import { Switch } from '@/libs/shadcn-ui/components/switch';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { useCreateSchedule } from '@/modules/doctor/presentation/graphql/hooks/use-create-schedule';
import { toast } from 'sonner';

type DoctorScheduleProps = {
  doctorId: string;
};

export default function DoctorSchedule({ doctorId }: DoctorScheduleProps) {
  const { createSchedule } = useCreateSchedule();
  const [selectedHours, setSelectedHours] = React.useState<{ [key: string]: string[] }>({
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
    domingo: [],
  });

  const [enabledDays, setEnabledDays] = React.useState<{ [key: string]: boolean }>({
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false,
  });

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return { label: `${hour}:00`, value: `${hour}:00` };
  });

  const handleHourAdd = (day: string, hour: string) => {
    if (selectedHours[day].includes(hour)) {
      handleHourRemove(day, hour);
      return;
    }
    setSelectedHours((prev) => ({
      ...prev,
      [day]: [...prev[day], hour].sort(),
    }));
  };

  const handleHourRemove = (day: string, hour: string) => {
    setSelectedHours((prev) => ({
      ...prev,
      [day]: prev[day].filter((h) => h !== hour),
    }));
  };

  const toggleDay = (day: string) => {
    setEnabledDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
    if (enabledDays[day]) {
      setSelectedHours((prev) => ({
        ...prev,
        [day]: [],
      }));
    }
  };

  const save = async () => {
    try {
      await createSchedule({
        variables: {
          doctorId: doctorId,
          days: Object.entries(selectedHours).map(([day, hours]) => ({
            day,
            hours: hours.map((hour) => ({ hour })),
          })),
        },
      });
    } catch (error) {
      toast.error('Error al guardar el horario');
    }
  };

  return (
    <div className="flex flex-col gap-5 flex-1 px-10">
      {Object.entries(enabledDays).map(([day, enabled]) => (
        <div key={day} className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex justify-between items-center w-1/5">
              <Label htmlFor={day} className="text-sm capitalize ">
                {day}
              </Label>
              <Switch className="" id={day} checked={enabled} onCheckedChange={() => toggleDay(day)} />
            </div>

            {enabled ? (
              <div className="">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" size="sm" className="h-10 border   rounded-none">
                      Agrega horas a tu dia
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search hour..." />
                      <CommandList>
                        <CommandEmpty>No hour found.</CommandEmpty>
                        <CommandGroup>
                          {hours.map((hour) => (
                            <CommandItem key={hour.value} onSelect={() => handleHourAdd(day, hour.value)}>
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  selectedHours[day].includes(hour.value) ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              {hour.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">No trabajas ese dia</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedHours[day].map((hour) => (
              <Button
                key={hour}
                variant="outline"
                size="sm"
                onClick={() => handleHourRemove(day, hour)}
                className="gap-2 rounded-none"
              >
                <Clock className="h-4 w-4" />
                {hour}
              </Button>
            ))}
          </div>
        </div>
      ))}
      <Button className="mt-4 w-full" onClick={save}>
        Save Schedule
      </Button>
    </div>
  );
}