const mongoose= require("mongoose");
const colors= require("colors");

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to DB ${mongoose.connection.host}`);
    }
    catch(error){
        console.log(`MongoDB Error ${error}`);
    }

};
module.exports=connectDB;