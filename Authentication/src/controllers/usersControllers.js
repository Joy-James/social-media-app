

async function getAllUsers(req, res) {
  const pool = req.pool
  if (pool.connected) {
    let results = await pool.query(`SELECT * FROM dbo.Userprofile`)
    let UserProfile = results.recordset;
    res.json({
      success: true,
      message: "Fetched all our users succesfully",
      results: UserProfile
    })
  } else {
    res.status(500).send("Internal server error")
  }

}


async function getUserById(req, res) {
  try {
    
    
   
    const user_id = req.session.user.UserprofileID
    const pool = req.pool

    if (pool.connected) {
      if (pool.connected) {
        let results = pool.request()
          .input('UserprofileID', user_id)
          .execute('dbo.GetUserById');

        let user = (await results).recordset[0]


        if (user) {
          res.json({
            success: true,
            message: 'User with id ' + user_id + ' fetched successfully',
            results: user
          })
        } else {
          res.json({
            success: false,
            message: 'UserID does not exist'
          })
        }

      } else {
        res.status(500).send("Internal server error");
      }
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: 'Invalid User ID'
    })
  }
}


async function getUserByUsername(req, res) {

  try {

    let { username } = req.params;
    const pool = req.pool
    if (pool.connected) {
      if (sql.connected) {
        let results = pool.request()
          .input('username', username)
          .execute('dbo.GetUserByUsername')
        let user = (await results).recordset[0]

        if (user) {
          res.json({
            success: true,
            message: 'username ' + username + ' fetched successfully',
            results: user
          })
        } else {
          res.json({
            success: false,
            message: 'Username does not exist'
          })
        }

      } else {
        res.status(500).send("Internal server error");
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid Username'
    })
  }
}
async function getUserFriendships(req, res) {
  try {
     
    const user_id = req.session.user.UserprofileID
    // const { UserprofileID} = req.body;
    const pool = req.pool;
    if (pool.connected) {
      const request = await pool.request()
        .input("UserprofileID", user_id)
        .execute("dbo.GetUserFriendships");

      const friendships = request.recordset;

      // Retrieve additional information about the friends
      const friends = await Promise.all(
        friendships.map(async (friendship) => {
          const friend_id = friendship.friend_id;

          if (friend_id) {
            const friendRequest = await pool.request()
              .input("UserprofileID", friend_id)
              .execute("dbo.GetUserProfile");

            const Userprofile = friendRequest.recordset[0];

            if (Userprofile && Userprofile.UserprofileID) {
              return {
                UserprofileID: Userprofile.UserprofileID,
                username: Userprofile.username,
                full_name: Userprofile.full_name
              };
            }
          }

          return null;
        })
      );

      const filteredFriends = friends.filter(friend => friend !== null);

      res.json({
        success: true,
        message: "User friendships retrieved successfully",
        friendships: filteredFriends
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}





module.exports = {
  Home: (req, res) => {


    if (true) {
      res.send("Ok! you are logged in")
    } else {
      res.status(401).json({
        success: false,
        message: "login to access this page"
      })
    }

  },

  getAllUsers, getUserById, getUserByUsername, getUserFriendships
}