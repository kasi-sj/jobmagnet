'use client'
import { logo } from '@/asset/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

const page = () => {
  const [immediately , setImmediately] = React.useState("");  
  const router = useRouter();
  const submit = () => {
      router.push('/');
  }
  return (
    <div className='min-h-screen py-[70px] '>
        <div className='flex  flex-col justify-center items-center m-5 gap-12'>
            <h1 className='text-4xl '>
                Software Developer at Lavender company LTD
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
                            <textarea id="why" rows={15} className='border-none w-full outline-none ' placeholder='Mention in detail what relevant skill or past experience you have for this internship . What excites you about this internship? why would yoy be good fit?'>
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
                            <Checkbox id="terms" />
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
                            Your availability
                        </label>
                        <RadioGroup defaultValue="no" onValueChange={(e)=>setImmediately(e)}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="r1" />
                                <Label htmlFor="r1">Yes, I am available to join immediately</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="r2" />
                                <Label htmlFor="r2">No (Plese specify your availability)</Label>
                            </div>
                        </RadioGroup>
                        { immediately==='No' && 
                            <div className='border p-4 w-full rounded-lg'>
                                <textarea id="availability" rows={15} className='border-none w-full outline-none ' placeholder='Eg. I am available full-time in Madurai for the next 6 months but will have exam for 1 days in june.'>
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
                    <Input id="resume" className='border-dashed w-full md:w-1/2' type="file" accept=".pdf,.doc,.docx" />
                    <p className='text-slate-500'>
                        Max file size: 10Mb. File type - PDF , DOC , DOCX
                    </p>
                </div>
                </CardContent>
                <CardContent className='w-full flex justify-center items-center'>
                        <button type='button' className='px-4 py-2 bg-green-500 text-white rounded-lg' onClick={submit}>
                            Submit
                        </button>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default page
