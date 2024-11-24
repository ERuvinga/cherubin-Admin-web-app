// nodemailer importing
const nodemailer = require("nodemailer");

// modelsusers 
const modelOfCounter = require("../Models/counter"); // import model of Counter
const modelOfNotification = require("../Models/Notification"); // import model of Notification

exports.saveEspDatas = (req, res) =>{
    const DatasOfForm = req.body;
    const reqDatas = req.query;
    console.log(DatasOfForm);
    console.log(reqDatas);

    res.status(200);
    res.json("Request received");
    // modelOfCounter.findOne({idCounter:DatasOfForm.idCounter}) // saving new objet in data base
    //     .then((Counterdatas)=> {
    //         if(Counterdatas){
    //             modelOfCounter.updateOne({idCounter:DatasOfForm.idCounter},{
    //                 $set:{
    //                     counterValue:Counterdatas.counterValue + DatasOfForm.valuePayed,
    //                     NewPayemet:true,
    //                 }
    //             })
    //             .then(()=>{
    //                 console.log(Counterdatas);
    //                 const newNotification = new modelOfNotification({
    //                     receiverId:Counterdatas.userId,
    //                     userId:Counterdatas.userId,
    //                     idCounter:DatasOfForm.idCounter,
    //                     message:`Nouvelle recharge de ${DatasOfForm.valuePayed} M3 effectué`
    //                 }); // created news user with datas of formulaire
                        
    //                 const newHistory = new modelOfHistory({
    //                     valuePayed:DatasOfForm.valuePayed,
    //                     clientId:Counterdatas.userId,
    //                     DealerId:DatasOfForm.idDealer,
    //                     idCounter:DatasOfForm.idCounter,
    //                 }); // created news user with datas of formulaire

    //                 newNotification.save(); // creation Notification
    //                 newHistory.save(); // creation Historique
    //                 res.status(200);
    //                 res.json({message: "'success': payement success"});
    //             })
            
    //             .catch((error)=>{
    //                 console.log(error);
    //                 res.status(500).json({msg:"Echec, Error Server"});
    //             })
    //         }

    //         else{
    //             console.log("identifiant introuvables");
    //             res.status(404);
    //             res.json({msg: "Echec: identifiants non trouvés"});
    //         }
            
    // })
    // .catch(error =>{
    //     console.log(error);
    //     res.status(501);
    //     res.json({msg: "Echec payement non effectuer"});
    // });
};