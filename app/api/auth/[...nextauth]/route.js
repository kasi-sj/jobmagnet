import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { connectTodDB } from '@/utils/database';
import User from '@/models/user';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';


const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_ID ,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET ,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
              },
            async authorize(credentials, req) {
              await connectTodDB();
              const sessionUser = await User.findOne({email:credentials.email});
              const encryptedPassword = await bcrypt.hash(credentials.password, 10);
              const result = await bcrypt.compare(credentials.password, encryptedPassword);
                if(result)return sessionUser;
                return null;
            }
          })
    ],
    callbacks:{
        async session({session}){
            var sessionUser = await User.findOne({email:session.user.email});

            if(sessionUser == null){
                sessionUser = await User.create({
                    email : session.user.email,
                    name : session.user.name.replace(" ","").toLowerCase(),
                    image:session.user.picture || "",
                    type : "",
                })
            }
            session.user.id = sessionUser._id.toString();
            session.user.name = sessionUser.name;
            session.user.image = sessionUser.image;
            return session
        },
    }
})

export {handler as GET , handler as POST};