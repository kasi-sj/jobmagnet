import React from 'react'
import { Input } from './ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from './ui/button'
const SearchJob = () => {
  return (
    <>
      <div className='w-1/2 md:w-full' >
        <Input placeholder="Enter Roll" className='border ' />
      </div>
      <div className='w-1/2 md:w-full' >
        <Input placeholder="Country" className='border' />
      </div>
      <div className='w-1/2 md:w-full' >
        <Input placeholder="Search Job" className='border' />
      </div>
      <div className='w-1/2 md:w-full' >
        <div className='w-full '>
        <Select >
            <SelectTrigger className="w-full border">
                <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Intern</SelectItem>
                <SelectItem value="banana">Fresher</SelectItem>
                <SelectItem value="blueberry">Experienced</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        </div>
      </div>
        <Button className='text-white bg-green-500 hover:bg-green-600 px-4 py-2'>
            Search
        </Button>
    </>
  )
}

export default SearchJob
