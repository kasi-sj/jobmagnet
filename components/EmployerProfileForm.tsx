import React, { use, useEffect, useState } from 'react'
import { CardContent, CardFooter } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useUploadThing } from '@/lib/hooks/uploadthings'
import { useSession } from 'next-auth/react'

const EmployerProfileForm = () => {
  const { data : session} = useSession();
  const {startUpload} = useUploadThing("media");
  const [ photo , setPhoto] = useState<FileList | null>(null as any);
  const [img , setImg] = useState<string>("");
  const router = useRouter();
  const [companyName , setCompanyName] = useState<string>("");
  const [companyUserName , setCompanyUserName] = useState<string>("");  
  const [contact , setContact] = useState<string>("");
  const [address , setAddress] = useState<string>("");
  const [about , setAbout] = useState<string>("");
  const [webSite , setWebSite] = useState<string>("");
  const [startDate , setStartDate] = useState<string>("");
  const [submitting , setSubmitting] = useState<boolean>(false);
  const [posted , setPosted] = useState<string[]>([]);
  const submit = () => {
    setSubmitting(true);
    const fun = async () => {
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
        candidateUserName : "",
        type : "employer",
        address : address,
        contact : contact,
        education : "",
        catagory : "",
        profession : "",
        companyUserName,
        about,
        webSite,
        startDate,
        companyName : companyName,
        skills : [],
        applied : [],
        posted : posted
      }
      const res = await fetch("/api/setUser/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      router.back();
      setSubmitting(false);
      console.log(res);
    }
    fun();
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
      if(data.companyName){
        setCompanyName(data.companyName);
        setAddress(data.address);
        setContact(data.contact);
        setCompanyUserName(data.companyUserName);
        setAbout(data.about);
        setWebSite(data.webSite);
        setStartDate(new Date(data.startDate).toLocaleDateString());
        setImg(data.image);
        setPosted(data.posted);
      }
    };
    fun();
  },[]);
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
          <Label htmlFor="name">Company Name</Label>
          <Input 
          id="name" 
          value={companyName} 
          onChange={e=>setCompanyName(e.target.value)}
          type="text" 
          placeholder="Google" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Company UserName</Label>
          <Input 
          id="userName"
          value={companyUserName}
          onChange={e=>setCompanyUserName(e.target.value)}
          type="text" 
          placeholder="google1234" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Contact</Label>
          <Input 
          id="phone" 
          type="number" 
          value={contact} 
          onChange={e=>setContact(e.target.value)}
          placeholder="Enter your Company no ..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input 
          id="address" 
          type="text" 
          value={address} 
          onChange={e=>setAddress(e.target.value)}
          placeholder="Enter your Company address ..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="education">About Company</Label>
          <textarea 
          id="education" 
          value={about} 
          className='border mt-2 rounded-sm p-2' 
          onChange={e=>setAbout(e.target.value)}
          placeholder="Lavender Company is an Indian online education ..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profession">WebSite</Label>
          <Input 
          id="profession" 
          value={webSite} 
          onChange={e=>setWebSite(e.target.value)}
          type="text" 
          placeholder="www.google.com" />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="date">Start Date</Label>
          <Input 
          id="date" 
          value={startDate}
          onChange={e=>setStartDate(e.target.value)} 
          type="date"  />
        </div>
      </CardContent>
      <CardFooter>
        <div className='w-full flex justify-center'>
            <Button className="py-2 px-4" onClick={submit} disabled={submitting} >Submit</Button>
        </div>
      </CardFooter>
    </>
  )
}

export default EmployerProfileForm
