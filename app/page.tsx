'use client'
import Image from 'next/image'
import { jobImage1, jobImage2 } from '@/asset/image';
import { Button } from '@/components/ui/button';
import SearchJob from '@/components/SearchJob';
import JobListCard from '@/components/JobListCard';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  const onResume = () => {
    
  }
  const onPostJob = () => {
    router.push("/jobPost");
  }
  const searchBar = false;
  return (
    <main className=" py-[70px] ">
      {
        searchBar ?
        <></> :(
          <div className='flex flex-col '>
            <div className='w-full  font-semibold flex justify-center from-neutral-500 text-white md:px-10'>
            <p className="text-6xl text-center mt-2 font-serif text-green-500 text-opacity-50 font-bold bg-clip-text">Make your Dream Job Come True</p>
            </div>
          <div className='flex w-full justify-center md:justify-evenly md:px-10 my-10 items-center gap-10'>
            <div className='flex flex-col gap-2'>
              <p className="text-2xl text-center text-slate-800 pb-1 ">
                5463+ Jobs Listed
              </p>
              <p className='text-4xl font-semibold text-center text-slate-600'>
                Find your Dream Job
              </p>
              <p className='text-xl font-semibold text-center text-slate-400  pb-1'>
                Search, Find and Apply for Jobs directly on website
              </p>
              <div className='w-full flex justify-center'>
                <Button className='text-white bg-green-500 hover:bg-green-600 w-[300px]' onClick={onResume}>
                  Upload Your Resume
                </Button>
              </div>
            </div>
            <Image src={jobImage1} alt="jobImage1" className='rounded-lg  hidden lg:block' width={400} height={300} />
          </div>
          <div className='flex w-full justify-center md:justify-evenly md:px-10 my-10 items-center gap-10'>
            <Image src={jobImage2} alt="jobImage1" className='rounded-lg  hidden lg:block' width={400} height={300} />
            <div className='flex flex-col gap-2'>
              <p className='text-4xl font-semibold text-center text-slate-600'>
                Post Job
              </p>
              <div className='w-full flex justify-center'>
                <Button className='text-white bg-green-500 hover:bg-green-600 w-[300px]' onClick={onPostJob}>
                    Post
                </Button>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col items-center gap-2  md:flex-row md:px-20 my-10'>
            <SearchJob />
          </div>
          <div className='w-full'>
            <JobListCard applied='no' />
          </div>
          </div>
        )
      }
    </main>
  )
}
