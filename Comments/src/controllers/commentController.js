const mssql = require('mssql');
const {config} = require('../config/config');


 async function getCommentById (req, res)  {
    try {
      const { post_id, comment_id } = req.body;
      const sql = await mssql.connect(config);
      if (sql.connected) {
        const request = sql.request()
          .input("post_id", post_id)
          .input("comment_id", comment_id)
          .execute("dbo.GetCommentById");
  
        const result = await request;
        const comment = result.recordset[0];
  
        if (!comment) {
          // Comment with the given post ID and comment ID doesn't exist
          res.status(404).json({
            success: false,
            message: "Comment not found"
          });
        } else {
          // Comment found
          res.json({
            success: true,
            message: "Comment retrieved successfully",
            comment
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  module.exports={getCommentById }