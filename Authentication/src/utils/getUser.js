const {config} = require('../config/config');




async function getUserByUsername(username, pool) {
  console.log(config)
  // const {pool}=app.locals

  if (pool.connected) {
    let results = await pool.request()
      .input("username", username)
      .execute("dbo.GetUserByUsername");

    let user = results.recordset[0];
    return user;
  }
}

module.exports = { getUserByUsername};
