const express=require('express');
const app=express();
const mongoose=require('mongoose');
const User=require('./models/usermodel.js');

app.use(express.json());


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://b33:b33@cluster0.hjjh1zi.mongodb.net/',console.log("Connected to MongoDB"));

  
}

app.post("/api/users/register",async(req,res)=>{
    try{
        const newUser=await new User(req.body).save();
       res.status(200).json(newUser);
    }catch(err){
        res.status(500).json(err);
    }
  
}   
)

//mongodb+srv://b33:b33@cluster0.hjjh1zi.mongodb.net/

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})
