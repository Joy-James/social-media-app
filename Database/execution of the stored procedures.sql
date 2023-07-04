--create a user
EXEC CreateUser @full_name = 'Cynthia Munja',
                @username = 'Cindy_Mumnj',
                @email = 'Munja@example.com',
                @password = 'password123',
                @confirm_password ='password123';

SELECT * FROM Userprofile

--get user by username

EXEC GetUserByUsername  @username='joy_njuguna';


--get user by id
EXEC GetUserById  @UserprofileID=2


-- CreateFriendship
EXEC CreateFriendship   @UserprofileID=2,
                          @friend_id=3;
SELECT * FROM Friendships


-- UpdateFriendshipStatus
EXEC UpdateFriendshipStatus @friendship_id=1,
                          @status= 'accepted';

SELECT * FROM Friendships
SELECT *
FROM UserFriendshipsView ;

-- CreatePost
EXEC CreatePost   @UserprofileID =3,
                  @imageUrl  ='http//imageUrl',
                  @content=' Karibu Kenya';
SELECT * FROM Posts
SELECT *
FROM UserPostsView;


-- GetPostById
EXEC GetPostById @post_id=1;

-- CreateComment
EXEC   CreateComment
  @post_id =1,
  @UserprofileID =3,
  @comment ='Thank You so much. Looking Forward to the safaris';

  SELECT * FROM Comments
  SELECT *
FROM PostCommentsView ;

  -- Create Replies
  EXEC CreateReply
  @comment_id =1,
  @UserprofileID  =3,
  @reply ='I could  recommed you great hotels for your visit. Check your dm';

 SELECT * from Replies

 -- CreateLike

EXEC CreateLike @post_id = 1, @UserprofileID = 3;
EXEC CreateLike @post_id = 1, @UserprofileID = 2;
EXEC CreateLike @post_id = 1, @UserprofileID = 4;

 SELECT*FROM Likes
 SELECT *
FROM  UserLikesCountView ;

 -- CreateMessage
EXEC CreateMessage
  @sender_id =2,
  @recipient_id =3,
  @content ='How are you finding Kenya so far ';
  SELECT * FROM Message

   --message reply table
EXEC CreateMessage_reply
  @message_id =1,
  @recipient_id =3,
  @reply ='Its been amaizing, I might consider moving here';

 SELECT * FROM Message_reply;

 -- Get user notifications

 EXEC CreateNotification @UserprofileID = 3, @notify = 'New notification';
 SELECT * FROM Notifications

