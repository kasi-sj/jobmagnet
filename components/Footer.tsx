import React from 'react'
import { Separator } from '@/components/ui/separator'
import { instagramIcon, linkedinIcon, logo, twitterIcon, youtubeIcon } from '@/asset/image'
import Image from 'next/image'
import { Instagram, TwitterIcon } from 'lucide-react'
import Link from 'next/link'
const Footer = () => {
    return (
        <>
        <div className='w-full p-4'>
            <Separator  className="h-[2px]" />
        </div>
        <footer className="flex justify-center items-center">
            <div className='w-full lg:w-4/5 flex flex-col gap-10 justify-center items-center    py-10'>

            <div className="flex justify-between w-full px-4 gap-2 ">
                <div >
                    <Link href="/">
                    <div className='flex gap-1 items-center -ml-5'>                    
                    <Image src={logo} alt="logo" width={45} height={45} />
                    <h3 className="sm:text-lg font-bold">
                    About us</h3>
                    </div>
                    </Link>
                    <p className="mt-2 text-xs sm:text-sm">We're hiring </p>
                    <p className="mt-2 text-xs sm:text-sm" >Hire interns for your company</p>
                </div>

                <div>
                    <p className="mt-2 text-sm sm:text-lg text-green-500">Connecting Talent to Opportunities – Your Success Starts Here! </p>
                </div>
            </div>
            <div className='w-full flex justify-between items-center'>
                <div className=' mx-2 text-xs '>
                    © Copyright {new Date().getFullYear()} Job Magnet
                </div>
                <div className='flex gap-1 sm:gap-3 mx-2 '>
                    <div className='border py-[6px] px-[6px]  rounded-full border-slate-700'>
                        <Image src={linkedinIcon} width={30} height={30} className='max-sm:w-6  w-10 cursor-pointer' alt='linkedin' /> 
                    </div>
                    <div className='border px-[4px] py-[5px] rounded-full border-slate-700' >
                        <Image src={instagramIcon} width={30} height={30}  className=' max-sm:w-6 w-10 cursor-pointer' alt='linkedin' /> 
                    </div>
                    <div className='border px-[4px] py-[5px] rounded-full border-slate-700' >
                        <Image src={twitterIcon} width={30} height={30} className='max-sm:w-6 w-10 cursor-pointer'  alt='linkedin' /> 
                    </div>
                    <div className='border px-[4px] py-[5px] rounded-full border-slate-700' >
                        <Image src={youtubeIcon} width={30} height={30} className='max-sm:w-6 w-10 cursor-pointer'  alt='linkedin' /> 
                    </div>
                </div>
            </div>
            </div>
        </footer>
        </>
    )
}

export default Footer
