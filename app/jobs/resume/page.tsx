'use client'
import Image from 'next/image'
import { jobImage1 } from '@/asset/image';
import { Button } from '@/components/ui/button';
import JobListCard from '@/components/JobListCard';
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'
import { Input  } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import Spinner from '@/components/spinner';
import { Poppins } from 'next/font/google'
const poppins = Poppins({
  subsets: ['latin'],
  weight: '600'
})
export default function Home() {
  const {data:session} = useSession();
  const [company , setCompany] = useState<string>('');
  const [type , setType] = useState<string>('Select Type');
  const [skills , setSkills] = useState<Set<string>>(new Set());
  const [contact , setContact] = useState<{name:string,email:string,phone:string}>({name:'',email:'',phone:''});
  const [address , setAddress] = useState<{country:string,state:string,city:string}>({country:'',state:'',city:''});
  const [specialization , setSpecialization] = useState<string>('');
  const [count , setCount] = useState(0);
  const [skill , setSkill] = useState<string>()
  const [spin1 , setSpin1] = useState<boolean>(false);
  const [spin2 , setSpin2] = useState<boolean>(false);
  const [jobs,setJobs] = useState([])

  
  const onSubmit = async (event : any) => {
    setSpin2(true);
    const obj = {
      skills : Array.from(skills),
      contact,
      address,
      specialization,
      company,
      type,
    }
    const res = await fetch("/api/getJobByQuery"
    , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const data = await res.json();
      console.log(data);
      setJobs(data);
      setSpin2(false);
  }


  const removeSkill = (name : string) =>{
    const newSkills = new Set(skills);
    newSkills.delete(name);
    setSkills(newSkills);
  }
  const addSkill = (event : any) => {
    if(skill=="")return;
    setSkills(prev => {
      const newSkills = new Set(prev);
      newSkills.add(skill ||"");
      return newSkills;
    })
    setSkill("");
  }

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
      if(!data)return;
      setSkills(prev=>{
        const newSkills = new Set(prev);
        for(const skill of data.skills)
        newSkills.add(skill);
        return newSkills;
      })
      setSpecialization(data.profession)
      setType(data.catagory)
    };
    fun();
  },[session])



  const readPDF = async (event : React.ChangeEvent<HTMLInputElement>) => {

    if(!event.target.files)return;
    setSpin1(true);
    const file = event.target.files[0];
    if (file) {
      try {
        const pdfBuffer = await readFileAsBuffer(file);
        console.log('PDF file :', file);
        console.log('PDF file read as buffer:', pdfBuffer);
        await uploadPdf(pdfBuffer);
      } catch (error) {
        console.error('Error reading or uploading PDF file:', error);
      }
    } else {
      console.error('No file selected.');
    }
    setSpin1(false);
  };
    
  const readFileAsBuffer = (file: File) => {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          resolve(event.target.result as ArrayBuffer);
        } else {
          reject(new Error('Error reading the file.'));
        }
      };

      reader.onerror = (event) => {
        reject(new Error('Error reading the file.'));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPdf = async (pdfBuffer : any) => {
    const formData = new FormData();
    
    formData.append('pdf', new Blob([pdfBuffer]));
    try {
      const response = await fetch('/api/extractText', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSkills(prev=>{
          const newSkills = new Set(prev);
          for(const skill of data.data.skills)
          newSkills.add(skill);
          return newSkills;
        }
        );
        setContact(prev=>({...prev,...data.data.contact}));
        setAddress(prev=>({...prev,...data.data.address}));
        setSpecialization(data.data.specialization);
        console.log('PDF processed successfully:', );
      } else {
        const data = await response.json();
        console.error('Failed to upload PDF:', data);
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <main className=" py-[90px] ">
      
          <div className='flex items-center justify-center'>
          <div className='w-3/4 flex flex-col '>
            
            <div className='w-full  font-semibold flex justify-center from-neutral-500 text-white md:px-10'>
            <p className={"text-4xl sm:text-6xl sm:p-32 text-center mt-2 font-serif text-green-500 text-opacity-100  "} style={
              // raleway.style
              // roboto.style
              // montserrat.style
              // lato.style
              poppins.style
              }  >Make your Dream Job Come True</p>
            </div>
          <div className='flex w-full justify-center md:justify-evenly md:px-10 my-10 items-center gap-10'>
            <div className='flex flex-col gap-2'>
              <p className='text-2xl sm:text-4xl font-semibold text-center text-slate-600'>
                Find your Dream Job
              </p>
              <p className='text-xs sm:text-xl font-semibold text-center text-slate-400  pb-1'>
                Search, Find and Apply for Jobs directly on website
              </p>
            </div>
          </div>
          
          <div className='w-full flex flex-col items-center gap-2  md:px-20 my-10'>
              <label className='w-1/2 min-w-[250px] flex flex-row max-w-[500px] md:w-full text-slate-500 pl-2 '>
                    Upload Resume
              </label>
              <div className='w-1/2 min-w-[250px] flex flex-row max-w-[500px] md:w-full ' >
                  
                  <Input id="resume" onChange={readPDF} className='border-dashed ' disabled={spin1} type="file" accept=".pdf,.doc,.docx" />
                  <Spinner className="ml-2" loading={spin1} />
              </div>
              <label className='w-1/2 min-w-[250px] flex flex-row max-w-[500px] md:w-full text-slate-500 pl-2 '>
                    Enter Your Specialization
              </label>
              <div className='w-1/2 min-w-[250px] max-w-[500px] md:w-full' >
                <Input placeholder="eg Full Stack" value={specialization} onChange={e=>setSpecialization(e.target.value)} className='border ' />
              </div>
              <label className='w-1/2 min-w-[250px] flex flex-row max-w-[500px] md:w-full text-slate-500 pl-2'>
                    Enter The Company
              </label>  
              <div className='w-1/2 min-w-[250px] max-w-[500px] md:w-full' >
                <Input placeholder="zoho" className='border' value={company} onChange={e=>setCompany(e.target.value)}/>
              </div>
              <label className='w-1/2 min-w-[250px] flex flex-row max-w-[500px] md:w-full text-slate-500 pl-2 '>
                    Select Your Roll
              </label>
              <div className='w-1/2 min-w-[250px] max-w-[500px] md:w-full' >
                <div className='w-full '>
                <Select onValueChange={setType} >
                    <SelectTrigger  className="w-full border">
                        <SelectValue defaultValue={type} placeholder={type} />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="Intern">Intern</SelectItem>
                        <SelectItem value="Fresher">Fresher</SelectItem>
                        <SelectItem value="Experienced">Experienced</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
              </div>
              <label className='w-1/2 min-w-[250px] flex flex-row max-w-[500px] md:w-full text-slate-500 pl-2 '>
                    Enter Your Skills
              </label>
            <div className=" w-1/2 min-w-[250px] max-w-[500px] md:w-full flex flex-row">
              <Input 
              id="skills"
              value={skill}
              type="text" 
              placeholder="Enter your skills Eg. python" 
              onChange={(event)=>{setSkill(event.target.value)}} />
              <button type="button" className="bg-blue-400 ml-2 px-2 py-1 rounded-lg" onClick={addSkill}>
                  add
              </button>
            </div>
            <div className=" w-1/2 min-w-[250px] max-w-[500px] md:w-full flex flex-wrap">
              { Array.from(skills).map((skill , index) => (
                  <div className=" bg-slate-300 border px-2 py-1 rounded-lg m-1 flex justify-center gap-1 items-center" key={index}>
                      {skill}
                      <div  onClick={()=>removeSkill(skill)} className="cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                      </div>
                  </div>
              ))}
            </div>
            <div className='w-full items-center justify-center flex flex-row max-w-[500px] md:w-full gap-2'>
              <Button className={'text-white  bg-green-500 hover:bg-green-600 px-4 py-2' + (spin2?"bg-green-800":"")} disabled={spin2} onClick={onSubmit}>
                  Search Job
              </Button>
              <Spinner className="ml-2" loading={spin2} />
            </div>
          </div>
          <div className={" w-full"} >
            <JobListCard jobs={jobs}  setJobs={setJobs} page="search" role="search" />
          </div>
          </div>
          </div>
    </main>
  )
}
