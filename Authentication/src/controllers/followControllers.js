




 async function createFriendship (req, res) {
    try {
      const { UserprofileID, friend_id, status } = req.body;
      const pool= req.pool
      if (pool.connected) {
        const request = pool.request()
          .input("friend_id", friend_id)
          .input("UserprofileID", UserprofileID)
          .input("status", status)
          .execute("dbo.CreateFriendship");
  
        await request;
  
        res.json({
          success: true,
          message: "Friendship request sent"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }



  async function updateFriendship  (req, res)  {
    try {
      const { friendship_id, status } = req.body;
      const pool= req.pool
      if (pool.connected) {
        const request = pool.request()
          .input("friendship_id", friendship_id)
          .input("status", status)
          .execute("dbo.UpdateFriendshipStatus");
  
        const result = await request;
        const rowsAffected = result.rowsAffected[0];
  
        if (rowsAffected === 0) {
        
          res.status(404).json({
            success: false,
            message: "Friendship not found"
          });
        } else {
      
          res.json({
            success: true,
            message: "Friendship updated successfully"
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }


  async function unfriend (req, res)  {
 
    try {
      const { friendshipId } = req.body;
      const pool= req.pool
      if (pool.connected) {
        const request = pool.request()
          .input("friendshipId", friendshipId)
          .execute("dbo.Unfriend");
  
        const result = await request;
        const rowsAffected = result.rowsAffected[0];
  
        if (rowsAffected === 0) {
         
          res.status(404).json({
            success: false,
            message: "Friendship not found"
          });
        } else {
        
          res.json({
            success: true,
            message: "Friendship removed successfully"
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  
  module.exports={createFriendship, updateFriendship,  unfriend }