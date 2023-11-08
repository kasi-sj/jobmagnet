import React, { useEffect } from 'react'
import JobCard from './JobCard'
import { useSession } from 'next-auth/react';

const JobListCard = ({page , role}:{page:string , role : string}) => {
  const [jobs,setJobs] = React.useState([])
  const {data : session} = useSession();
  const [type,setType] = React.useState('' as any);
  useEffect(()=>{
    const fun1 = async () => {
        setType('home')
        const res = await fetch('/api/getJob',
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                },
            }
        )
        const data :any = await res.json();
        console.log(data)
        setJobs(data);
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
    }
  },[session])
  return (
    <>
        {jobs.length > 0 &&
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
            </>
        }
    </>
  )
}

export default JobListCard
