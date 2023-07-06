require("dotenv").config()

const email_config = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD
    },
    tls:{
        rejectUnAuthorized: false
    }
}

module.exports = {email_config};