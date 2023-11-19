import { connectTodDB } from "@/utils/database";
import Job from "@/models/job";
import bcrypt from 'bcrypt';
import User from "@/models/user";
export const POST = async(req : any)=>{
    const {email , password ,name
    } : any = await req.json();
    
    try{
        await connectTodDB();
        const encrypt = await bcrypt.hash(password, 10);
        console.log(encrypt);
        const res = await User.create({
            email,
            hashedpassword: encrypt,
            name,
            image: "",
            type : "",
        });
        console.log("created");
        console.log(res);
        return new Response(JSON.stringify(res));
    }catch(e){
        console.log(e)
    }
}