// !Load environment Variables
require('dotenv').config();
const mongoose=require("mongoose");
// ! Creating Connection To mongodb
mongoose.set('strictQuery', false);
const CONNECT=async()=>{
  
    try {
        
        await mongoose.connect(process.env.DB_URL);
        console.log("DB CONNECTING....⌛");
        console.log("DB CONNECTED........⌛⏳");
       
    } catch(error)  {
        console.log(error);
    }
   
}

module.exports=CONNECT;