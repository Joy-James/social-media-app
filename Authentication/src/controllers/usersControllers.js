const mssql=require('mssql')
const {config }=require('../config/config');
const session=require('express-session')
 async function getAllUsers(req,  res) {
    let sql=await mssql.connect(config)
    if(sql.connected){
    let results=await sql.query(`SELECT * FROM dbo.Userprofile`)
   let UserProfile = results.recordset;
    res.json({
        success:true,
        message:"Fetched all our users succesfully",
        results:UserProfile
    })
    }else{
        res.status(500).send("Internal server error")
    }
  
}


async function getUserById(req, res) {
    try {
      let { UserprofileID} = req.params;
      let sql = await mssql.connect(config);
      if (sql.connected) {
        if (sql.connected) {
          let results = sql.request()
            .input('UserprofileID', UserprofileID)
            .execute('dbo.GetUserById');
       
          let user = (await results).recordset[0]
          
   
          if (user) {
            res.json({
              success: true,
              message: 'User with id ' +UserprofileID + ' fetched successfully',
              results: user
            })
          } else {
            res.json({
              success: false,
              message: 'UserID does not exist'
            })
          }
  
        } else {
          res.status(500).send("Internal server error");
        }
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Invalid User ID'
      })
    }
  }


  async function getUserByUsername(req, res) {
    try {
      let { username} = req.params;
      let sql = await mssql.connect(config);
      if (sql.connected) {
        if (sql.connected) {
          let results = sql.request()
            .input('username', username)
            .execute('dbo.GetUserByUsername')
          let user = (await results).recordset[0]
  
          if (user) {
            res.json({
              success: true,
              message: 'username ' +username+ ' fetched successfully',
              results: user
            })
          } else {
            res.json({
              success: false,
              message: 'Username does not exist'
            })
          }
  
        } else {
          res.status(500).send("Internal server error");
        }
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Invalid Username'
      })
    }
  }


module.exports={
    Home:(req,res) =>{
      console.log(req.session)
   const authorized=req.session?.authorized;
   if(authorized){
    res.send(' Welcome to BUDDEE')
   }else{
    res.status(401).json({
      message: 'Login to access buddie',
      success:false
    })
   }
    },
    
    getAllUsers,getUserById, getUserByUsername}