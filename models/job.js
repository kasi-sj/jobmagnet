import mongoose, {Schema , model , models} from 'mongoose';

const JobSchema = new Schema({
    companyEmail : {
        type: String,
        required : [true , 'Company Mail is required!'],
    },
    title : {
        type : String,
        required : [true , 'Title is required!'],
    },
    location : {
        type : String,
    },
    locationDesc : {
        type : String,
    },
    startDate : {
        type : Date,
    },
    duration : {
        type : Number,
    },
    stipent : {
        type : Number,
    },
    skills : {
        type : [String],
    },
    cans : {
        type : [String],
    },
    noOfOpening : {
        type : Number,
    },
    description : {
        type : String,
    },
    candidates :{
        type : [String],
    },
});

const Job = models.Job ||  model("Job" , JobSchema);

export default Job;