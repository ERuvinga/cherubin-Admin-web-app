
const jwt = require("jsonwebtoken");

// modelsusers 
const modelUser = require("../../Models/Users"); // import model of  user

// controller Check Auth user
exports.CheckAutorizationUser =(req, res, next)=>{
    let token = req.headers.autorization;
    token = token.split(" ")[1];

    try{
        // verify validity token 
        const DataOfToken = jwt.verify(token, process.env.TOKEN_SIGN);

        // search user in dataBase
        modelUser.findOne({_id:DataOfToken.idUser})
        .then(userFund =>{
                req.Autorization ={
                    userId : userFund._id.toString(),
                    typeAccount:userFund.typeAccount,
                    AdminId:userFund.idOfAdmin,
                }
            next();
        })
        .catch(error =>{
            console.log(error);
            res.status(401).json({error});
        })
    }
    catch(error){
        console.log(error.message);
        res.status(401).json({error});
    };
};