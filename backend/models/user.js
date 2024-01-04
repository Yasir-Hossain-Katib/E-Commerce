const mongoose=require("mongoose");
const bcrypt = require("bcrypt");

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },

    userId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
    },
    isVerified: {
        type: Boolean,
        default: false, // You can set it to false by default
      },
});

// userSchema.pre('save',async function (next){
//     const user = this;

//     if(user.isModified("password") || user.isNew){
//         try{
//             const hashedPassword= await bcrypt.hash(user.password,10);
//             user.password=hashedPassword;
//             next();
//         }catch(error){
//             return next(error);
//         }
      
//     }else{
//         return next();
//     }
// });

// userSchema.methods.comparePassword = function (password) {
//     return bcrypt.compare(password,this.password);
// }

const User = mongoose.model("User",userSchema);

module.exports= User;
