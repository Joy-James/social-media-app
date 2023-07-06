const { new_Post_Schema} =require('../schema/newPostSchema')


function newPostValidator(body) {
    let post= new_Post_Schema.validate(body,{abortEarly: false})
    if (post.error?.details.length){
        let message=post.error.details.map(err=>err.message)

        throw new Error(message.join("\n"))
    }else{
        return post
    }
    
}
module.exports={newPostValidator}