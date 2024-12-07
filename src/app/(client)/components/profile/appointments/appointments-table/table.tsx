'use client';

import { removeAppointmentType } from '@/app/(server)/actions/doctor/remove-appointment-type';
import { Dialog } from '@/libs/shadcn-ui/components/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/libs/shadcn-ui/components/table';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import CreateTypeModal from '../forms/create-type-modal';
import { type AppointmentType, columns } from './columns';
import { Header } from './header';

type Props = {
  data: AppointmentType[];
};

export function DataTable({ data }: Props) {
  const [isOpen, onOpenChange] = React.useState(false);
  const router = useRouter();

  const remove = async (id: string) => {
    await removeAppointmentType({ id });
    toast.success('Appointment type removed');
    router.refresh();
  };

  const table = useReactTable({
    data,
    getRowId: ({ id }) => id,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      remove,
    },
  });

  return (
    <div className="w-full">
      <Header table={table} onOpenChange={onOpenChange} />

      <Table className="border">
        <TableHeader className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow className="hover:bg-transparent" key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell, index) => (
                <TableCell key={cell.id} className={cn(index === 2 && 'w-[50px]')}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <CreateTypeModal onOpenChange={onOpenChange} isOpen={isOpen} />
      </Dialog>
    </div>
  );
}
