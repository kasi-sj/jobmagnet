import mongoose, { mongo } from 'mongoose'
let isConnected = false;

export const connectTodDB = async () =>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("mongodb connected succesfully")
        return ;
    }
    try{
        mongoose.connect(process.env.MONGODB_URL)
        isConnected=true;
        console.log("mongodb connected succesfully")
    }catch(e){
        console.log(error)
    }
}