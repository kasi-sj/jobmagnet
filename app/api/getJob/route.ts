import { connectTodDB } from "@/utils/database";
import Job from "@/models/job";
import User from "@/models/user";

export const POST = async(req:any)=>{
    try{
        await connectTodDB();
        const {pageNo} = await req.json();
        const offset = (pageNo - 1) * 10;
        const jobs = await Job.find().skip(offset).limit(10);// sort by score in descending order and limit to 10 results
        const emails = jobs.map(job => job.companyEmail);
        const users = await User.find({ email: { $in: emails } });
        console.log(pageNo)
        const res = jobs.map(job => {
            const user = users.find(user => user.email === job.companyEmail);
            return { ...job.toObject(), companyDetails: user };
        });
        const total = await Job.countDocuments();
        var next = true;
        if(offset+res.length == total)
        next = false;
        return new Response(JSON.stringify({data:res,next:next}));
    }catch(e){
        console.log(e)
    }
}