import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Application from "./Application"
import { useState } from "react"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"

export default function page({data , job}:any) {
  const {data : session} = useSession();
  console.log(job)
  return (
    <div className="flex flex-col justify-start items-center ">
        <Card className="w-[1000px] my-10">
        <CardHeader>
            <CardTitle>Candidates</CardTitle>
            <CardDescription>
            Applied for the Job
            </CardDescription>
        </CardHeader>
        
        {data && <>
          { data.map((item : any)=> 
            <CardBox item={item} company={session} job={job}/>
          )
          }
        </>
        }
        </Card>
    </div>
  )
}

const CardBox = ( {item , company , job}: any ) => {
  
  const onHire = () => {
    const res = fetch('/api/reviewApplication',{
      method : 'POST',
      body : JSON.stringify({id : item.application._id , status : 'hired'})
    })
    const companyEmail = company.user.email;
    const companyName = company.user.name;
    const candidateEmail = item.user.email;
    const candidateName = item.user.candidateUserName;
    const status = 'hired';
    console.log(companyEmail , companyName , candidateEmail , candidateName , status , job._doc.title)
    const mail = fetch('/api/sendMail',{
      method : 'POST',
      body : JSON.stringify({
        companyEmail : companyEmail,
        companyName : companyName,
        candidateEmail : candidateEmail,
        candidateName : candidateName,
        status : status,
        jobTitle : job._doc.title
      })
    })
    window.location.reload()
  }
  const onReject = () => {
    const res = fetch('/api/reviewApplication',{
      method : 'POST',
      body : JSON.stringify({id : item.application._id , status : 'rejected'})
    })
    const companyEmail = company.user.email;
    const companyName = company.user.name;
    const candidateEmail = item.user.email;
    const candidateName = item.user.candidateUserName;
    const status = 'rejected';
    console.log(companyEmail , companyName , candidateEmail , candidateName , status , job._doc.title)
    const mail = fetch('/api/sendMail',{
      method : 'POST',
      body : JSON.stringify({
        companyEmail : companyEmail,
        companyName : companyName,
        candidateEmail : candidateEmail,
        candidateName : candidateName,
        status : status,
        jobTitle : job._doc.title
      })
    })
    window.location.reload()
  }
  const [click , setClick] = useState(false)
  return (
    <CardContent className="grid gap-6 " >
        <div className="flex items-center cursor-pointer  justify-between space-x-4" onClick={()=>setClick(prev=>!prev)} >
        <div className="flex items-center space-x-4">
            <Avatar>
              <Image src={item.user.image} alt="avatar" width={40} height={40} />
            </Avatar>
            <div>
            <p className="text-sm font-medium leading-none">{item.user.candidateUserName}</p>
            <p className="text-sm text-muted-foreground">{item.user.email}</p>
            </div>
        </div>
        {item.application.status === 'processing' && <p className="text-blue-400">
          review
        </p> }
        {item.application.status === 'hired' && <p className="text-green-400">
          hired
        </p> }
        {item.application.status === 'rejected' && <p className="text-red-400">
          rejected
        </p> }
        </div>
        {
          click && <div className="w-full flex flex-col justify-center items-center"> 
            <div className="w-full">
              <Application data={item.application} type={"posted"} />
            </div>
            {
             item.application.status === 'processing' && 
              <div className="w-full flex justify-center px-2 gap-5">
              <Button onClick={onHire} className="px-2 py-1 bg-green-500">Hire Him</Button>
              <Button onClick={onReject} className="px-2 py-1 bg-red-500">Reject Him</Button>
            </div>}
          </div>
        }
    </CardContent>
  )
}