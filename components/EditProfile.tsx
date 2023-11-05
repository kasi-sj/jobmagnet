"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react"
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
import CandidateProfileForm from "./CandidateProfileForm"
import EmployerProfileForm from "./EmployerProfileForm"
import { useSession } from "next-auth/react"



export default function EditProfile() {
  const router = useRouter();
  const [already , setAlready] = useState<boolean>(false);
  const { data: session } = useSession(); 
  const [role , setRole] = useState<string>("") 
  React.useEffect(() => {
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
      if (data && data.type) {
        setAlready(true);
        console.log(data.type);
        setRole(data.type);
      }
    };
    fun();
  },[session]);
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Edit Your Profile</CardTitle>
        <CardDescription>
          Enter your Details to create your profile
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2 p-5">
            <Label htmlFor="catagory">Catagory</Label>
            <Select onValueChange={setRole} disabled={already} >
                <SelectTrigger className="w-full" >
                    <SelectValue defaultValue={role} placeholder="Select catagory"  />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectItem value="candidate">Candidate</SelectItem>
                    <SelectItem value="employer">Employeer</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        {
          role === "candidate" && 
          <CandidateProfileForm /> 
        }
        { role === 'employer' &&
          <EmployerProfileForm />
        }
      </CardContent>
    </Card>
  )
}