const express=require('express');
const app=express();
const mongoose=require('mongoose');
const User=require('./models/usermodel.js');
const cors=require('cors');

app.use(cors());

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


app.post("/api/users/login",async(req,res)=>{
    try{
        let user=await User.findOne({email:req.body.email});

        if(!user) return res.status(404).json("User not found");
        if(user.password!==req.body.password) return res.status(400).json("Wrong password");
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }
})
//mongodb+srv://b33:b33@cluster0.hjjh1zi.mongodb.net/

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})
