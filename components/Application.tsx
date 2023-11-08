import { useSession } from 'next-auth/react';
import React from 'react'

const Application = ({data , type}:{data:any , type : string}) => {

    return (
        <div className={`w-full  py-[70px] ${type === 'apply' && "min-h-screen"} `}>
          { type==='apply' && <div className='flex justify-center items-center my-10'>
                <h1 className='text-xl lg:text-4xl font-semibold text-slate-800'>
                    Web Developer on Lavender Company LTD
                </h1>
            </div>}
            <div className='w-full flex justify-center items-center'>
              <div className='w-full lg:w-3/4 flex flex-col'>
                <div className='bg-blue-100 p-2 rounded-t-lg  flex justify-between'>
                  <p className='text-xl font-semibold text-slate-600 max-sm:text-sm ' >Application</p>
                  {
                      data.status === "hired" ? <div className="max-sm:text-xs   flex  items-center  text-sm rounded-lg text-green-500">
                          {data.status}
                      </div> : data.status === "rejected" ? <div className="max-sm:text-xs   flex  items-center  text-sm rounded-lg text-red-500">
                          {data.status}
                      </div> : <div className="max-sm:text-xs flex  items-center  text-sm rounded-lg text-yellow-500"> Processing </div>
                  }
                </div>
                <div className='w-full border rounded-b-lg p-2'>
                  <h2 className='font-semibold text-slate-500' >Cover letter</h2>
                  <div className='flex flex-col justify-between gap-10 my-4'>
                    <div>
                      <h3>Why should you be hired for this role?</h3>
                      <p className='text-slate-500'>{data.why}</p>
                    </div>
                    <div>
                      <h3>Join Immediately?</h3>
                      {data.join && ( data.join=="Yes" ? <p className='text-slate-500'>Yes, I am available to join immediately.</p> : (
                        <>
                          <p className='text-slate-500'>No (Plese specify your availability)</p>
                          {data.whyjoin &&<p className='text-slate-400'> {data.whyjoin}</p>}
                        </>
                      ))}
                    </div>
                    <div>
                      <h3>Availability?</h3>
                      { 
                         data.availability && (data.availability ? <p className='text-slate-500'>Yes</p> : <p className='text-slate-500'>No</p> )
                      }
                    </div>
                    <div>
                      <h3>Custom Resume</h3>
                      <a href={data.resume} className='text-slate-500 bg-slate-200 text-center px-2 py-1 rounded-sm'>Resume</a>
                    </div>
                    <div>
                      { (type === 'apply' && data.status === "hired" ) && <div className='text-blue-500'>
                          You will be notified by the company soon. (By Email)
                        </div>
                        }
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
}

export default Application
