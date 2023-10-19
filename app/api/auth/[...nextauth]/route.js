import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectTodDB } from '@/utils/database';
import User from '@/models/user';

const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        async session({session}){
            const sessionUser = await User.findOne({email:session.user.email});
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({profile }){
            try{
                await connectTodDB();
                    if(!(await User.findOne({
                        email : profile.email
                    }))){
                        await User.create({
                            email : profile.email,
                            name : profile.name.replace(" ","").toLowerCase(),
                            image:profile.picture || "https://res.cloudinary.com/dq7l8216n/image/upload/v1622711879/nextjs-mongodb-cloudinary/placeholder-image.jpg",
                            type:"google"
                        })
                    }
                    return true;
            }catch(e){
                console.log(e)
            }
        }
    }
})

export {handler as GET , handler as POST};