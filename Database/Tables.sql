ALTER DATABASE [Socialmedia]
SET SINGLE_USER --or RESTRICTED_USER
WITH ROLLBACK IMMEDIATE;
GO
DROP DATABASE [Socialmedia];
GO

CREATE DATABASE Library;
GO

USE Socialmedia;
GO
 -- Users table
CREATE  TABLE   Userprofile (
  UserprofileID INT IDENTITY(1,1) PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  confirm_password VARCHAR (255),
  profile_pic VARCHAR(255) NULL,
  city VARCHAR(100) NULL,
  created_at DATETIME NOT NULL,
  
);
SELECT * FROM Userprofile

 -- Friendships table
CREATE TABLE Friendships (
  friendship_id INT  IDENTITY(1,1) PRIMARY KEY,
   UserprofileID INT NOT NULL,
  friend_id INT NOT NULL,
  status VARCHAR(20) NOT NULL,
  FOREIGN KEY ( UserprofileID) REFERENCES  Userprofile( UserprofileID),
  FOREIGN KEY (friend_id) REFERENCES  Userprofile( UserprofileID)
);

SELECT * FROM Friendships


 -- Posts table
CREATE TABLE Posts (
  post_id INT  IDENTITY(1,1) PRIMARY KEY,
  UserprofileID INT NOT NULL,
  imageUrl  VARCHAR (MAX) ,
  content VARCHAR(MAX),
  created_at DATETIME NOT NULL,
  FOREIGN KEY (UserprofileID) REFERENCES  Userprofile(UserprofileID)
);
SELECT * FROM Posts
SELECT * FROM  UserPostsView;


 -- Comments table

CREATE TABLE Comments (
  comment_id  INT IDENTITY(1,1) PRIMARY KEY,
  post_id INT NOT NULL,
  UserprofileID INT NOT NULL,
  comment  VARCHAR(MAX) NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (post_id) REFERENCES Posts(post_id),
  FOREIGN KEY (UserprofileID) REFERENCES  Userprofile(UserprofileID)
);
SELECT * FROM Comments

SELECT * FROM PostCommentsView;


   --Replies table
CREATE TABLE	Replies (
  reply_id INT IDENTITY(1,1) PRIMARY KEY,
   comment_id INT NOT NULL,
   UserprofileID INT NOT NULL,
   reply  VARCHAR(MAX) NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (comment_id) REFERENCES Comments(comment_id),
  FOREIGN KEY (UserprofileID) REFERENCES  Userprofile(UserprofileID)
);
select * from Replies

 -- Likes table

CREATE TABLE Likes (
  like_id INT IDENTITY(1,1) PRIMARY KEY,
  post_id INT NOT NULL,
  UserprofileID INT NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (post_id) REFERENCES Posts(post_id),
  FOREIGN KEY (UserprofileID) REFERENCES Userprofile(UserprofileID)
);
 SELECT*FROM Likes


 -- Message table
CREATE TABLE Message (
  message_id INT  IDENTITY(1,1) PRIMARY KEY,
  sender_id INT NOT NULL,
  recipient_id INT NOT NULL,
  content VARCHAR(MAX) NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES Userprofile(UserprofileID),
  FOREIGN KEY (recipient_id) REFERENCES Userprofile(UserprofileID)
);
SELECT * FROM Message

 --message reply rable
CREATE TABLE Message_reply (
  messagereply_id INT  IDENTITY(1,1) PRIMARY KEY,
  message_id INT NOT NULL,
  recipient_id INT NOT NULL,
  reply VARCHAR(MAX) NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (  message_id) REFERENCES Message(  message_id),
  FOREIGN KEY (recipient_id) REFERENCES Userprofile(UserprofileID)
);

 -- Notification table
CREATE TABLE Notifications (
  notification_id INT IDENTITY(1,1) PRIMARY KEY,
   UserprofileID INT NOT NULL,
  notify VARCHAR(MAX) NOT NULL,
  created_at DATETIME NOT NULL,
  is_read BIT NOT NULL,
  FOREIGN KEY ( UserprofileID) REFERENCES  Userprofile(UserprofileID)
);
SELECT * FROM Notifications
SELECT *
FROM  NotificationsView ;