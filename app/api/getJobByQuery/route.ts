import { connectTodDB } from "@/utils/database";
import Job from "@/models/job";
import User from "@/models/user";
import Apply from "@/models/apply";

export const POST = async(req : any)=>{
    try{
        await connectTodDB();
        const {skills,
        contact,
        address,
        specialization,
        company,
        type,} =  await req.json();
        console.log(skills,contact,address,specialization,company,type)
        const jobs = await Job.aggregate([
            {
                $addFields: {
                    matchskills: {
                        $size: {
                            $setIntersection: [
                                {
                                    $map: {
                                        input: "$skills",
                                        as: "skill",
                                        in: { $toLower : {$trim: { input: "$$skill", chars: " " } }}
                                    }
                                },
                                skills.map((skill:any) => skill.trim().toLowerCase())
                            ]
                        }
                    },
                    matchSpecialization: {
                        $cond: [
                            {
                                $eq: [
                                    { $toLower: { $trim: { input: "$title", chars: " " } } },
                                    specialization.trim().toLowerCase()
                                ]
                            },
                            1,
                            0
                        ]
                    },
                    matchCompany: {
                        $cond: [
                            {
                                $eq: [
                                    { $toLower: { $trim: { input: "$companyName", chars: " " } } },
                                    company.trim().toLowerCase()
                                ]
                            },
                            1,
                            0
                        ]
                    }
                }
            },
            {
                $sort: { matchCompany: -1, matchSpecialization: -1, matchskills: -1 }
            },
            {
                $limit: 15 // Limit to retrieve only the document with the highest match score
            }
        ]);
        
        const emails = jobs.map(job => job.companyEmail);
        const users = await User.find({ email: { $in: emails } });
        const res = jobs.map(job => {
            const user = users.find(user => user.email === job.companyEmail);
            return { ...job, companyDetails: user };
        });
        console.log(res)
        return new Response(JSON.stringify(res));
    }catch(e){
        console.log(e)
    }
}