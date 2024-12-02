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

    modelOfCounter.find() // saving new objet in data base
        .then((Counterdatas)=> {
            if(Counterdatas){

                const responseDatas ={
                    id:"",
                    isActive:"",
                    NewPayemet: "",
                    counterValue :""
                };
                for(i=0; i<Counterdatas.length; i++ ){
                    console.log(i);
                    console.log(Counterdatas[i]);
                    responseDatas.id = i == 0?`${Counterdatas[i].idCounter}`: `${responseDatas.id}~${Counterdatas[i].idCounter}`;
                    responseDatas.isActive =  i == 0 ?`${Counterdatas[i].isActive  == true? 1:0}`: `${responseDatas.isActive}~${Counterdatas[i].isActive  == true? 1:0}`;
                    responseDatas.NewPayemet =  i == 0 ?`${Counterdatas[i].NewPayemet == true? 1:0}`: `${responseDatas.NewPayemet}~${Counterdatas[i].NewPayemet  == true? 1:0}`;
                    responseDatas.counterValue =  i == 0 ?`${Counterdatas[i].counterValue}`: `${responseDatas.counterValue}~${Counterdatas[i].counterValue}`;
                }

                console.log({datas:responseDatas});
                    res.status(200);
                    res.json(responseDatas);
            }

            else{
                console.log("Aucun Compteur");
                res.status(404);
                res.json({msg: "Error"});
            }
            
    })
    .catch(error =>{
        console.log(error);
        console.log("Aucun Compteur");
        res.status(500);
        res.json({msg: "Error"});
    });
};