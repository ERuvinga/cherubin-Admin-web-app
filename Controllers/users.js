// nodemailer importing
const nodemailer = require("nodemailer");

// modelsusers 
const modelOfUsers = require("../Models/Users"); // import model of Users
const modelOfCounter = require("../Models/counter"); // import model of Counter

// controller Check Auth user
exports.deleteUser =(req, res)=>{
        //search user in dataBase
        console.log(req.params);
        modelOfUsers.deleteOne({_id:req.params.id})
        .then(() =>{

            // delete counter datas
            modelOfCounter.deleteOne({userId:req.params.id})
            .then(datas=>{
                console.log("user and counter deleted");
                res.status(200).json("user Deleted");
            })
            
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({error});
        })        
};

// controller Check Auth user
exports.logout =(req, res)=>{
    //search user in dataBase
    console.log(req.body);
    modelOfUsers.updateOne({_id:req.body.id},{
        $set:{
            socketID:null
        }
    })
    .then(()=>{
        console.log("user Logout")
        res.status(200).json({msg:"User Logout"});
    })

    .catch((error)=>{
        console.log(error);
        res.status(500).json({msg:"Deconnexion echouée, Error Server"});
    })
};

exports.getAllUsers =(req, res)=>{

    //Querry datas
    const parameters = req.params;
    const query = req.query;

    //type of Filter datas
    const status ={
        ALL:"ALL",
        ACTIVE:"ACTIVE",
        DESACTIVE:"DESACTIVE",
    }
    
    //filter datas
    const filter ={
        useRole:parameters.useRole
    }

    // check status filter
    switch(parameters.status){
        case status.ACTIVE:{
            filter.isActive = true;
            break;
        };
        case status.DESACTIVE:{
            filter.isActive = false;
            break;
        };
        default:{
            console.log("Return all datas");
        }
    }
    console.log(parameters);
    console.log(query);

        //if Keyword content value
        if(query.keyword){
                modelOfUsers.find(
                    {$text: {$search: query.keyword, $language: "fr" }}, 
                    {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
                .then(userFund =>{
                        res.status(200).json({msg:"Tout les utilisateurs du reseau", AllUsers:userFund});
                    
                })
                .catch(error =>{
                    console.log(error);
                    res.status(500).json({error});
                }) 
            }

        else{
        //search AllStudents in dataBase
        modelOfUsers.find(filter)
        .then(userFund =>{
                res.status(200).json({msg:"Tout les utilisateurs du reseau", AllUsers:userFund});
            
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({error});
        }) 
        }
          
};


exports.getLocators =(req, res)=>{
    //Querry datas
    const query = req.query;
    console.log(query);

    //type of Filter datas
    const status ={
        ALL:"ALL",
        ACTIVE:"ACTIVE",
        DESACTIVE:"DESACTIVE",
    }
    
    //filter datas
    const filter ={
        useRole:query.useRole,
    }

    // check if idminId is defined
    if(query.userId){
        filter._id = query.userId
    }
    
    // check if idminId is defined
    if(query.adminId){
        filter.adminID = query.adminId
    }
    // check status filter
    switch(query.status){
        case status.ACTIVE:{
            filter.isActive = true;
            break;
        };
        case status.DESACTIVE:{
            filter.isActive = false;
            break;
        };
        default:{
            console.log("Return all datas");
        }
    }
        modelOfUsers.find(filter)
        .then(userFund =>{
                res.status(200).json({msg:"Tout les utilisateurs du reseau", AllUsers:userFund});
            
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({error});
        })
          
};


exports.NewAppartement = (req, res) =>{
    const DatasOfForm = req.body;
    console.log(DatasOfForm);

    // create Transport of nodemail
    const transport = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD
        }
    }) 

    const newUser = new modelOfUsers(DatasOfForm); // created news user with datas of formulaire
    newUser.save() // saving new objet in data base
        .then((Userdatas)=> {
            console.log(Userdatas);
            const newCounter = new modelOfCounter({
                email:DatasOfForm.email,
                userId:Userdatas._id,
                idCounter:DatasOfForm.idCounter,
            }); // created news user with datas of formulaire
                
            newCounter.save()
            .then((datas)=>{
                    console.log(datas);
                    res.status(200);
                    res.json({message: "'success': New User created"});
                    // option of sending mail
                    let mailOptions ={
                        from:process.env.EMAIL_USER,
                        to:DatasOfForm.email,
                        subject:"Creation de compte reussi, Bienvenu sur la plaforme de gestion efficace d'eau",
                        text:`Cher(e) ${DatasOfForm.fname} ${DatasOfForm.lname},Bienvenue chez SMART METER.`,
                    };

                        // Send a email message to user
                    transport.sendMail(mailOptions,(error, infos)=>{
                            if(error){
                            return console.log(`Error : ${error}`);
                            };
                    console.log(`Message sending ${infos}`)
                });
            })
            .catch(error =>{
                console.log(error);
                modelOfUsers.deleteOne({_id:Userdatas._id})
                .then(user => {
                    console.log(user);
                })
                .catch(error=> console.log(error));

                res.status(501);
                res.json({msg: "Echec de la creation: id du compteur existant"});
            });  
    })
    .catch(error =>{
        console.log(error);
        res.status(501);
        res.json({msg: "Echec de la creation: email ou tel existant"});
    });
};