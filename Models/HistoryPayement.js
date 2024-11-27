//Admin model datas of users

const mongoose = require("mongoose");
const PayementHistoryShema = mongoose.Schema({
    valuePayed:{
        type:Number,
        required:true
    },
    clientId:{
        type:String,
        required:true
    },
    DealerId:{
        type:String,
        required:true
    },
    idCounter:{
        type:Number,
        required:true
    },
    createAt:{
        type:Number,
        default:Date.now()
    },
});

module.exports = mongoose.model("HistoryPayement", PayementHistoryShema);
