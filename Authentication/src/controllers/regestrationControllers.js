const session = require('express-session')
const bcrypt = require('bcrypt');
const { newUserValidator } = require('../validators/newUserValidator')
const { sendMail } = require('../utils/sendMail');
const { getUserByUsername } = require('../utils/getUser');
const { listenerCount } = require('nodemailer/lib/xoauth2');





module.exports = {

  postUser: async (req, res) => {
    console.log(req.headers.cookie)
    try {
      let user = req.body;
      const pool = req.pool
      let hashedPwd = await bcrypt.hash(user.password, 8);

      let { value } = newUserValidator(user)



      if (pool.connected) {

        const checkUserRequest = await pool.request()
          .input("username", value.username)
          .input("email", value.email)
          .execute("dbo.CheckUserExistence");

        const userExists = checkUserRequest.recordset[0].userExists;

        if (userExists) {
          res.status(400).json({
            success: false,
            message: "Username or email already exists"
          });
        } else {

          const createUserRequest = await pool.request()
            .input("full_name", value.full_name)
            .input("username", value.username)
            .input("email", value.email)
            .input("city", value.city)
            .input("password", hashedPwd)
            .execute("dbo.CreateUser");

          console.log(createUserRequest);

          try {
            await sendMail(user.email, user.full_name);
          } catch {
            console.log("Error sending email");
          }

          res.json({
            success: true,
            message: "User created successfully"
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },


  loginUser: async (req, res) => {
    // console.log(req.session)

    const { username, password } = req.body;
    console.log(username, password);
    if (username && password) {

      const { pool } = req;

      try {
        let user = await getUserByUsername(username, pool)

        if (user) {
          let password_match = await bcrypt.compare(password, user.password)
          if (password_match) {

            req.session.authorized = true;
            req.session.user = user
            


            res.json({ success: true, message: "logged in successfully" })
          } else {
            res.status(401).json({ success: false, message: "wrong credentials" })
          }

        } else {
          res.status(404).json({ success: false, message: "No user found" })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }




}
