//Logical Methods for Login and registers routers

//Models
const modelOfUsers = require("../../Models/Users"); // import model of students user

//Lib
require("dotenv").config();
const bcrypt = require("bcrypt"); // salting password Methode
const jwt = require("jsonwebtoken");
const SALTE_PWD = 10;

exports.login = (req, res) => {
    const messageInactifAccount = "Ce Compte n'est pas encore Activé";
    // cheking type of Account
    modelOfUsers.findOne({$or:[{email:req.body.email},{tel:req.body.email}]})
            .then(userFund =>{
                if(userFund === null){
                    res.status(401).json({msg:"Aucun Utilisateur Trouvé avec ces Identités"}) 
                }

                else{
                    if(userFund.stateAccount){
                        bcrypt.compare(req.body.passWord, userFund.passWord)
                        .then(valid =>{
                            if(!valid){
                                res.status(401).json({msg:"email, Tel ou mot de pass d'utilisateur Incorrect"})  
                            }

                            else{
                            const Token = jwt.sign({
                                    idUser:userFund._id,
                                    mail:userFund.email,
                                },process.env.TOKEN_SIGN);
                                res.status(200).json({msg:"Utilisateur trouvé", Token, DataUser:userFund, typeAccount:userFund.typeAccount});
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).json({msg:"Error Server Token"})
                        }
                            )
                    }

                    else{
                        res.status(401).json({msg:messageInactifAccount})
                    }  
                }
            })
            .catch(error =>{
                 console.log(`Error Database ${error}`) // if Error  Connexion to dataBase
                 res.status(500).json({msg:"Erreur server"}) 
              });
};

exports.Activation_account = (req, res) => {
    const idUser = req.body.matricule.split("_")[1]; //cup IdUser in matricule
    // SEARCHING uSER IN DATABASE
        try{
            modelOfUsers.findOne({_id:idUser})
            .then(userFund =>{
                if(userFund){
                    if(userFund.stateAccount){
                        res.status(403).json({msg:"Votre Compte est deja Activé, Connectez-vous!", Updating:false, actif:true});
                    }
                    else{
                        // hashing PassWord
                        bcrypt.hash(req.body.passWord, SALTE_PWD)
                        .then(passwordHash =>{
                            modelOfUsers.updateOne({_id:idUser},{
                                $set:{
                                    passWord:passwordHash,
                                    stateAccount: true  
                                }
                            })
                            .then(()=>{
                                res.status(200).json({msg:"Activation du compte Reussi", Updating:true, actif:true});
                            })
        
                            .catch((error)=>{
                                console.log(error);
                                res.status(500).json({msg:"Activation echouée, Error Server"});
                            })  
                        })
                        .catch(error => {
                            console.log(`Erreur lors du hashing du password \n ${error}`)
                            res.status(500).json({msg:"Impossible d'activer le compte -> Error Server lors du hashing du password"});
                        });
                   }
                }
                else{
                        console.log("aucun Compte Correspondant");
                        res.status(404).json({msg:"Desolé: Votre Matricule ne correspond à aucun compte!"});                        
                }
            })
            .catch(error =>{
                console.log(error)
                res.status(500).json({msg:"Error Server"});
            })
        }
        catch{(error)=>{
            console.log(error);
            res.status(500).json({msg:"Error Server"});
        }}
    }

    exports.HashingPassWord = (req, res) => {
       // hashing PassWord
       bcrypt.hash("Eliasone02@", SALTE_PWD)
       .then(passwordHash =>{
        console.log(passwordHash);
        res.status(200).json({passwordHash});
           })
           
       .catch(error => {
           console.log(`Erreur lors du hashing du password \n ${error}`)
           res.status(500).json({msg:"Impossible d'activer le compte -> Error Server lors du hashing du password"});
       });
        }  

//Register New User

exports.registerNewUser = (req, res) =>{
    const DatasOfForm = req.body;
    const formData = {
        name:"Elie Ruvinga",
        email:"ruvingaelie@gmail.com",
        tel:"+243973668210"
    };

    const newUser = new modelOfUsers(formData); // created news student with datas of formulaire
    newUser.save() // saving new objet in data base
    .then((datas)=> {
        res.status(200);
        res.json({message: "'success': New User created"});

        // Send a email message to news student, content matricule _id
        console.log(datas);
    })
    .catch(error =>{
        console.log(error);
        res.status(500);
        res.json({message: "Error Server"});
    });
};