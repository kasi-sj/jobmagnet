'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { logo } from '@/asset/image/index'
import Link from 'next/link'
import { Input } from './ui/input'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Avatar } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Providers() {
  const [providers, setProviders] = useState(null);
  
  useEffect(() => {
    const getProvidersData = async () => {
      const providersData : any= await getProviders();
      setProviders(providersData);
    }
    getProvidersData();
  }, [])

  return (
    <>
      {providers && 
      Object.values(providers).map((provider : any)=> (
        <button type="button" onClick={()=>signIn(provider.id)}>
            <div className='flex gap-1 m-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" className="stroke-current text-black stroke-1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 12l-3-3m0 0l3-3m-3 3h-9" className="stroke-current text-black stroke-1.5" />
              </svg>
              <p className="text-black" > LogIn </p>
            </div>
          </button>
      ))}
    </>
  )
}

const NavBar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [ image , setImage] = useState(session?.user?.image);

  useEffect(()=>{
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
      if (data && data.type) {
        console.log(data.type);
        setImage(data.image);
      }
    };
    fun();
  },[session])
  return (
    <div className='w-full  bg-white bg-opacity-70  flex flex-col items-center z-10 '>
    <div className='  h-[90px]  bg-white bg-opacity-70  w-3/4 max-md:w-screen flex items-center fixed'>
      <div className= " flex  justify-between  w-full items-center px-6"> 
        <Link href="/">
        <div className='flex gap-1 m-1 items-center'>
          
            <Image src={logo} alt="logo" width={65} height={65} />
          
          <p className=' max-sm:text-lg text-2xl  font-bold '>Job Magnet</p>
        </div>
        </Link>

        <div className='gap-10 items-center hidden sm:flex'>
          { session?.user && <Link href="/profile">
          <div className='flex  justify-center items-center gap-2 m-1' >
            
            {
              image  ? <Image alt="ad" src={image} width={35} height={35} className='rounded-full cursor-pointer' />
              
              :  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            <p className="text-black" >Profile</p>
          </div>
          </Link>}
          <Link href='/'>
            <div className='flex gap-1 m-1' >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <p className="text-black" >Home</p>
            </div>
          </Link>
          {
           (
            session?.user?.email ? 
              <button type="button" onClick={(e)=>{
                signOut();
                }}>
                <div className='flex gap-1 m-1 '  >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  <p className="text-black" > LogOut </p>
                </div>
              </button> : 
              <Providers />
            ) 
          }
        </div>
        <div className='sm:hidden'>
          <DropdownMenu >
            <DropdownMenuTrigger className='mx-2 p-2' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='sm:hidden mx-2'>
              <DropdownMenuLabel>
                Menu
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                { session?.user && <Link href="/profile">
                    <div className='flex  justify-center items-center gap-4 m-1' >
                      {
                        image  ? <Image alt="dp" src={image} width={35} height={35} className='rounded-full' />
                        :  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      }
                      <p className="text-black" >Profile</p>
                    </div>
                  </Link>
                }
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Link href='/'>
                <div className='flex gap-4 m-1' >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <p className="text-black" >Home</p>
                </div>
              </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
              {
              (
                session?.user?.email ? 
                  <button type="button" onClick={(e)=>{
                    signOut();
                    }}>
                    <div className='flex gap-4 m-1 '  >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                      </svg>
                      <p className="text-black" > LogOut </p>
                    </div>
                  </button> : 
                  <Providers />
                ) 
              }
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
    </div>
  )
}


export default NavBar

