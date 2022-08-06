 const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/test").then(()=>{
console.log("connection is successful with db");
}).catch((e)=>{
    console.log("connection is unsuccessful with db");
    console.log(e);
})