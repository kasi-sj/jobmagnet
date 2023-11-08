import { connectTodDB } from "@/utils/database";
import Job from "@/models/job";
import User from "@/models/user";

export const GET = async()=>{
    try{
        await connectTodDB();
        const jobs = await Job.find().limit(20);// sort by score in descending order and limit to 10 results
        const emails = jobs.map(job => job.companyEmail);
        console.log(jobs)
        const users = await User.find({ email: { $in: emails } });
        console.log(users)
        const res = jobs.map(job => {
            const user = users.find(user => user.email === job.companyEmail);
            return { ...job.toObject(), companyDetails: user };
        });
        console.log(res)
        return new Response(JSON.stringify(res));
    }catch(e){
        console.log(e)
    }
}