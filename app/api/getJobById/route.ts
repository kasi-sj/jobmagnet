import { connectTodDB } from "@/utils/database";
import Job from "@/models/job";
import User from "@/models/user";

export const POST = async(req:any)=>{
    try{
        await connectTodDB();
        const { id } = await req.json();
        const job = await Job.findById(id);
        const email = job.companyEmail
        const users = await User.findOne({ email: email });
        // job.companyDetails = users;
        // console.log(job)
        const obj = {
            ...job,
            companyDetails: users
        }
        console.log(obj)
        return new Response(JSON.stringify(obj));
    }catch(e){
        console.log(e)
    }
}