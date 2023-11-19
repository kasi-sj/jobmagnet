'use client'
import { logo } from '@/asset/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { set } from 'mongoose'

const page = () => {
  const router = useRouter();
  const [submiting, setSubmiting] = useState(false);
  const { data : session } = useSession();
  const [ title , setTitle] = useState<string>("");
  const [ location , setLocation] = useState<string>("");
  const [locationDesc , setLocationDesc ] = useState<string>("");
  const [ startDate , setStartDate] = useState<string>("");
  const [ duration , setDuration] = useState<string>("");
  const [ stipent , setStipent] = useState<string>("");
  const [skill , setSkill] = useState<string>("");
  const [skills , setSkills] = useState<string[]>([])
  const [can , setCan] = useState<string>("");
  const [cans , setCans] = useState<string[]>([]);
  const [noOfOpening , setNoOfOpening] = useState<string>("");
  const [ description , setDescription] = useState<string>("");
  const [company , setCompany] = useState<string>("");
  const addSkill = (event : any) => {
    if(skill=="")return;
    setSkills(prev => [...prev ,skill])
    setSkill("");
  }
  const removeSkill = (name : string) =>{
    const newSkills = skills.filter(skill => skill !== name);
    setSkills(newSkills);
  }

  const addCan = (event : any) => {
    if(can=="")return;
    setCans(prev => [...prev ,can])
    setCan("");
  }
  const removeCan = (name : string) =>{
    const newCans = cans.filter(can => can !== name);
    setCans(newCans);
  }

  const submit = async () => {
    setSubmiting(true);
    const obj = {

        companyEmail : session?.user?.email,
        title : title,
        location : location,
        locationDesc : locationDesc,
        startDate : startDate,
        duration : duration,
        stipent : stipent,
        skills : skills,
        cans : cans,
        noOfOpening : noOfOpening,
        description : description
    }
    const res = await fetch('/api/createJob' ,{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    setSubmiting(false);
    router.back();
  }

  useEffect(() => {
    async function fetchData() {
        const res = await fetch('/api/getUser' ,{
            method: 'POST',
            body: JSON.stringify({email : session?.user?.email}),
            headers: {
              'Content-Type': 'application/json'
            }
        });
        
        const data = await res.json();
        setCompany(data.companyUserName);
        if(data&&!data.type){
            router.push('/profile/editProfile');
        }
        else if(data&&data.type !== 'employer'){
            alert("you cannot able to post Job");
            router.back();
        }
    }
    fetchData();
  },[session])

  return (
    <div className={'min-h-screen py-[70px] '}>
      <div className='flex  flex-col justify-center items-center m-5 gap-12'>
            <h1 className='text-4xl '>
                {company}
            </h1>
            <Card className='w-3/4'>
                <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-2 space-y-0 h-[100px] w-full">
                    <div className="space-y-1">
                        <CardTitle>
                            <div className="flex gap-2 my-2 mb-4">
                                Post Job
                            </div>
                        </CardTitle>
                    </div>
                    <div className="">
                        <Button variant="secondary" className="px-3 shadow-none">
                            <Image alt={"company name"} src={logo} width={32} height={32} />
                        </Button>
                    </div>
                </CardHeader>
                <div className='w-full p-4'>
                    <Separator />
                </div>
                <CardContent className='w-full'>
                    <div className='flex flex-col gap-2'>
                        <div className="flex gap-2 my-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                            </svg>
                            <label htmlFor='title'>
                                Job Title ?
                            </label>
                        </div>
                        <Input id='title' value={title} onChange={(e)=>setTitle(e.target.value)} className=' w-full md:w-1/2' placeholder='Eg. Software Engineer' />
                    </div>
                </CardContent>
                <CardContent>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='Description' className='flex gap-2 my-2 mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                            Job Description ?
                        </label>
                        <textarea id='Description' rows={10} cols={20} value={description} onChange={e=>setDescription(e.target.value)}  className='border rounded-lg p-2 w-full md:w-1/2' placeholder='Eg. Software Engineer' />
                    </div>
                </CardContent>
                <CardContent>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='Location' className='flex gap-2 my-2 mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            Job Location ?
                        </label>
                        <RadioGroup defaultValue="no" onValueChange={(e:any)=>setLocation(e)}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Work From Home" id="r1" />
                                <Label htmlFor="r1">Work From Home</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Relocate" id="r2" />
                                <Label htmlFor="r2">Relocate</Label>
                            </div>
                        </RadioGroup>
                        { location ==='Relocate' && 
                                <Input id='Location' value={locationDesc} onChange={e=>setLocationDesc(e.target.value)} className=' w-full md:w-1/2' placeholder={'Eg. Madurai'} />
                        }
                    </div>
                </CardContent>
                <CardContent>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='Date' className='flex gap-2 my-2 mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                            </svg>
                            Start Date ?
                        </label>
                        <Input id='Date' value={startDate} onChange={e=>setStartDate(e.target.value)} type='date' className=' w-full md:w-1/2' placeholder='"Eg." +new Date().toLocaleDateString()' />
                    </div>
                </CardContent>
                <CardContent>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='Duration' className='flex gap-2 my-2 mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                            Duration ? (in Months)
                        </label>
                        <Input id='Duration' value={duration} onChange={e=>setDuration(e.target.value)} type='number' className=' w-full md:w-1/2' placeholder='Eg. 3' />
                    </div>
                </CardContent>
                <CardContent>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='Stipent' className='flex gap-2 my-2 mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>
                            Stipent ? (in Months)
                        </label>
                        <Input id='Stipent' value={stipent} onChange={e=>setStipent(e.target.value)} type='number' className=' w-full md:w-1/2' placeholder='Eg. 3000' />
                    </div>
                </CardContent>
                <CardContent>
                    <div className="grid gap-2">
                        <Label htmlFor="Skills">Skills</Label>
                        <div className="flex gap-2">
                            <Input id="Skills" value={skill} type="text" placeholder="Enter your skills Eg. python" onChange={(event)=>{setSkill(event.target.value)}} />
                            <button type="button" className="bg-blue-400 text-white px-2 py-1 font-semibold rounded-lg" onClick={addSkill}>
                                add
                            </button>
                        </div>
                        <div className="flex flex-wrap">
                            { skills.map((skill , index) => (
                                <div className="bg-slate-300 border  px-2 py-1 rounded-lg m-1 flex justify-center gap-1 items-center" key={index}>
                                    {skill}
                                    <div  onClick={()=>removeSkill(skill)} className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardContent>
                    <div className="grid gap-2">
                        <Label htmlFor="can">Who can Apply ?</Label>
                        <div className="flex gap-2">
                            <Input id="can" value={can} type="text" placeholder="Available for Full Time" onChange={(event)=>{setCan(event.target.value)}} />
                            <div  className="bg-blue-400 px-2 flex flex-col justify-center py-1 rounded-lg" onClick={addCan}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            { cans.map((can , index) => (
                                <div className="bg-slate-300 border w-fit px-2 py-1 rounded-lg m-1 flex justify-between gap-1 items-center" key={index}>
                                    {can}
                                    <div  onClick={()=>removeCan(can)} className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardContent>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='Opening' className='flex gap-2 my-2 mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                            No of Opening ?
                        </label>
                        <Input id='Opening' value={noOfOpening} onChange={e=>setNoOfOpening(e.target.value)} type='number' className=' w-full md:w-1/2' placeholder='Eg. 5' />
                    </div>
                </CardContent>
                <CardContent className='w-full flex justify-center items-center'>
                        <button type='button' className='px-4 py-2 bg-green-500 text-white rounded-lg' disabled={submiting} onClick={submit}>
                            Submit
                        </button>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default page
