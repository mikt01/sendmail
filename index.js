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
    let date = req.body.date
    let date2 = req.body.date2
    // email = "duygudemirpence@gmail.com"

    // Mail içeriği
    const mailOptions = {
        from: process.env.MAIL,
        to: email,
        subject: title + '' + date + '-' + '' + date2,
        text: "Hello! Is this offer still available? What is the price? What are the loading times?"
    };
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: user_email,
            pass: user_app_pass
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

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Please enter your email: ', (email) => {
            rl.question('Please enter your password: ', (password) => {
                user_email = email;
                user_app_pass = password;
                console.log(`Email: ${email}, Password: ${password}`);
                // rl.close();
                // process.exit(); // prompt kapatılıyor

            });
        });
    }
})
// mdpjrjgcdjedxvdc
