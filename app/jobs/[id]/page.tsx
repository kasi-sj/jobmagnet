'use client'
import { logo } from '@/asset/image'
import { Money, Place } from '@/components/SmallComponents'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React, { useEffect } from 'react'
import {Separator} from '@/components/ui/separator'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'


const page = (route:any) => {
  const router = useRouter();
  const {data : session} = useSession();
  const [title , setTitle] = useState("");
  const [location , setLocation] = useState("");
  const [locationDiscription , setLocationDiscription] = useState(""); 
  const [stipent , setStipent] = useState("");    
  const [companyName , setCompanyName] = useState("");
  const [companyLogo , setCompanyLogo] = useState("");
  const [companyWebsite , setCompanyWebsite] = useState("");
  const [duration , setDuration] = useState("");
  const [startDate , setStartDate] = useState();
  const [description , setDescription] = useState("");
  const id = decodeURIComponent(route.params.id);
  const [skills , setSkills] = useState([]);
  const [whoCanApply , setWhoCanApply] = useState([]);
  const [numberOfOpening , setNumberOfOpening] = useState("");
  const [about , setAbout] = useState("");
  const [opportunities , setOpportunities] = useState(0);
  const [providers, setProviders] = useState();
  const onApply = () => {
    ApplyJob();
  }
  const ApplyJob = async () => {
    console.log("aegsghdsfghdfh")
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
      if(user.candidateUserName != ''){
        const job = id;
        router.push(`/jobs/${job}/apply`)
      }
      else{
        if(user.companyUserName == ''){
            toast({
                variant: "destructive",
                title: "Job Post",
                description: "complete your profile first",
                })
        }else{
            toast({
                variant: "destructive",
                title: "Job Post",
                description: "You are not allowed to apply job (must be an candidate)",
                })
        }
      }
      
    }
  }
