const session = require('express-session')
const {config} = require('../config/config');
const mssql = require('mssql');
const bcrypt = require('bcrypt');
const{ newUserValidator}=require('../validators/newUserValidator')
const { getUserById}=require('../utils/getUser')



module.exports = {
  
  postUser: async (req, res) => {
    console.log(req.cookie)
    try {
      let user = req.body;
      let hashedPwd = await bcrypt.hash(user.password, 8);

      let {value} = newUserValidator(user)
      let sql = await mssql.connect(config);
      if (sql.connected) {
        let results = await sql.request()
          .input("full_name", value.full_name)
          .input("username", value.username)
          .input("email", value.email)
          .input("city", value.city)
          .input("password", hashedPwd)
          .execute("dbo.CreateUser");

        console.log(results);
        try {
          await sendMail(user.email, user.full_name);
        } catch {
          console.log("error");
        }
        res.json({
          success: true,
          message: "User created successfully",
          results: results.recordsets[0]
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },


  loginUser: async (req, res) => {

    const{UserProfileID, password} =req.body;
    console.log(UserProfileID,password);
    if(UserProfileID && password){
        req.session.authorized = true;
        req.session.user=UserProfileID
    }

    res.json(req.session)}
  //   let { UserProfileID, password } = req.body;
 
  //   try {
  //     let user = await getUserById(UserProfileID);
  //     if (user) {
  //       let passwordMatch = await bcrypt.compare(password, user.password);
  //       if (passwordMatch) {
  //         // let token = await tokenGenerator({
  //         //   UserProfileID: user.UserProfileID
          
  //         // });

  //         res.json({
  //           success: true,
  //           message: "Logged in Successfully",
          
  //         });
  //       } else {
  //         res.status(401).json({
  //           success: false,
  //           message: "Wrong credentials"
  //         });
  //       }
  //     } else {
  //       res.status(404).json({
  //         success: false,
  //         message: "No user found"
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // }
};
