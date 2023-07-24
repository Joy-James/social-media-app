const joi = require('joi')

const new_Post_Schema = joi.object({

     
    imageUrl: joi.string(),
    content: joi.string(),

})

module.exports = { new_Post_Schema };