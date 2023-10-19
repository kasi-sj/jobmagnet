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
import { useUser } from "@/lib/context/userContext"
import { set } from "mongoose"
import { getProviders, signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DemoCreateAccount() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();
  const { data : session } = useSession();
  const {  setUser } : any = useUser();
  const onSubmit = async (e : any) => {
    const obj = { 
      email : email,
      password : password,
     } 
    const res = await fetch('/api/checkUser' ,{
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res);
    if(res.status==200){
      router.back();
    }
  }
  useEffect(()=>{
    setUser({...session?.user,type:'google'});
  },[session]);
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl pb-2">Login to your account</CardTitle>
        <Providers/>
        <CardDescription className="pt-2">
          Enter your email and password
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="m@example.com" />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onSubmit}>Submit</Button>
      </CardFooter>
      <div className="w-full flex justify-evenly items-center mb-5">
        <span className="w-1/4 border-t " />
        <span className="bg-background px-2 text-muted-foreground">
            new User ?
        </span>
        <Link href="/signUp">
            <p className="text-blue-500">SignUp</p>
        </Link>
        <span className="w-1/4 border-t" />
      </div>
    </Card>
  )
}

function Providers() {
  const [providers, setProviders] = useState(null);
  const router = useRouter();

  const onClick = async (id : any) => {
    const val : any = await signIn(id);
    console.log(val);
    if(val==true){
      router.back();
    }
  }
  useEffect(() => {
    const getProvidersData = async () => {
      const providersData : any = await getProviders();
      setProviders(providersData);
    }
    getProvidersData();
  }, [])

  return (
    <>
      {providers && 
      Object.values(providers).map((provider : any) => (
        <button type='button' className="flex text-center justify-center px-2 py-2 font-medium bg-slate-200 border rounded-md" onClick={()=>onClick(provider.id)}>
          Continue With Google
        </button>
      ))}
    </>
  )
}