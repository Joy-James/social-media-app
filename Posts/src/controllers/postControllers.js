const mssql = require('mssql');
const {config} = require('../config/config');


async function getPostById (req, res)  {
    try {
      const { post_id } = req.params;
      const sql = await mssql.connect(config);
      if (sql.connected) {
        const request = sql.request()
          .input("post_id", post_id)
          .execute("dbo.GetPostById");
  
        const result = await request;
        const post = result.recordset[0];
  
        if (!post) {
          // Post with the given ID doesn't exist
          res.status(404).json({
            success: false,
            message: "Post not found"
          });
        } else {
          // Post found
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
      const sql = await mssql.connect(config);
      if (sql.connected) {
        const request = sql.request()
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
  
  
  module.exports={getPostById, getAllPosts}