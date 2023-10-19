'use client'
import { logo } from "@/asset/image"
import { Button } from "@/components/ui/button"
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Place, Money } from "@/components/SmallComponents"    

const JobCard = ({applied}:{applied:string}) => {
    const router = useRouter();

    const FullDetail = () => {
        const job = 'job1';
        if(applied==='no')
        router.push(`/jobs/${job}`);
        else
        router.push(`profile/application/${job}`);
    }
    return (
        <div className="w-full  lg:w-[500px] flex flex-col items-center justify-center">
            <Card>
                <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-2 space-y-0 h-[225px] w-full">
                    <div className="space-y-1">
                        <div className="w-2/3   items-center mb-4">
                            <div className="flex  items-center  text-sm rounded-lg bg-blue-100 mb-2 text-blue-600  ">
                                { applied==='no' && <div  className="w-full px-3  shadow-none">
                                    Actively Hiring
                                </div>}
                                { applied==='yes' && <div  className="w-full px-3  shadow-none">
                                    Applied
                                </div>}
                                
                            </div>
                        </div>
                        <CardTitle>
                            <div className="flex gap-2 my-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                </svg>
                                Software Developer
                            </div>
                        </CardTitle>
                        <CardDescription>
                            <div className="flex flex-col gap-1">
                                Lavender company LTD.
                                <Place/>
                                <Money/>
                            </div>
                        </CardDescription>
                    </div>
                    <div className="">
                        <Button variant="secondary" className="px-3 shadow-none">
                            <Image alt={"company name"} src={logo} width={32} height={32} />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4 text-sm text-muted-foreground mt-6">
                        <div className="flex items-center">
                            20k applications
                        </div>
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                            Updated April 2023
                        </div>
                        <button type="button" onClick={FullDetail}>
                            <p className="text-blue-500 cursor-pointer">
                                { applied === 'yes' ? "Review Application" : "View Details"}
                            </p>
                       </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


export default JobCard
