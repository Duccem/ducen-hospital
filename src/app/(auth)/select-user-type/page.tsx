'use client';
import { Button } from '@/libs/shadcn-ui/button';
import { updateRole } from '@/modules/user/presentation/actions/updateUserRole';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import doctorImage from '../../../../public/images/nutritionist.png';
import patientImage from '../../../../public/images/ophthalmology.png';

const SelectUserTypePage = () => {
  const [userType, setUserType] = useState('PATIENT');
  const { user } = useUser();
  const router = useRouter();
  const onContinue = async () => {
    try {
      const res = await updateRole(userType);
      if (res.error) {
        console.log(res.error);
        return;
      }
      await user?.reload();
      router.push('/');
    } catch (error) {
      
    }
  }
  return (
    <div className="h-full w-full flex flex-col justify-center items-center box-border p-3 mb-3">
      <div className="w-3/4 mb-8">
        <p className="text-xl font-bold text-center">
          Are you a doctor or a patient?
        </p>
      </div>
      <div className="w-3/4 flex flex-col gap-3 justify-center items-center sm:flex-row sm:mb-16">
        <div
          className={`flex justify-center items-center flex-col h-[300px] w-1/2 p-4 border-2 border-primary rounded-lg gap-3 cursor-pointer transition-all ease-in-out ${
            userType === 'DOCTOR' ? 'bg-primary' : ''
          }`}
          onClick={() => setUserType('DOCTOR')}
        >
          <img src={doctorImage.src} className="h-14" alt="" />
          <p className="text-lg font-bold">Doctor</p>
          <p className="text-center">
            Professional health personnel, determined to improve and save lives
          </p>
        </div>
        <div
          className={`flex justify-center items-center flex-col h-[300px] w-1/2 p-4 border-2 border-primary rounded-lg gap-3 cursor-pointer transition-all ease-in-out delay-75 ${
            userType === 'PATIENT' ? 'bg-primary' : ''
          }`}
          onClick={() => setUserType('PATIENT')}
        >
          <img src={patientImage.src} className="h-14" alt="" />
          <p className="text-lg font-bold">Patient</p>
          <p className="text-center">
            I need help to improve my health
          </p>
        </div>
      </div>
      <Button className='w-3/4' onClick={onContinue}>
        Continue as {userType === 'DOCTOR' ? 'Doctor' : 'Patient'}
      </Button>
    </div>
  );
};

export default SelectUserTypePage;