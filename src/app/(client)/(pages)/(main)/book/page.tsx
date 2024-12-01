import { getSpecialties } from '@/modules/doctor/presentation/actions/get-specialties';
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs/server';
import { Suspense } from 'react';
import DoctorSkeleton from './components/doctor-list-loading';
import DoctorListWrapper from './components/doctor-list-wrapper';
import SearchDoctorInput from './components/search-doctor-input';

const searchParamsCache = createSearchParamsCache({
  q: parseAsString,
  specialties: parseAsArrayOf(parseAsString),
  availability: parseAsString,
  minRate: parseAsInteger,
  experience: parseAsInteger,
});

const Page = async ({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) => {
  const {
    q,
    experience,
    availability,
    minRate,
    specialties: selectedSpecialties,
  } = searchParamsCache.parse(searchParams);
  const filter = {
    experience,
    availability,
    minRate,
    specialties: selectedSpecialties,
  };
  const specialties = await getSpecialties();
  const loadingKey = JSON.stringify({
    query: q,
    filter,
  });
  return (
    <div className="grid grid-cols-1 w-full">
      <div className="flex px-5 py-7 w-full">
        <SearchDoctorInput specialties={specialties} />
      </div>
      <Suspense fallback={<DoctorSkeleton />} key={loadingKey}>
        <DoctorListWrapper
          filters={{
            q: q || undefined,
            specialties: selectedSpecialties || undefined,
            availability: availability || undefined,
            minRate: minRate || undefined,
            experience: experience || undefined,
          }}
        />
      </Suspense>
    </div>
  );
};

export default Page;