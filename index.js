const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})


'use strict';
const nodemailer = require("nodemailer");

async function main() {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTansport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports

        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        },
    });

    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       type: 'OAuth2',
    //       user: process.env.MAIL_USERNAME,
    //       pass: process.env.MAIL_PASSWORD,
    //       clientId: process.env.OAUTH_CLIENTID,
    //       clientSecret: process.env.OAUTH_CLIENT_SECRET,
    //       refreshToken: process.env.OAUTH_REFRESH_TOKEN
    //     }
    // });

    //send email with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello World', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    });

    console.log("Message sent: %s", info.messageId);

    //preview only
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    //preview url: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);