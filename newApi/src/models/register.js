const mongoose=require("mongoose");
const validation=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:Number,
        required:true,
        unique:true
    }
});
const studentRegister=new mongoose.model("StudentRegistration",validation);
module.exports=studentRegister;