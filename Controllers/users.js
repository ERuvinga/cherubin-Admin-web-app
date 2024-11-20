
// modelsusers 
const modelOfUsers = require("../Models/Users"); // import model of students user

// controller Check Auth user
exports.deleteUser =(req, res)=>{
        //search user in dataBase
        console.log(req.params);
        modelOfUsers.deleteOne({_id:req.params.id})
        .then((userFund) =>{
            console.log("user deleted");
            res.status(200).json("user Deleted");
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({error});
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


exports.NewUser =(req, res)=>{
    modelOfUsers.find({idOfAdmin: req.Autorization.userId})
    .then(userFund =>{
        const formDatas ={
            email:req.body.email,
            tel:req.body.tel,
            name:`${req.body.SecondeName} ${req.body.name}`,
            idOfAdmin:req.Autorization.userId,
            idCompteur:userFund.length+1
        }
        //create new user in dataBase
        const user = new modelOfUsers(formDatas)
        user.save()
        .then(() =>{
                res.status(200).json({msg:"Creation d'utilisateur reussit"});
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({msg:"cet adresse mail ou cet numero existe deja dans la base de donnee, veuillez rensignez un autre!"});
        }) 
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({msg: "Error server"});
    });
       
};
