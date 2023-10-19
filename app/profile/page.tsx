'use client'
import { logo } from '@/asset/image'
import JobListCard from '@/components/JobListCard'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
const page = () => {
  const { data : session } = useSession();
  const router = useRouter()
  const onEdit = () => {
    router.push('/profile/editProfile');
  }
  console.log(session?.user)
  return (
    <div className='min-h-screen py-[70px]'>
      <div className='w-full flex flex-col 2xl:flex-row justify-between max-2xl:items-center'>
              
        <div className=' w-[400px] flex-grow rounded-md  flex flex-col justify-between items-center'>
          <div className='flex flex-col justify-center items-center m-5 gap-10'>
                <h1 className='text-4xl font-semibold text-slate-800'>
                    My Profile
                </h1>
                <div className='flex flex-col justify-center items-center gap-7'>
                  
                  <Image alt="profile" src={session?.user?.image || logo} width={150} height={150} className='rounded-full'/>
                  <p className='font-medium'> {session?.user?.name }</p>
                  <p className='font-normal text-slate-500'>Software Developer</p>
                  <button type='button' className='bg-blue-300 px-2 py-1 rounded-lg text-white' onClick={onEdit}>
                    Edit Profile
                  </button>
                </div>
          </div>
        </div>
        <div>
          <div className='flex justify-center items-center m-5'>
              <h1 className='text-4xl font-semibold text-slate-800'>
                  My Applications
              </h1>
          </div>
          <JobListCard applied='yes'/>
        </div>
      </div>
    </div>
  )
}

export default page
