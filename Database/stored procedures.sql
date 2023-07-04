-- CreateUser
CREATE PROCEDURE CreateUser
  @full_name VARCHAR(100),
  @username VARCHAR(50),
  @email VARCHAR(100),
  @password VARCHAR(255),
  @confirm_password  VARCHAR (255)

AS
BEGIN
  INSERT INTO Userprofile ( full_name,username, email, password, confirm_password )
  VALUES (@full_name,@username, @email, @password,  @confirm_password  )
END;
GO

-- GetUserById
CREATE PROCEDURE GetUserById
  @UserprofileID INT
AS
BEGIN
  SELECT *
  FROM  Userprofile
  WHERE  UserprofileID = @UserprofileID;
END;
GO

-- GetUserByUsername
CREATE PROCEDURE GetUserByUsername
  @username VARCHAR(50)
AS
BEGIN
  SELECT *
  FROM  Userprofile
  WHERE username = @username;
END;
GO
-- CreateFriendship
CREATE PROCEDURE CreateFriendship
  @UserprofileID INT,
  @friend_id INT
AS
BEGIN
  INSERT INTO Friendships ( UserprofileID, friend_id, status)
  VALUES (@UserprofileID, @friend_id, 'pending');
END;
GO


-- UpdateFriendshipStatus
CREATE PROCEDURE UpdateFriendshipStatus
  @friendship_id INT,
  @status VARCHAR(20)
AS
BEGIN
  UPDATE Friendships
  SET status = @status
  WHERE friendship_id = @friendship_id;
END;
GO

-- CreatePost
CREATE PROCEDURE CreatePost
  @UserprofileID INT,
   @imageUrl  VARCHAR  ,
  @content VARCHAR(MAX)
AS
BEGIN
  INSERT INTO Posts( UserprofileID,  imageUrl, content, created_at)
  VALUES ( @UserprofileID,  @imageUrl, @content, GETDATE());
END;
GO


-- GetPostById
CREATE PROCEDURE GetPostById
  @post_id INT
AS
BEGIN
  SELECT *
  FROM Posts
  WHERE post_id = @post_id;
END;
GO
-- CreateComment
CREATE PROCEDURE CreateComment
  @post_id INT,
  @UserprofileID  INT,
  @comment VARCHAR(MAX)
AS
BEGIN
  INSERT INTO Comments (post_id,  UserprofileID , comment, created_at)
  VALUES (@post_id, @UserprofileID , @comment, GETDATE());
END;
GO

-- Create Replies
CREATE PROCEDURE CreateReply
  @comment_id INT,
  @UserprofileID  INT,
  @reply VARCHAR(MAX)
AS
BEGIN
  INSERT INTO Replies( comment_id,  UserprofileID , reply, created_at)
  VALUES (@comment_id, @UserprofileID , @reply, GETDATE());
END;
GO

-- CreateLike
CREATE PROCEDURE CreateLike
  @post_id INT,
  @UserprofileID INT
AS
BEGIN
  INSERT INTO Likes (post_id,  UserprofileID, created_at)
  VALUES (@post_id, @UserprofileID, GETDATE());
END;
GO

-- ALTER PROCEDURE CreateLike
--   @post_id INT,
--    @UserprofileID  INT
-- AS
-- BEGIN
--   DECLARE @incrementValue INT;

--   -- Get the current value of the IncrementColumn for the post
--   SELECT @incrementValue =  IncrementLikes
--   FROM Likes
--   WHERE post_id = @post_id;

--   -- Increment the value by 1
--   SET @incrementValue = @incrementValue + 1;

--   -- Update the IncrementColumn for the post
--   UPDATE Likes
--   SET IncrementLikes = @incrementValue
--   WHERE post_id = @post_id;

--   -- Insert the new like
--   INSERT INTO Likes (post_id,  UserprofileID , created_at)
--   VALUES (@post_id, @UserprofileID , GETDATE());
-- END;
-- CreateMessage
CREATE PROCEDURE CreateMessage
  @sender_id INT,
  @recipient_id INT,
  @content VARCHAR(MAX)
AS
BEGIN
  INSERT INTO Message(sender_id, recipient_id, content, created_at)
  VALUES (@sender_id, @recipient_id, @content, GETDATE());
END;
GO

-- CreateMessage_repy
CREATE PROCEDURE CreateMessage_reply
  @message_id INT,
  @recipient_id INT,
  @reply VARCHAR(MAX)
AS
BEGIN
  INSERT INTO Message_reply(message_id, recipient_id, reply, created_at)
  VALUES (@message_id, @recipient_id, @reply, GETDATE());
END;
GO

 -- Get user notifications
 CREATE PROCEDURE CreateNotification
  @UserprofileID INT,
  @notify VARCHAR(MAX)
AS
BEGIN

  INSERT INTO Notifications ( UserprofileID , notify, created_at, is_read)
  VALUES (@UserprofileID , @notify, GETDATE(), 0);
  

  SELECT *
  FROM Notifications
  WHERE notification_id = SCOPE_IDENTITY();
END;
