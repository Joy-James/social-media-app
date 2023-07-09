const mssql = require('mssql');
const {config} = require('../config/config');




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
          message: "Friendship created successfully"
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
          // No rows affected, friendship with the given friendship ID doesn't exist
          res.status(404).json({
            success: false,
            message: "Friendship not found"
          });
        } else {
          // Friendship updated successfully
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
  
  module.exports={createFriendship, updateFriendship}