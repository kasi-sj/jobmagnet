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

export default function DemoCreateAccount() {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("")
  const [type , setType] = useState("Candidate");
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email and password to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="userName">User Name</Label>
          <Input id="text" value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" placeholder="example123" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
        </div>
        <RadioGroup defaultValue="Candidate" onChange={(e)=>setType(e.target.value)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Employer" id="r1" />
          <Label htmlFor="r1">Employer</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Candidate" id="r2" />
          <Label htmlFor="r2">Candidate</Label>
        </div>
      </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create account</Button>
      </CardFooter>
    </Card>
  )
}