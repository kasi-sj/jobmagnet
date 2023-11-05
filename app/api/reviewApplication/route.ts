import { connectTodDB } from "@/utils/database";
import Job from "@/models/job";
import Apply from "@/models/apply";
import User from "@/models/user";
export const POST = async(req : any)=>{
    const {id , status}: any = await req.json();
    try{
        await connectTodDB();
        console.log(id , status , "this is start");
        const apply = await Apply.findByIdAndUpdate(id , {status : status});
        console.log(apply);
        const jobId = apply.jobId;
        if(status==='hired'){
            const job = await Job.findByIdAndUpdate(jobId , {$inc : {noOfOpening : -1}});
            const companyEmail = job.companyEmail;
            const company = await User.findOneAndUpdate({companyEmail:companyEmail} , {$inc : {hired : 1}});
        }
        console.log('ok')
        return new Response(JSON.stringify({message : 'success'}));
    }catch(e){
        console.log(e)
    }
}