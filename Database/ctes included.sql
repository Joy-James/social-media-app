

 --Retrieve User's Friends:
WITH UserFriends AS (
    SELECT friend_id
    FROM Friendships
    WHERE  UserprofileID  = 2 
)
SELECT U.*
FROM Userprofile U
INNER JOIN UserFriends UF ON U.UserprofileID  = UF.friend_id;


--How many User's Post Count:
WITH UserPostCount AS (
    SELECT  UserprofileID, COUNT(*) AS post_count
    FROM Posts
    GROUP BY  UserprofileID
)
SELECT U. UserprofileID, U.username, PC.post_count
FROM  Userprofile U
LEFT JOIN UserPostCount PC ON U.UserprofileID = PC. UserprofileID
WHERE U.UserprofileID = 3;


SELECT * FROM Posts

--Retrieve Post Likes and Comments
WITH PostLikes AS (
    SELECT post_id, COUNT(*) AS like_count
    FROM Likes
    GROUP BY post_id
),
PostComments AS (
    SELECT post_id, COUNT(*) AS comment_count
    FROM Comments
    GROUP BY post_id
)
SELECT P.*, PL.like_count, PC.comment_count
FROM Posts P
LEFT JOIN PostLikes PL ON P.post_id = PL.post_id
LEFT JOIN PostComments PC ON P.post_id = PC.post_id
WHERE P.  UserprofileID = 3;

SELECT * FROM Likes