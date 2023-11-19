import { connectTodDB } from "@/utils/database";
import User from "@/models/user";
import { getServerSession } from "next-auth";
export const POST = async(req : any)=>{
    const {email} : any = await req.json();
    const session = await getServerSession();
    if(!session||!session.user||!session.user.email){
        return new Response(JSON.stringify({message:"you are not allowed to access this data"}));
    }
    const sessionemail  = session.user.email ;
    if(email !== sessionemail){
        return new Response(JSON.stringify({message:"you are not allowed to access this data"}));
    }
    try{
        await connectTodDB();
        const res = await User.findOne({email});
        return new Response(JSON.stringify(res));
    }catch(e){
        console.log(e)
    }
}