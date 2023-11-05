import { connectTodDB } from "@/utils/database";
import Job from "@/models/job";
import User from "@/models/user";
export const POST = async(req : any)=>{
    const {companyEmail,
        title,
        location,
        locationDesc,
        startDate,
        duration,
        stipent,
        skills,
        cans,
        noOfOpening,
        description    
    } : any = await req.json();
    
    try{
        await connectTodDB();
        const companyName = await (await User.findOne({email:companyEmail})).companyName;
        const res = await Job.create({
            companyName,
            companyEmail,
            title,
            location,
            locationDesc,
            startDate,
            duration,
            stipent,
            skills,
            cans,
            noOfOpening,
            description
        });

        console.log(res);
        const user = await User.findOneAndUpdate({email:companyEmail}, {$push: {posted: res._id}});
        return new Response(JSON.stringify(res));
    }catch(e){
        console.log(e)
    }
}