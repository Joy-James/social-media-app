const joi =require ('joi');


const new_User_Schema=joi.object({
    full_name: joi.string()
            .min(3)
            .required(),
  username:joi.string()
             .required()
             .min(5)
             .max(30),

email:joi.string() 
            .required(),
  city:joi.string()
         .required(),         
  password: joi.string()
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))  ,
 confirm_password: joi.ref('password')            
}).with('password','confirm_password')
module.exports={new_User_Schema}