const mssql = require('mssql');
const {config} = require('../config/config');



async function createComment  (req, res)  {
    try {
      const { post_id, UserprofileID, comment } = req.body;
      const sql = await mssql.connect(config);
      if (sql.connected) {
        const request = sql.request()
          .input("post_id", post_id)
          .input("UserprofileID", UserprofileID)
          .input("comment", comment)
          .execute("dbo.CreateComment");
  
        await request;
  
        res.json({
          success: true,
          message: "Comment created successfully"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async function updateComment (req, res)  {
    try {
      const { post_id, comment_id, comment } = req.body;
      const sql = await mssql.connect(config);
      if (sql.connected) {
        const request = sql.request()
          .input("post_id", post_id)
          .input("comment_id", comment_id)
          .input("comment", comment)
          .execute("dbo.UpdateComment");
  
        const result = await request;
        const rowsAffected = result.rowsAffected[0];
  
        if (rowsAffected === 0) {
          // No rows affected, comment with the given post ID and comment ID doesn't exist
          res.status(404).json({
            success: false,
            message: "Comment not found"
          });
        } else {
          // Comment updated successfully
          res.json({
            success: true,
            message: "Comment updated successfully"
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

 async function  deleteComment (req, res)  {
    try {
      const { post_id, comment_id } = req.body;
      const sql = await mssql.connect(config);
      if (sql.connected) {
        const request = sql.request()
          .input("post_id", post_id)
          .input("comment_id", comment_id)
          .execute("dbo.DeleteComment");
  
        const result = await request;
        const rowsAffected = result.rowsAffected[0];
  
        if (rowsAffected === 0) {
         
          res.status(404).json({
            success: false,
            message: "Comment not found"
          });
        } else {
     
          res.json({
            success: true,
            message: "Comment deleted successfully"
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  
  
  module.exports={createComment, updateComment, deleteComment}