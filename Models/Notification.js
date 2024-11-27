//Admin model datas of users

const mongoose = require("mongoose");
const NotificationShema = mongoose.Schema({
    receiverId:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    idCounter:{
        type:Number,
        required:true
    },
});

module.exports = mongoose.model("notification", NotificationShema);
