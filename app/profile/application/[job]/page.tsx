import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen py-[70px]'>
      <div className='flex justify-center items-center m-5'>
            <h1 className='text-4xl font-semibold text-slate-800'>
                Web Developer on Lavender Company LTD
            </h1>
        </div>
        <div className='w-full flex justify-center items-center'>
          <div className=' w-3/4 flex flex-col'>
            <div className='bg-blue-100 p-2 rounded-t-lg  flex justify-between'>
              <p className='text-xl font-semibold text-slate-600' >Application</p>
              <p className='text-md font-normal text-slate-400'>Applied 5 days ago</p>
            </div>
            <div className='w-full border rounded-b-lg p-2'>
              <h2 className='font-semibold text-slate-500' >Cover letter</h2>
              <div className='flex flex-col justify-between gap-10 my-4'>
                <div>
                  <h3>Why should you be hired for this role?</h3>
                  <p className='text-slate-500'>I am an enthusiastic learner, and web developer with good knowledge of javascript, and also I am looking for new opportunities to enhance my skills also get exposure to the industry. skills I have is problem-solving, web development, react development (Nextjs)</p>
                </div>
                <div>
                  <h3>Availability?</h3>
                  <p className='text-slate-500'>Yes, I am available to join immediately.</p>
                </div>
                <div>
                  <h3>Custom Resume</h3>
                  <div className='text-slate-500 bg-slate-200 w-[100px] text-center px-2 py-1 rounded-sm'>Download</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default page
