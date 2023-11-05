'use client'
import { logo } from '@/asset/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useUploadThing } from '@/lib/hooks/uploadthings'
import { useSession } from 'next-auth/react'
import { set } from 'mongoose'

const page = (route:any) => {
  const [submitting ,setSubmitting] = React.useState(false);  
  const [title, setTitle] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const router = useRouter();
  const [why , setWhy] = React.useState('');
  const [whyjoin , setwhyjoin] = useState('');
  const [availability , setAvailability] = React.useState(false);
  const [resume , setResume] = useState<FileList | null>(null as any);
  const [join , setJoin] = React.useState('');
  const {startUpload} = useUploadThing("media");
  const {data : session} = useSession();
  const id = decodeURIComponent(route.params.id);

  useEffect(() => {
    const fun = async () => {
        if (id) {
            console.log(id);
            const res = await fetch("/api/getJobById",{
                method : 'POST',
                body : JSON.stringify({id: id})
            });
            const data = await res.json();
            setTitle(data._doc.title || '');
            setCompanyName(data.companyDetails.companyName || '');
        }
    }
    fun();
},[])
  const onSubmit = async () => {
    setSubmitting(true)
    var imgUrl: string | null = null;
    if (resume) {
      const imageRes = await startUpload(Array.from(resume));
      if (imageRes) {
        imgUrl = imageRes[0].fileUrl;
      }
    }
    const res = await fetch("/api/applyJob",{
        method : 'POST',
        body : JSON.stringify({
            email : session?.user?.email,
            jobId : id,
            why : why,
            availability : availability,
            resume : imgUrl,
            join : join,
            whyjoin : whyjoin,
        })
    });
    console.log(res);
    if(res.status === 200){ 
        setSubmitting(false)
        router.push('/');
    }
    setSubmitting(false)
  }
  return (
    <div className='min-h-screen py-[70px] flex justify-center '>
        <div className='flex w-3/4 lg:w-full  flex-col justify-center items-center m-5 gap-12'>
            <h1 className='text-4xl '>
                {title} at {companyName}
            </h1>
            <Card className='w-3/4'>
                <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-2 space-y-0 h-[100px] w-full">
                    <div className="space-y-1">
                        <CardTitle>
                            <div className="flex gap-2 my-2 mb-4">
                                Cover Letter
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
                        <label htmlFor='why'>
                            Why should you be hired for this role?
                        </label>
                        <div className='border p-4 w-full rounded-lg'>
                            <textarea id="why" value={why} onChange={e=>setWhy(e.target.value)} rows={15} className='border-none w-full outline-none ' placeholder='Mention in detail what relevant skill or past experience you have for this internship . What excites you about this internship? why would yoy be good fit?'>
                            </textarea>
                        </div>
                    </div>
                </CardContent>
                <CardContent className='w-full'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='why'>
                            Your availability
                        </label>
                        <div className='flex gap-2'>
                            <Checkbox id="terms"
                            onChange={()=>setAvailability(prev=>!prev)}
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                I can relocate to the job location
                            </label>
                        </div>
                    </div>
                </CardContent>
                <CardContent>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='availability'>
                            Join Immediately
                        </label>
                        <RadioGroup defaultValue={join} onValueChange={(e)=>setJoin(e)}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="r1" />
                                <Label htmlFor="r1">Yes, I am available to join immediately</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="r2" />
                                <Label htmlFor="r2">No (Plese specify your availability)</Label>
                            </div>
                        </RadioGroup>
                        { join==='No' && 
                            <div className='border p-4 w-full rounded-lg'>
                                <textarea value={whyjoin} onChange={(e)=>setwhyjoin(e.target.value)} id="availability" rows={15} className='border-none w-full outline-none ' placeholder='Eg. I am available full-time in Madurai for the next 6 months but will have exam for 1 days in june.'>
                                </textarea>
                            </div>
                        }
                    </div>
                </CardContent>
                <CardContent>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='resume'>
                        Custom resume <span className='text-slate-500'>(optional)</span>
                    </label>
                    <p className='text-slate-500'>
                        Employer can download and view this resume
                    </p>
                    <Input id="resume" onChange={e=>setResume(e.target.files)} className='border-dashed w-full md:w-1/2' type="file" accept=".pdf,.doc,.docx" />
                    <p className='text-slate-500'>
                        Max file size: 10Mb. File type - PDF , DOC , DOCX
                    </p>
                </div>
                </CardContent>
                <CardContent className='w-full flex justify-center items-center'>
                        <button type='button' disabled={submitting} onClick={onSubmit} className={`px-4 py-2 bg-green-500 text-white rounded-lg ${submitting && 'bg-slate-200'}`} >
                            Submit
                        </button>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default page
