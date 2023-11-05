import React from 'react'
import EditProfile from '@/components/EditProfile'
const page = () => {
  return (
    <div className='py-[70px] min-h-screen flex flex-col justify-center items-center'>
          <div className='w-1/2 lg:w-full'>
          <EditProfile />
          </div>
    </div>
  )
}

export default page
