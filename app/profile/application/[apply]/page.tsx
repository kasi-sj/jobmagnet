'use client'
import Application from '@/components/Application';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = (route:any) => {
  const [data, setdate] : [data : any , setdata : any] = useState({});
  const id = decodeURIComponent(route.params.apply);
  const { data: session } = useSession();
  const router = useRouter()
  useEffect(()=>{
    const obj = {
      id:id
    }
    const fun = async () => {
      console.log(obj)
      const res = await fetch("/api/getApplyById",{
        method : 'POST',
        body : JSON.stringify(obj)
    });
      const finaldata = await res.json()
      if(finaldata){
        setdate(finaldata);
      }
    }
    fun()
  },[])
  return (
    <div className={'flex justify-center '}>
      <div className='w-3/4 lg:w-full'>
        <Application data={data} type={"apply"} />
      </div>
    </div>
  )
}

export default page
