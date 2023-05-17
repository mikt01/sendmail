const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cors = require("cors"); //this is a library to config easily cors
const readline = require('readline');

require('dotenv').config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())    
app.use(cors({ origin: true })); // enable origin cors

var user_email = ""
var user_app_pass = ""


app.post("/send-mail",(req,res)=>{
    console.log("Request get")
    let email = req.body.email
    let title = req.body.title
    let text  = req.body.text
    let date = req.body.date
    let date2 = req.body.date2
    let user_mail = req.body.user_mail
    let user_pass = req.body.user_pass
    console.log(user_mail,user_pass)
    // email = "duygudemirpence@gmail.com"

    // Mail içeriği
    const mailOptions = {
        from: process.env.MAIL,
        to: email,
        subject: (title) + ' ' + (date) + ' - ' + (date2),
        text: text
        };
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: user_mail,
            pass: user_pass
        }
    });

    // Mail gönderme işlemi
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Sended ' + info.response);
        }
    });

})


const server = app.listen(process.env.PORT || 3000 ,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Port Started. Port number %d: ", server.address().port);

   
        
    }
})
