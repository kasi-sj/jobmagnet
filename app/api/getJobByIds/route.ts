import { connectTodDB } from "@/utils/database";
import Job from "@/models/job";
import User from "@/models/user";
import Apply from "@/models/apply";

export const POST = async(req : any)=>{
    try{
        await connectTodDB();
        const {list , type} : {list : [string] , type : string} = await req.json();
        var jobs  = [];
        var applys : any = [];
        console.log(list)
        if(type === "posted"){
            jobs = await Job.find({_id : {$in : list}});
        }else {
            applys = await Apply.find({_id : {$in : list}});
            const jobsId = applys.map((apply: { jobId: any; }) => apply.jobId);
            jobs = await Job.find({_id : {$in : jobsId}});
        }
        console.log(...applys.map((apply : any) => apply.jobId))
        const emails = jobs.map(job => job.companyEmail);
        console.log(emails)
        const users = await User.find({ email: { $in: emails } });
        const res = jobs.map(job => {
            if(type === "applied"){
                const applied = applys.find((apply: { jobId: any; }) => apply.jobId == job._id);
                const user = users.find(user => user.email === job.companyEmail);
                return { ...job.toObject(), companyDetails: user , applied : applied };
            }
            const user = users.find(user => user.email === job.companyEmail);
            return { ...job.toObject(), companyDetails: user };
        });
        console.log(res)
        return new Response(JSON.stringify(res));
    }catch(e){
        console.log(e)
    }
}