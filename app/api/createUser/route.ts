import { connectTodDB } from "@/utils/database";
import User from "@/models/user";
export const POST = async(req : any)=>{
    const {email , userName , password } : {
        email : string,
        password : string,
        userName : string
       } = await req.json();
    try{
        console.log(email);
        await connectTodDB();
            if(!(await User.findOne({
                email : email
            }))){
                await User.create({
                    email : email,
                    name : userName.replace(" ","").toLowerCase(),
                    password : password,
                    type : "email"
                })
                console.log("new user created")
            }else{
                return new Response(JSON.stringify("exist"),{status:200});
            }
            return new Response(JSON.stringify("newUser"),{status:200});
    }catch(e){
        console.log(e)
    }
}