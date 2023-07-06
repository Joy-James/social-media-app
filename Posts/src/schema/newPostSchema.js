const  joi =require('joi')

const new_Post_Schema=joi.object({
    
    UserprofileID:joi.number() .required(),
       imageUrl:joi.string()
                 .required(),
          content:joi.string()
                    .required(),
          
}) 

    module.exports={new_Post_Schema};