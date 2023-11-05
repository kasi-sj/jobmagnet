import { connectTodDB } from "@/utils/database";
import User from "@/models/user";
export const POST = async(req : any)=>{
    const {
        email,
        name,
        image,
        candidateUserName,
        type,
        skills,
        address,
        contact,
        education,
        catagory,
        profession,
        applied,
        posted,
        companyName,
        companyUserName,
        about,
        webSite,
        startDate,
    } : any = await req.json();
    try{
        await connectTodDB();
        const res = await User.findOneAndUpdate({email:email},{
            email,
            name,
            image,
            candidateUserName,
            type,
            skills,
            address,
            contact,
            education,
            catagory,
            profession,
            applied,
            posted,
            companyName,
            companyUserName,
            about,
            webSite,
            startDate,
            });
            console.log(res)
        return new Response(JSON.stringify(res));
    }catch(e){
        console.log(e)
    }
}