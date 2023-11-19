'use client'
import React, { useEffect, useState } from 'react'
import {Card} from '@/components/ui/card'
import {CardHeader} from '@/components/ui/card'
import {CardTitle} from '@/components/ui/card'
import {CardDescription} from '@/components/ui/card'
import {CardContent} from '@/components/ui/card'
import {CardFooter} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Label} from '@/components/ui/label'
import {Input } from '@/components/ui/input'
import { githubIcon , googleIcon } from '@/asset/image'
import Image from 'next/image'
import { getProviders, signIn, useSession } from 'next-auth/react'
import User from '@/models/user'
import { useRouter } from 'next/navigation'
const page = () => {
    const { data: session } = useSession();
    const [providers, setProviders]: any = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    useEffect(() => {
      const getProvidersData = async () => {
        const providersData : any= await getProviders();
        setProviders(providersData);
      }
      getProvidersData();
    }, [])

    useEffect(() => { 
      if(session) {
        router.push('/profile');
      }
    }
    , [session])


    const onSubmit = async () => {
      const res = signIn('credentials', {
        email:email,
        password :password,
      });
    }

    const onGoogleLogin = async () => {
      const res = await signIn(providers.google.id);
    }

    const onGithubLogin = async () => {
      const res = await signIn(providers.github.id);
    }
  return (
    <div className='py-[90px] min-h-screen flex justify-center items-center w-full'>
    <div className='w-full md:w-1/2 ' >

    <Card >
        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
            Enter your email below to create your account
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
            {providers?.github && (<Button variant="outline"  onClick={onGithubLogin} >
              <Image src={githubIcon} alt="logo" className='pr-2' width={30} height={30} /> Github
            </Button>)}
            {
              providers?.google && (
                <Button variant="outline" onClick={onGoogleLogin}>
                  <Image src={googleIcon} alt="logo" className='pr-2' width={30} height={30} /> Google
                </Button>
              )
            }
            </div>
            <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                Or continue with
                </span>
            </div>
            </div>
            <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" 
            value={email} onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
            value={password} onChange={(e) => setPassword(e.target.value)}
            id="password" type="password" />
            </div>
        </CardContent>
        <CardFooter>
        <div className='flex flex-col justify-center items-center gap-5 w-full'>
            <Button className="w-full px-4 py-2" onClick={onSubmit}>Log In</Button>
              <p>
                new User ?  
                <a href="/signUp" className="text-blue-500"> Sign Up</a>
              </p>
            </div>
        </CardFooter>
        </Card>

        </div>
    </div>
  )
}

export default page
