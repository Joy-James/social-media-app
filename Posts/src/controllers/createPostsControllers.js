const mssql = require('mssql');
const {config} = require('../config/config');
const { newPostValidator } = require('../validators/newPostValidator')


async function createPost(req, res) {
    const book = req.body;
    try {
      let { value } = newPostValidator(book)
      let sql = await mssql.connect(config);
      if (sql.connected) {
        let createPostResult = await sql.request()
          .input('UserprofileID', value.UserprofileID)
          .input('imageUrl',  value.imageUrl)
          .input('content', value.content)
          .execute('dbo.CreatePost');
  
        let getPostsResult = await sql.request().query('SELECT * FROM dbo.Posts');
  
        console.log(createPostResult);
        console.log(getPostsResult.recordset);
  
        createPostResult.rowsAffected ? res.status(200).send({
          success: true,
          message: "post created successfully"
        })
          : res.status(500).send({ success: false, message: 'An error occured. Try again!' });
      }
    } catch (error) {
      res.send(error.message);
    }
}

   async  function updatePost (req, res)  {
        try {
          let { post_id,imageUrl, content } = req.body;
          let sql = await mssql.connect(config);
          if (sql.connected) {
            let results = await sql.request()
              .input("post_id", post_id)
              .input("imageUrl",imageUrl)
              .input("content", content)
              .execute("dbo.UpdatePost");
      
            res.json({
              success: true,
              message: "Post updated successfully",
              results: results.rowsAffected
            });
          }
        } catch (error) {
          console.error("Error:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
      
      async function deletePost (req, res)  {
        try {
          let { post_id } = req.body;
          let sql = await mssql.connect(config);
          if (sql.connected) {
        
            let checkPostQuery = await sql.request()
              .input("post_id", post_id)
              .query("SELECT COUNT(*) AS count FROM Posts WHERE post_id = @post_id");
      
            if (checkPostQuery.recordset[0].count === 0) {
      
              res.status(404).json({
                success: false,
                message: "Post not found"
              });
            } else {
            
              let deleteRequest = sql.request()
                .input("post_id", post_id)
                .execute("dbo.DeletePost");
      
              let deleteResult = await deleteRequest;
              let rowsAffected = deleteResult.rowsAffected[0];
      
              if (rowsAffected === 0) {
             
                res.status(500).json({
                  success: false,
                  message: "Failed to delete post"
                });
              } else {
            
                res.json({
                  success: true,
                  message: "Post deleted successfully"
                });
              }
            }
          }
        } catch (error) {
          console.error("Error:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
      
      
  
  module.exports={createPost, updatePost,deletePost}