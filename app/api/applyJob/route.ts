import { connectTodDB } from "@/utils/database";
import Job from "@/models/job";
import Apply from "@/models/apply";
import User from "@/models/user";
export const POST = async(req : any)=>{
    const {email,
    jobId,
    why,
    availability,
    resume,
    join ,
    whyjoin}: any = await req.json();
    try{
        await connectTodDB();
        const apply = await Apply.create({
            email,
            jobId,
            why,
            availability,
            resume,
            join,
            whyjoin
        });
        console.log(1);
        const job = await Job.findByIdAndUpdate(jobId, {$push: {candidates: apply._id}});
        console.log(2);
        const user = await User.findOneAndUpdate({email:email}, {$push: {applied: apply._id}});
        console.log(3);
        return new Response(JSON.stringify({apply}));
    }catch(e){
        console.log(e)
    }
}