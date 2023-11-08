import { connectTodDB } from "@/utils/database";
import Job from "@/models/job";
import User from "@/models/user";

export const GET = async()=>{
    try{
        await connectTodDB();
        console.log("request came")
        const jobs = await Job.countDocuments();
        return new Response(JSON.stringify({count:jobs}));
    }catch(e){
        console.log(e)
    }
}