import { getSpecialties } from '@/modules/doctor/presentation/actions/get-specialties';
import SearchDoctorInput from './components/search-doctor-input';

const Page = async () => {
  const specialties = await getSpecialties();
  return (
    <div className="grid grid-cols-1 w-full">
      <div className="flex px-5 py-7 w-full">
        <SearchDoctorInput specialties={specialties} />
      </div>
      <div></div>
    </div>
  );
};

export default Page;
