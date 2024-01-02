const nodemailer = require('nodemailer');

exports.sendEmail =async(req,res)=>{
    const  {to,subject,body} = req.body;

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"yasirkatib00@gmail.com",
            pass: 'myne qhkx kbbh uoyz',
        },
    });

    const mailOptions = {
        from :"yasirkatib00@gmail.com",
        to,
        subject,
        text:body,
    };

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error("error sending mail",error);
            res.status(500).send("internet server error");
        } else{
            console.log("email sent:",info.response);
            res.status(200).send("email sent successfully");
        }
    });
}