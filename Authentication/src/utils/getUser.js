const mssql = require('mssql');
const {config} = require('../config/config');

async function getUserById(UserprofileID) {
  console.log(config)
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.request()
      .input("UserprofileID", UserprofileID)
      .execute("dbo.GetUserById");

    let user = results.recordset[0];
    return user;
  }
}

module.exports = { getUserById};
