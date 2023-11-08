'use client'
import { logo } from '@/asset/image'
import JobListCard from '@/components/JobListCard'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const page = () => {
  const router = useRouter()
  const onEdit = () => {
    router.push('/profile/editProfile');
  }
  const [ role , setRole] = useState(null);
  const { data: session } = useSession();
  const [ image , setImage] = useState(session?.user?.image || logo);

  useEffect(()=>{
    if(!session?.user){
      router.push('/');
    }
    const fun = async () => {
      const res = await fetch("/api/getUser/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data && data.type) {
        console.log(data.type);
        setRole(data.type);
        setImage(data.image);
      }
    };
    fun();
  },[session])
  return (
    <div className={'min-h-screen py-[90px] flex '+inter.className}>
      <div className='w-full flex flex-col justify-between items-center gap-10'>
        <div className='  rounded-md  flex flex-col justify-start items-center mx-10'>
          <div className='flex justify-center items-center m-5'>
              <h1 className='text-4xl font-semibold text-slate-800'>
                My Profile
              </h1>
          </div>
          <div className='flex flex-col sm:flex-row justify-center items-center gap-7 p-6 rounded-lg'>
            
            <Image alt="profile" src={image} width={150} height={150} className='rounded-full'/>
            <div className='h-full flex flex-col gap-3 sm:justify-evenly items-center '>
              <p className='font-medium'> {session?.user?.name }</p>
              <p className='font-normal text-slate-500'>Software Developer</p>
              <button type='button' className='bg-blue-300 px-2 py-1 rounded-lg text-white' onClick={onEdit}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        {role && <div className='w-3/4'>
          <JobListCard page='profile' role={role}/>
        </div>}
      </div>
    </div>
  )
}

export default page
