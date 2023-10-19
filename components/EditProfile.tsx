"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"



export default function EditProfile() {
  const router = useRouter();
  const [skills , setSkills] = useState<string[]>([])
  const [skill , setSkill] = useState<string>("");
  const addSkill = (event : any) => {
    setSkills(prev => [...prev ,skill])
    setSkill("");
  }
  const removeSkill = (name : string) =>{
    const newSkills = skills.filter(skill => skill !== name);
    setSkills(newSkills);
  }
  const submit = () => {
    router.back();
  }
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email and password to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center">
          <div className="bg-blue-50 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div >
            <Input id="photo" type="file" className=" border-none " />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" placeholder="kasinathan sj" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">UserName</Label>
          <Input id="userName" type="text" placeholder="kasinathansj1234" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">contact</Label>
          <Input id="phone" type="number" placeholder="Enter your contact no ..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" type="text" placeholder="Enter your address ..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="education">Education</Label>
          <Input id="education" type="text" placeholder="Enter your Education Eg. Computer Science" />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="catagory">Catagory</Label>
            <Select >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select catagory" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectItem value="Intern">Intern</SelectItem>
                    <SelectItem value="Freelancer">Freelancer</SelectItem>
                    <SelectItem value="Job Seeker">Job Seeker</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profession">Profession</Label>
          <Input id="profession" type="text" placeholder="Enter your profession Eg. Full Stack Web Developer" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="skills">Skills</Label>
          <div className="flex gap-2">
            <Input id="skills" value={skill} type="text" placeholder="Enter your skills Eg. python" onChange={(event)=>{setSkill(event.target.value)}} />
            <button type="button" className="bg-blue-400 px-2 py-1 rounded-lg" onClick={addSkill}>
                add
            </button>
          </div>
          <div className="flex flex-wrap">
            { skills.map((skill , index) => (
                <div className=" bg-slate-300 border px-2 py-1 rounded-lg m-1 flex justify-center gap-1 items-center" key={index}>
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
      <CardFooter>
        <Button className="w-full" onClick={submit}>Submit</Button>
      </CardFooter>
    </Card>
  )
}