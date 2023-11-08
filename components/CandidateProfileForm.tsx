import React, { use, useEffect, useState } from 'react'
import { CardContent, CardFooter } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useUploadThing } from '@/lib/hooks/uploadthings'
import { useSession } from 'next-auth/react'
import { set } from 'mongoose'

const CandidateProfileForm = () => {
  
  const router = useRouter();
  const {startUpload} = useUploadThing("media");
  const [img , setImg] = useState<string>("");
  const [skill , setSkill] = useState<string>("");

  const [candidateUserName , setUserName] = useState<string>("");
  const [contact , setContact] = useState<string>("");
  const [address , setAddress] = useState<string>("");
  const [education , setEducation] = useState<string>("");
  const [catagory , setCatagory] = useState<string>("");
  const [profession , setProfession] = useState<string>("");
  const [skills , setSkills] = useState<string[]>([])
  const { data : session } = useSession();
  const [ photo , setPhoto] = useState<FileList | null>(null as any);

  const addSkill = (event : any) => {
    setSkills(prev => [...prev ,skill])
    setSkill("");
  }
  const removeSkill = (name : string) =>{
    const newSkills = skills.filter(skill => skill !== name);
    setSkills(newSkills);
  }

  useEffect(() => {
    if(photo){
      const reader = new FileReader();
      reader.onload = () =>{
        if(reader.readyState === 2){
          setImg(reader.result as string);
        }
      }
      reader.readAsDataURL(photo[0] as any)
    }
  }, [photo])
  
  useEffect(() => {
    const fun = async () => {
      const res = await fetch("/api/getUser/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      });
      const data = await res.json();
      console.log(data);
      if(data.catagory){
        setCatagory(data.catagory);
        setEducation(data.education);
        setProfession(data.profession);
        setAddress(data.address);
        setContact(data.contact);
        setUserName(data.candidateUserName);
        setSkills(data.skills);
        setImg(data.image);
      }
    };
    fun();
  },[])

  const onSubmit = async () => {
    var imgUrl: string | null = null;
    if (photo) {
      const imageRes = await startUpload(Array.from(photo));
      if (imageRes) {
        imgUrl = imageRes[0].fileUrl;
      }
    }
    const obj = {
      email : session?.user?.email ,
      name : session?.user?.name,
      image : imgUrl || session?.user?.image,
      candidateUserName : candidateUserName,
      type : "candidate",
      skills : skills,
      address : address,
      contact : contact,
      education : education,
      catagory : catagory,
      profession : profession,
      applied : [],
      posted : [],
      companyName : "",
      companyUserName : "",
      about : "",
      webSite : "",
      startDate : ""
    }
    const res = await fetch("/api/setUser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    router.back();
    console.log(res);
  }

  return (
    <>
        <CardContent className="grid gap-4">
        <div className="flex items-center">
          <div className="bg-blue-50 rounded-full">
            
            {
                ! img ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-12 h-12">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                :
                <img alt="profile" src={img} className="w-24 h-24 rounded-full object-cover max-lg:w-12 max-lg:h-12" />
            }
          </div>
          <div >
            <Input id="photo" onChange={e=>{
                if (e.target.files && e.target.files.length > 0) {
                    setPhoto(e.target.files);
                }
            }} type="file" className=" border-none " />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">UserName</Label>
          <Input 
          id="candidateUserName" 
          value={candidateUserName}
          onChange={e=>setUserName(e.target.value)}
          type="text" 
          placeholder="kasinathansj1234" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">contact</Label>
          <Input 
          id="phone" 
          value={contact} 
          onChange={e=>setContact(e.target.value)}
          type="number" 
          placeholder="Enter your contact no ..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input 
          id="address" 
          value={address}
          onChange={e=>setAddress(e.target.value)}
          type="text" 
          placeholder="Enter your address ..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="education">Education</Label>
          <Input 
          id="education"
          value={education}
          onChange={e=>setEducation(e.target.value)} 
          type="text" 
          placeholder="Enter your Education Eg. Computer Science" />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="catagory">Catagory</Label>
            <Select onValueChange={e=>setCatagory(e)}>
                <SelectTrigger className="w-full">
                    <SelectValue defaultValue={catagory} placeholder="Select catagory" />
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
          <Input 
          id="profession" 
          value={profession}
          onChange={e=>setProfession(e.target.value)}
          type="text" 
          placeholder="Enter your profession Eg. Full Stack Web Developer" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="skills">Skills</Label>
          <div className="flex gap-2">
            <Input 
            id="skills"
            value={skill}
            type="text" 
            placeholder="Enter your skills Eg. python" 
            onChange={(event)=>{setSkill(event.target.value)}} />
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
        <div className='w-full flex justify-center'>
            <Button className="py-2 px-4" onClick={onSubmit}>Submit</Button>
        </div>
      </CardFooter>
    </>
  )
}

export default CandidateProfileForm
