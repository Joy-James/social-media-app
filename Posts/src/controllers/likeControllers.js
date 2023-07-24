

async function createLike (req, res) {
 
    try {
      let user=req.user
      const User_id=user.user.UserprofileID

   const { post_id,LikeCount} = req.body;
      const pool= req.pool
      if (pool.connected) {
        const request =  await pool.request()
          .input("post_id", post_id)
          .input("UserprofileID", User_id)
          .input("LikeCount", LikeCount)
          .execute("dbo.CreateLike");
  
        await request;
  
        res.json({
          success: true,
          message: "Like created successfully"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }



  async function checkLikeStatus(req, res) {
    try {
      const user = req.user;
      const user_id = user.user.UserprofileID;
      const { post_id } = req.params;
  
      // Create a pool connection to the database
      const pool = req.pool;
  
      if (pool.connected) {
        const request = pool.request()
          .input('post_id', post_id)
          .input('UserprofileID', user_id)
          .execute('CheckLikeStatus');
  
        const result = await request; // Capture the result of the stored procedure execution
  
        // Extract the 'liked' value from the result and send it as a JSON response
        const likeStatus = result.recordset[0].liked;
        res.json({ liked: likeStatus });
      }
    } catch (error) {
      console.error('Error checking like status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
   async function removeLike(req, res) {
    
    
    try {
     
      let user=req.user
      const User_id=user.user.UserprofileID
      const { post_id } = req.body;
      const pool = req.pool;
      if (pool.connected) {
      
        const likeCheckRequest = await pool.request()
          .input("post_id", post_id)
          .input("UserprofileID", User_id)
          .execute("dbo.CheckUserLike");
  
        const likeCheckResult = likeCheckRequest.recordset;
  
        if (likeCheckResult && likeCheckResult.length > 0) {
          const User_id= req.user.UserprofileID;

          const deleteRequest = await pool.request()
            .input("post_id", post_id)
            .input("UserprofileID", User_id)
            .execute("dbo.RemoveLike");
  
            await deleteRequest;
            

          res.json({
            success: true,
            message: "Like removed successfully"
          });
        } else {
      
          res.status(404).json({
            success: false,
            message: "Like not found"
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  

  module.exports={createLike, removeLike,checkLikeStatus}