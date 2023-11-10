import React, { useEffect } from 'react'
import JobCard from './JobCard'
import { useSession } from 'next-auth/react';

const JobListCard = ({page , role , jobs , setJobs}:any) => {
  const {data : session} = useSession();
  const [type,setType] = React.useState('' as any);
  const [pageNo , setPageNO] = React.useState(1);
  const [next , setNext] = React.useState(true);


  useEffect(()=>{
    const fun1 = async () => {
        setType('home')
        const res = await fetch('/api/getJob',
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body : JSON.stringify({pageNo:pageNo})
            }
        )
        const data :any = await res.json();
        console.log(data.next)
        setNext(data.next);
        setJobs(data.data);
    }

    const fun2 = async () => {
        
        const userDetail = await fetch('/api/getUser',
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({email : session?.user?.email})
            }
        )
        const user = await userDetail.json();
        console.log(user)
        var data = [];
        var type = "";
        if(user && user.candidateUserName === ""){
            data = user.posted;
            type = 'posted'
        }else if(user){
            data = user.applied;
            type = 'applied'
        }else{
            return;
        }
        setType(type)
        console.log(data)
        const res = await fetch('/api/getJobByIds',
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({list : data , type : type})
            } 
        )
        const response :any = await res.json();
        console.log(response)
        setJobs(response);
    }
    if(page === 'home'){
        fun1()
    }else if(page === 'profile'){
        fun2()
    }else{
    }
  },[session,pageNo])
  console.log(jobs)
  return (
    <>
        {jobs && jobs.length > 0 &&
            <>
                { role !== "" && 
                    <div className='flex justify-center items-center m-5'>
                    <h1 className='text-4xl font-semibold text-slate-800'>
                        {role=='candidate' ? 'Applied Jobs' :'Posted Jobs'}
                    </h1>
                </div>
                }
                <div className=" grid grid-cols-2 gap-5 pt-10">
                    {
                        jobs.map((job:any) => {
                            return(
                                <div className=' col-span-2  lg:col-span-1  rounded-lg flex justify-center'>
                                    <JobCard data={job} type={type} />
                                </div>
                            )
                        })
                    }
                </div>
                {role === "" && <div className='w-full pt-20 flex flex-row justify-center items-center'>
                    <div className='flex flex-row gap-5'>
                        <button type='button' onClick={()=>setPageNO(prev=>prev-1)} className={pageNo==1 ? "opacity-20" : ""} disabled={pageNo==1}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                            {pageNo}
                        <button type='button' className={!next ? "opacity-20" : ""} onClick={()=>{
                            setPageNO(prev=>prev+1)
                            console.log('hai');
                            }} disabled={!next}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>}
            </>
        }
    </>
  )
}

export default JobListCard
