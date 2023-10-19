import React from 'react'
import JobCard from './JobCard'

const JobListCard = ({applied}:{applied:string}) => {
  return (
    
    <div className="  mx-10 grid grid-cols-2 gap-1 border rounded-lg py-10">
        <div className=' col-span-2  lg:col-span-1  rounded-lg flex justify-center'>
            <JobCard applied={applied} />
        </div>
        <div className=' col-span-2  lg:col-span-1  rounded-lg flex justify-center'>
            <JobCard  applied={applied} />
        </div>
        <div className=' col-span-2  lg:col-span-1  rounded-lg flex justify-center'>
            <JobCard applied={applied} />
        </div>
        <div className=' col-span-2  lg:col-span-1  rounded-lg flex justify-center'>
            <JobCard applied={applied} />
        </div>
        <div className=' col-span-2  lg:col-span-1  rounded-lg flex justify-center'>
            <JobCard applied={applied} />
        </div>
    </div>
    
  )
}

export default JobListCard
