import {Schema , model , models} from 'mongoose';

const UserSchema = new Schema({
    email:{
        type:String,
        required : [true , 'Email is required!'],
        unique: [true , 'Email already exists!'],
    },
    name :{
        type : String,
        required :[true , 'name is required!'],
    },
    image : {
        type :String
    },
    candidateUserName : {
        type : String,
    },
    type : {
        type : String,
    },
    skills : {
        type : Array,
    },
    address : {
        type : String,
    },
    contact : {
        type : String,
    },
    education : {
        type : String,
    },
    catagory : {
        type : String,
    },
    profession : {
        type : String,
    },
    applied : {
        type : Array,
    },
    posted : {
        type : Array,
    },
    companyName : {
        type : String,
    },
    companyUserName : {
        type : String,
    },
    about : {
        type : String,
    },
    webSite : {
        type : String,
    },
    startDate : {
        type : Date,
    },
    hired : {
        type : Number,
    }
});

const User = models.User ||  model("User" , UserSchema);

export default User;