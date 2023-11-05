import { connectTodDB } from "@/utils/database";
import User from "@/models/user";
export const POST = async(req : any)=>{
    const {email} : any = await req.json();
    try{
        await connectTodDB();
        const res = await User.findOne({email});
        return new Response(JSON.stringify(res));
    }catch(e){
        console.log(e)
    }
}