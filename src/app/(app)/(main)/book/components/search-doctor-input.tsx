'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/libs/shadcn-ui/components/dropdown-menu';
import { Input } from '@/libs/shadcn-ui/components/input';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { Briefcase, CalendarDays, ListFilter, Search, Star, Stethoscope } from 'lucide-react';
import { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import SelectSpecialty from './filter-specialty-select';

import { Calendar } from '@/libs/shadcn-ui/components/calendar';
import { formatISO } from 'date-fns';
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import ExperienceRange from './filter-experience-range';
import RateRange from './filter-rate-range';
import FilterList from './search-doctor-filters';
const defaultSearch = {
  q: null,
  specialties: null,
  availability: null,
  minRate: null,
  experience: null,
};

type Props = {
  specialties: any[];
};

const SearchDoctorInput = ({ specialties }: Props) => {
  const [prompt, setPrompt] = useState('');
  const [filters, setFilters] = useQueryStates(
    {
      q: parseAsString,
      specialties: parseAsArrayOf(parseAsString),
      availability: parseAsString,
      minRate: parseAsInteger,
      experience: parseAsInteger,
    },
    {
      shallow: false,
    }
  );
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setPrompt(value);
    } else {
      setPrompt('');
      setFilters(defaultSearch);
    }
  };

  useHotkeys(
    'esc',
    () => {
      setPrompt('');
      setFilters(defaultSearch);
      setIsOpen(false);
    },
    {
      enableOnFormTags: true,
    }
  );

  return (
    <DropdownMenu>
      <div className="flex  md:items-center w-full flex-col md:flex-row gap-2">
        <form
          action=""
          className="relative w-full lg:w-fit"
          onSubmit={(e) => {
            e.preventDefault();
            setFilters({ q: prompt });
          }}
        >
          <Search className="absolute pointer-events-none left-3 top-[11px] size-4" />
          <Input
            ref={inputRef}
            value={prompt}
            onChange={handleSearch}
            className="pl-9 w-full lg:w-[350px] pr-8 rounded-none h-9 focus-visible:outline-none focus-visible:ring-0"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            placeholder="Busca o filtra"
          />
          <DropdownMenuTrigger asChild>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              type="button"
              className={cn(
                'absolute z-10 right-3 top-[10px] opacity-50 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-0',
                isOpen && 'opacity-100'
              )}
            >
              <ListFilter className="size-4" />
            </button>
          </DropdownMenuTrigger>
        </form>
        <FilterList filters={filters} onRemove={setFilters} loading={false} specialties={specialties} />
      </div>
      <DropdownMenuContent
        className="rounded-none w-[350px]"
        align="end"
        sideOffset={19}
        alignOffset={-11}
        side="bottom"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-none">
            <Stethoscope className="size-4 mr-2" />
            <span>Especialidad</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 w-[250px] h-[270px] rounded-none">
              <SelectSpecialty
                headless
                specialties={specialties}
                onChange={(selected) => {
                  setFilters({
                    specialties: filters?.specialties?.includes(selected.name)
                      ? filters.specialties.filter((s) => s !== selected.name).length > 0
                        ? filters.specialties.filter((s) => s !== selected.name)
                        : null
                      : [...(filters.specialties ?? []), selected.name],
                  });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-none">
            <CalendarDays className="size-4 mr-2" />
            <span>Disponibilidad en</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 rounded-none">
              <Calendar
                mode="single"
                initialFocus
                fromDate={new Date()}
                selected={filters.availability ? new Date(filters.availability) : new Date()}
                onSelect={(date) => {
                  setFilters({ availability: formatISO(date!, { representation: 'date' }) });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-none">
            <Star className="size-4 mr-2" />
            <span>Calificación minima</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent
              sideOffset={14}
              alignOffset={-4}
              className="p-0 rounded-none w-[250px] min-h-[150px]"
            >
              <RateRange
                onSelect={(min) => {
                  setFilters({ minRate: min });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-none">
            <Briefcase className="size-4 mr-2" />
            <span>Experiencia minima</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent
              sideOffset={14}
              alignOffset={-4}
              className="p-0 rounded-none w-[250px] min-h-[150px]"
            >
              <ExperienceRange
                onSelect={(min) => {
                  setFilters({ experience: min });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchDoctorInput;