useEffect(() => {
    const getProvidersData = async () => {
        const providersData : any= await getProviders();
        setProviders(providersData);
    }
    const fun = async () => {
        if (id) {
            console.log(id);
            const res = await fetch("/api/getJobById",{
                method : 'POST',
                body : JSON.stringify({id: id})
            });
            const data = await res.json();

            setTitle(data._doc.title || '');
            setLocation(data._doc.location || '');
            setLocationDiscription(data._doc.locationDiscription || '');
            setStipent(data._doc.stipent || '');
            setCompanyName(data.companyDetails.companyName || '');
            setCompanyLogo(data.companyDetails.image || '');
            setCompanyWebsite(data.companyDetails.webSite || '');
            setDuration(data._doc.duration || '');
            setStartDate((data._doc.startDate && new Date(data._doc.startDate).toLocaleDateString()) || '');
            setDescription(data._doc.description || '');   
            setSkills(data._doc.skills || []);
            setWhoCanApply(data._doc.cans || []);
            setNumberOfOpening(data._doc.noOfOpening || '');
            setAbout(data.companyDetails.about || '');
            setOpportunities(data.companyDetails.posted.length || 0)
            console.log(about);
        }
    }
    getProvidersData();
    fun();
},[])
  return (
    <div className={'min-h-screen py-[90px] flex justify-center '}>
        <div className='w-3/4 max-lg:w-full m-2 '>
        <div className='flex justify-center items-center m-5'>
            <h1 className='text-4xl '>
                {title} at {companyName}
            </h1>
        </div>
        <div className='w-full flex items-center justify-center'>
            <div className='w-3/4 max-lg:w-full m-2 bg-gray-100 '>
                <div className="w-full  flex flex-col items-center justify-center">
                    <Card className='w-full'>
                        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-2 space-y-0 h-[225px] w-full">
                            <div className="space-y-1">
                                <div className="w-1/2 md:w-1/4  items-center mb-4">
                                    <div className="flex  items-center space-x-1  rounded-md bg-secondary mb-2 text-secondary-foreground">
                                        <Button variant="secondary" className="w-full px-3  shadow-none">
                                            Actively Hiring
                                        </Button>
                                    </div>
                                </div>
                                <CardTitle>
                                    <div className="flex gap-2 my-2 mb-4 max-sm:text-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                        </svg>
                                        {title}
                                    </div>
                                </CardTitle>
                                <CardDescription>
                                    <div className="flex flex-col gap-1 ">
                                        {companyName}
                                        <Place location={location||""}/>
                                        <p className='pl-8'>{locationDiscription}</p>
                                    </div>
                                </CardDescription>
                            </div>
                            
                            <div className="">
                                <Button variant="secondary" className="px-3 shadow-none">
                                    <Image alt="company name" src={companyLogo || logo} width={32} height={32} />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className='w-full flex flex-col gap-10'>
                            <div className="flex flex-row flex-wrap justify-center sm:flex-row gap-10  sm:justify-between  mx-2 w-full  text-sm text-muted-foreground mt-6 sm:gap-2">
                                
                                <div className='flex flex-col items-center justify-center gap-1'>
                                    <div className="flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                        </svg>
                                        Start Date
                                    </div>
                                    {startDate || new Date().toLocaleDateString()}
                                </div>
                                <div className='flex flex-col items-center justify-center gap-1'>
                                    <div className="flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>
                                        Duration
                                    </div>
                                    {duration}
                                </div>
                                <div className='flex flex-col items-center justify-center gap-1'>
                                    <div className="flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                        </svg>
                                        Stipent
                                    </div>
                                    {stipent}
                                </div>
                                <div className='flex flex-col items-center justify-center gap-1'>
                                    <div className="flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Apply At
                                    </div>
                                    {new Date().toLocaleDateString()}
                                </div>
                            </div>
                            <div className='flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="orange" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                                <p>
                                    Be an early applicant
                                </p>
                            </div>
                        </CardContent>
                        <div className='w-full p-4'>
                            <Separator/>
                        </div>
                        <CardContent className='w-full flex flex-col gap-10'>
                            <h2 className='font-semibold'>About {companyName} Company LTD</h2>
                            <Link href={companyWebsite||"/"} className='flex gap-2'>
                                <p className='text-blue-500'>
                                    {companyWebsite}
                                </p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="blue" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                            </Link>
                            <p>
                                {about}
                            </p>
                            <div className='m-2'>
                                <div className='rounded-lg border flex flex-col justify-between gap-2 p-2'>
                                    <h2 className='font-medium mb-5'>About {companyName} Company LTD</h2>
                                    <div className='flex  justify-evenly gap-6 flex-col md:flex-row'>
                                        <div className='flex gap-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                            </svg>
                                            Hiring since March 2021
                                        </div>
                                        <div className='flex gap-1' >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                        </svg>
                                            {opportunities} opportunities posted
                                        </div>
                                        <div className='flex gap-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                        </svg>
                                            69 candidates hired
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <div className='w-full p-4'>
                            <Separator/>
                        </div>
                        <CardContent className='w-full flex flex-col gap-10'>
                            <div>                                
                                <h2 className='font-semibold'>About The InternShip</h2>
                                <JobDescription desc={description||""} />
                            </div>
                            <div>
                                <h2 className='font-semibold'>Skills Required</h2>
                                <ol>
                                    {
                                        skills.map((skill:string) => {
                                            return (<li>{skill}</li>)
                                        })
                                    }
                                </ol>
                            </div>
                        </CardContent>
                        <CardContent className='w-full flex flex-col gap-10'>
                            <div>
                                <h2 className='font-semibold'>Who Can Apply</h2>
                                Only those candidates can apply who:
                                <ol>
                                    {
                                        whoCanApply.map((who:string) => {
                                            return (<li>{who}</li>)
                                        })
                                    }
                                </ol>
                            </div>
                        </CardContent>
                        <CardContent className='w-full flex flex-col gap-10'>
                            <div>
                                <h2 className='font-semibold'>Number of Opening</h2>
                                {numberOfOpening}
                            </div>
                        </CardContent>
                        <CardContent >
                            <div className='w-full flex justify-center items-center' >
                                <button type='button' onClick={onApply} className='bg-green-500 text-white px-4 py-2 rounded-lg'>
                                    Apply Now
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

const JobDescription = ({desc}:{desc:string}) => {
    return (<p>
        {desc}
    </p>)
}

export default page
