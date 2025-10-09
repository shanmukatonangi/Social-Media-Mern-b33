const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followings:{
        type:Array,
        default:[]
    },
    followers:{
        type:Array,
        default:[]
    },
    posts:{
        type:Array,
        default:[]
    },
    place:{
        country:{
            type:String,
            default:""
        },
        city:{
            type:String,
            default:""  
    }
},
    relationship:{
        type:Number,
        enum:[1,2,3],
    },
    bio:{
        type:String,
        max:50
    ,
},

age:{
    type:Date,
    default:null
    
}

})

module.exports=mongoose.model("User",userSchema);