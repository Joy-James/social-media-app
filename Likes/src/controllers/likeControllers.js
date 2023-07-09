async function createLike (req, res) {
    try {
      const { post_id, UserprofileID} = req.body;
      const pool= req.pool
      if (pool.connected) {
        const request = pool.request()
          .input("post_id", post_id)
          .input("UserprofileID", UserprofileID)
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

   async function removeLike(req, res) {
    try {
      const { post_id, UserprofileID } = req.body;
      const pool = req.pool;
      if (pool.connected) {
        // Check if the like exists
        const likeCheckRequest = await pool.request()
          .input("post_id", post_id)
          .input("UserprofileID", UserprofileID)
          .execute("dbo.CheckLike");
  
        const likeCheckResult = likeCheckRequest.recordset;
  
        if (likeCheckResult && likeCheckResult.length > 0) {
          // Delete the like record
          const deleteRequest = await pool.request()
            .input("post_id", post_id)
            .input("UserprofileID", UserprofileID)
            .execute("dbo.RemoveLike");
  
          res.json({
            success: true,
            message: "Like removed successfully"
          });
        } else {
          // Like does not exist
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
  

  module.exports={createLike, removeLike}