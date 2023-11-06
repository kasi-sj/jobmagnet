import mongoose, {Schema , model , models} from 'mongoose';

const ApplySchema = new Schema({
    email : {
        type: String,
        required : [true , 'Email is required!'],
    },
    jobId : {
        type : String,
        required : [true , 'Job Id is required!'],
    },
    why : {
        type : String
    },
    availability : {
        type : String
    },
    join : {
        type : String
    },
    resume : {
        type : String
    },
    whyjoin :{
        type : String
    },
    status:{
        type : String,
        default : "processing"
    }
});


const Apply = models.Apply ||  model("Apply" , ApplySchema);

export default Apply;