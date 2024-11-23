//Counter model datas of users

const mongoose = require("mongoose");
const CounterShema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    socketId:{
        type:String,
        default:null
    },
    userId:{
        type:String,
        required:true
    },

    idCounter:{
        type:Number,
        unique:true,
        required:true
    },
    newPayement:{
        type:Number,
        default:null
    },
    counterValue:{
        type:Number,
        default:null
    },
    speedCounter:{
        type:Number,
        default:null
    },
    isActive:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model("counter", CounterShema);
