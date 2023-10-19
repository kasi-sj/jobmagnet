import { connectTodDB } from "@/utils/database";
import User from "@/models/user";
export const POST = async(req : any)=>{
    const {email  , password } : {
        email : string,
        password : string,
       } = await req.json();
    try{
        console.log(email);
        await connectTodDB();
            const res = await User.findOne({
                email : email
            });
            if(res.password == password){
                return new Response(JSON.stringify({value : "ok"}),{status:200});
            }
            return new Response(JSON.stringify({value : "no"}),{status:200});
    }catch(e){
        console.log(e)
    }
}