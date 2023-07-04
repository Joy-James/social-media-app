CREATE VIEW UserPostsView AS
SELECT
  P.post_id,
  P.content,
  P.created_at,
  U. UserprofileID,
  U.username,
  U.full_name
FROM Posts P
INNER JOIN  Userprofile U ON P. UserprofileID= U. UserprofileID;
SELECT * FROM  UserPostsView;

CREATE VIEW PostCommentsView AS
SELECT
  C.comment_id,
  C.post_id,
  C.comment,
  C.created_at,
  U. UserprofileID,
  U.username,
  U.full_name
FROM Comments C
INNER JOIN Userprofile U ON C. UserprofileID = U. UserprofileID;

SELECT * FROM PostCommentsView;

CREATE VIEW UserFriendshipsView AS
SELECT
  U. UserprofileID,
  U.username,
  U.full_name,
  F.friend_id,
  F.status
FROM  Userprofile U
INNER JOIN Friendships F ON U. UserprofileID = F. UserprofileID
WHERE F.status = 'accepted';

SELECT * FROM UserFriendshipsView;


CREATE VIEW NotificationsView AS
SELECT
  N.notification_id,
  N.UserprofileID,
  N.notify,
  N.created_at
FROM Notifications N
WHERE N.is_read = 0;

SELECT * FROM NotificationsView ;
