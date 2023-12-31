'use client'
import  Candidates  from '@/components/Candidates'
import React, { useEffect, useState } from 'react'
const page = (route:any) => {
  const [data, setData] : [data : any , setdata : any] = useState([]);
  const [job , setJob] : [job : any , setJob : any] = useState({});
  const id = decodeURIComponent(route.params.posted);
  useEffect(()=>{
    const obj = {
      id:id
    }
    const fun = async () => {
      const res = await fetch("/api/getJobById",{
        method : 'POST',
        body : JSON.stringify(obj)
    });
      const finaldata = await res.json()
      setJob(finaldata);
      if(finaldata){
        const candidates = finaldata._doc.candidates;
        const res = await fetch(
          '/api/getCandidatesByIds',
          {
            method: 'POST',
            body: JSON.stringify({ list:candidates }),
          }
        )
        setData((await res.json()));
      }
    }
    fun();
  },[])
  return (
    <div className={'min-h-screen py-[90px] '}>
      <Candidates data={data} job={job} />
    </div>
  )
}

export default page
