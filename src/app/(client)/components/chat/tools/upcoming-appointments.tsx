import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/libs/shadcn-ui/components/table';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { Appointment } from '@/modules/appointment/domain/appointment';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { format } from 'date-fns';
import { BotCard } from '../messages';

type Props = {
  data: Primitives<Appointment>[];
};

const UpcomingAppointments = ({ data }: Props) => {
  return (
    <BotCard className="space-y-4">
      {data.length > 0 && <p>Encontré {data.length} próximas citas medicas agendadas </p>}
      {data.length > 0 && (
        <Table className="text-xs font-sans">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[45%] h-10">Tipo de consulta</TableHead>
              <TableHead className="h-10 min-w-[80px]">Doctor</TableHead>
              <TableHead className="h-10">Fecha</TableHead>
              <TableHead className="h-10 text-right w-[50px]">Motivo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((appointment: Primitives<Appointment>) => {
              return (
                <TableRow key={appointment.id} className="h-[34px]">
                  <TableCell className="flex justify-start items-center gap-3">
                    <div className="size-3" style={{ backgroundColor: appointment.type?.color }}></div>
                    <span className="line-clamp-1">{appointment.type?.name}</span>
                  </TableCell>
                  <TableCell className={cn('font-normal')}>
                    <span className="line-clamp-1">{appointment.doctor?.user?.name}</span>
                  </TableCell>
                  <TableCell className="font-normal">{format(appointment.date, 'PPp')}</TableCell>
                  <TableCell className="font-normal">{appointment.motive}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </BotCard>
  );
};

export default UpcomingAppointments;
