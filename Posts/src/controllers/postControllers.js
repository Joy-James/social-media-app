

const { newPostValidator } = require('../validators/newPostValidator')


async function getPostById (req, res)  {
    try {
      const { post_id } = req.params;
      const pool = req.pool;
 
      if (pool.connected) {
        const request = pool.request()
          .input("post_id", post_id)
          .execute("dbo.GetPostById");
  
        const result = await request;
        const post = result.recordset[0];
  
        if (!post) {
      
          res.status(404).json({
            success: false,
            message: "Post not found"
          });
        } else {
     
          res.json({
            success: true,
            message: "Post retrieved successfully",
            post
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }


  async function getAllPosts (req, res)  {
    try {
      
      const pool = req.pool;
    
      if (pool.connected) {
        const request = pool.request()
          .query("SELECT * FROM Posts");
  
        const result = await request;
        const posts = result.recordset;
  
        res.json({
          success: true,
          message: "Posts retrieved successfully",
          posts
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async function getSpecificUserPosts(req, res) {
    try {
      const user_id = req.session.user.UserprofileID
  
      
  
      const pool = req.pool;
      if (pool.connected) {
  
        const postsRequest = await pool.request()
          .input("UserprofileID", user_id)
          .execute("dbo.getUsersPosts");
  
        const userPosts = postsRequest.recordset;
  
        res.json({
          success: true,
          message: "User posts retrieved successfully",
          userPosts
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  



async function createPost(req, res) {
    const post = req.body;
    try {
      
      const pool = req.pool;
      let user=req.user
      const user_id=user.user.UserprofileID
  
      let { value } = newPostValidator(post)
    
      if (pool.connected) {
        let createPostResult = await pool.request()
          .input('UserprofileID',user_id)
          .input('imageUrl',  value.imageUrl)
          .input('content', value.content)
          .execute('dbo.CreatePost');
  
        // let getPostsResult = await sql.request().query('SELECT * FROM dbo.Posts');
  
        // console.log(createPostResult);
        // console.log(getPostsResult.recordset);
  
        createPostResult.rowsAffected ? res.status(200).send({
          success: true,
          message: "post created successfully"
        })
          : res.status(500).send({ success: false, message: 'An error occured. Try again!' });
      }
    } catch (error) {
      console.log(error)
      res.send(error.message);
    }
}

   async  function updatePost (req, res)  {
        try {
          let { post_id,imageUrl, content } = req.body;
          const pool = req.pool;
          if (pool.connected) {
            let results = await pool.request()
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

          let { post_id } = req.params;
          const pool = req.pool;
          if (pool.connected) {
        
            let checkPostQuery = await  pool.request()
              .input("post_id", post_id)
              .query("SELECT COUNT(*) AS count FROM Posts WHERE post_id = @post_id");
      
            if (checkPostQuery.recordset[0].count === 0) {
      
              res.status(404).json({
                success: false,
                message: "Post not found"
              });
            } else {
            
              let deleteRequest = pool.request()
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
      
      
  

  
  
  
  
  module.exports={getPostById, getAllPosts,getSpecificUserPosts,createPost, updatePost,deletePost}