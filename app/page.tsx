'use client'
import Image from 'next/image'
import { pic1, pic2 } from '@/asset/image';
import { Button } from '@/components/ui/button';
import JobListCard from '@/components/JobListCard';
import { useRouter } from 'next/navigation';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Roboto } from 'next/font/google'
const roboto = Roboto({
  subsets: ['latin'],
  weight: '100'
})
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({
  style   : 'italic',
  subsets: ['latin'],
  weight: '200'
})
import { Lato } from 'next/font/google'
const lato = Lato({
  subsets: ['latin'],
  weight: '300'
})
import { Poppins } from 'next/font/google'
const poppins = Poppins({
  subsets: ['latin'],
  weight: '600'
})
import { Raleway } from 'next/font/google';
const raleway = Raleway({
  subsets: ['latin'],
  weight: '500'
})
import { toast, useToast } from "@/components/ui/use-toast"
export default function Home() {
  const [jobs,setJobs] = useState([])
  const {data : session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState();
  const [count , setCount] = useState(0);

  useEffect(() => {
    const getProvidersData = async () => {
      const providersData : any= await getProviders();
      setProviders(providersData);
    }
    const getJobsCount = async () => {
      const res = await fetch('/api/noOfJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res);
      const data : any =  await res.json();
      console.log(data);
      setCount(data.count);
    }
    getJobsCount();
    getProvidersData();
  }, [])

  const onResume = async () => {
    router.push("/jobs/resume");
  }

  const onPostJob = async () => {
    if(!(session?.user)){
      if(!providers) return;
      
      Object.values(providers).map((provider : any)=>{
        signIn(provider.id)
      })
    }
    if(session?.user){
      const email = session?.user?.email;
      var user : any = await fetch('/api/getUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      })
      user = await user.json();
      if(user.candidateUserName == '')
      router.push("/jobPost");
      else
      toast({
        variant: "destructive",
        title: "Job Post",
        description: "You are not allowed to post job (must be an employeer)",
      })
    }
  }

  return (
    <main className=" py-[90px] ">
      
          <div className='flex items-center justify-center'>
          <div className='w-3/4 flex flex-col '>
            
            <div className='w-full  font-semibold flex justify-center from-neutral-500 text-white md:px-10'>
            <p className={"text-4xl sm:text-6xl sm:p-32 text-center mt-2 font-serif text-green-500 text-opacity-100  "} style={
              // raleway.style
              // roboto.style
              // montserrat.style
              // lato.style
              poppins.style
              }  >Make your Dream Job Come True</p>
            </div>
          <div className='flex w-full justify-center md:justify-evenly md:px-10 my-10 items-center gap-10'>
            <div className='flex flex-col gap-2'>
              <p className="text-lg sm:text-2xl text-center text-slate-800 pb-1 ">
                {count}+ Jobs Listed
              </p>
              <p className='text-2xl sm:text-4xl font-semibold text-center text-slate-600'>
                Find your Dream Job
              </p>
              <p className='text-xs sm:text-xl font-semibold text-center text-slate-400  pb-1'>
                Search, Find and Apply for Jobs directly on website
              </p>
              <div className='w-full flex justify-center'>
                <Button className='text-white bg-green-500 hover:bg-green-600 w-[200px] sm:w-[300px]' onClick={onResume}>
                  Search
                </Button>
              </div>
            </div>
            <Image src={pic1} alt="jobImage1" className='rounded-lg  hidden lg:block' width={300} height={200} />
          </div>
          <div className='flex w-full justify-center md:justify-evenly md:px-10 my-10 items-center gap-10'>
            <Image src={pic2} alt="jobImage1" className='rounded-lg  hidden lg:block' width={500} height={400} />
            <div className='flex flex-col gap-2'>
              <p className='text-2xl sm:text-4xl font-semibold text-center text-slate-600'>
                Post Job
              </p>
              <div className='w-full flex justify-center'>
                <Button className='text-white bg-green-500 hover:bg-green-600 w-[200px] sm:w-[300px]' onClick={onPostJob}>
                    Post
                </Button>
              </div>
            </div>
          </div>
          <div className={ " w-full"} >
            <JobListCard jobs={jobs} setJobs={setJobs} page="home" role="" />
          </div>
          </div>
          </div>
    </main>
  )
}
