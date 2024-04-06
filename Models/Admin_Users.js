//Admin model datas of users

const mongoose = require("mongoose");
const UsersAdminShema = mongoose.Schema({
    name :{
        type:String,
        default:"ROOT User"
    },

    passWord:{
        type:String,
        default:""
    },

    
    email:{
        type:String,
        required:true,
        unique:true,
    },
    
});

module.exports = mongoose.model("admin", UsersAdminShema);
