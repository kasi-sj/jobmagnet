import React from 'react'
import { Separator } from '@/components/ui/separator'
import { instagramIcon, linkedinIcon, twitterIcon, youtubeIcon } from '@/asset/image'
import Image from 'next/image'
import { Instagram, TwitterIcon } from 'lucide-react'
const Footer = () => {
    return (
        <footer className="flex flex-col gap-10 justify-center items-center  bg-gray-600 text-white py-10">
            <div className="flex justify-between w-full px-10">
                <div >
                    <h3 className="text-lg font-bold">About us</h3>
                    <p className="mt-2 text-sm">We're hiring </p>
                    <p className="mt-2 text-sm" >Hire interns for your company</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold">Terms & Conditions</h3>
                    <p className="mt-2 text-sm">Privacy </p>
                    <p className="mt-2 text-sm" >Contact us</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold">Jobs</h3>
                    <p className="mt-2 text-sm">Jobs by Category </p>
                    <p className="mt-2 text-sm" >Jobs by Locations</p>
                </div>
            </div>
            <div className='w-full p-2'>
                <Separator  className="h-[1px]" />
            </div>
            <div className='w-full flex justify-between '>
                <div className='flex gap-1 ml-10'>
                    <Image src={linkedinIcon} width={30} height={30} alt='linkedin' /> 
                    <Image src={instagramIcon} width={30} height={30} alt='linkedin' /> 
                    <Image src={twitterIcon} width={30} height={30} alt='linkedin' /> 
                    <Image src={youtubeIcon} width={30} height={30} alt='linkedin' /> 
                </div>
                <div className='mr-10'>
                    © Copyright {new Date().getFullYear()} Job Magnet
                </div>
            </div>
        </footer>
    )
}

export default Footer
