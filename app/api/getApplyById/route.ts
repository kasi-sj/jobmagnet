import { connectTodDB } from "@/utils/database";
import Apply from "@/models/apply";
import User from "@/models/user";

export const POST = async(req:any)=>{
    try{
        await connectTodDB();
        const { id } = await req.json();
        const apply = await Apply.findById(id);
        console.log(apply)
        return new Response(JSON.stringify(apply));
    }catch(e){
        console.log(e)
    }
}