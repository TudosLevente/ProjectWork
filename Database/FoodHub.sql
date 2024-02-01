-- Active: 1701431087077@@127.0.0.1@3306@foodhub
DROP DATABASE IF EXISTS foodhub;

CREATE DATABASE IF NOT EXISTS foodhub
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE foodhub;
-- Drop tables if they exist
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Time;
DROP TABLE IF EXISTS Recipes;
DROP TABLE IF EXISTS Favorites;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Ingredients;
DROP TABLE IF EXISTS Recipe_Ingredients;

-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Token TEXT
);

-- Function to generate a salt
DElIMITER // 
CREATE FUNCTION `salt`() RETURNS VARCHAR(255)
BEGIN
  DECLARE random_string VARCHAR(255);
  SET random_string = MD5(RAND());
  RETURN random_string;
END;
//
DELIMITER ;

-- Trigger to hash the password before insertion
DELIMITER //
CREATE TRIGGER `password_hash` BEFORE INSERT ON `Users` FOR EACH ROW
BEGIN
  DECLARE salt_value VARCHAR(255);
  SET salt_value = salt();
  SET NEW.Password = CONCAT(PASSWORD(CONCAT(NEW.Password, salt_value)), ':', salt_value);
END;
//
DELIMITER ;

CREATE TABLE IF NOT EXISTS Ingredients (
    Ingredient_ID INT AUTO_INCREMENT PRIMARY KEY,
    Ingredient_Name VARCHAR(255) NOT NULL,
    Ingredient_Category VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS Recipes (
    Recipe_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    Picture_file_name VARCHAR(255),
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    Instructions TEXT,
    Serving INT,
    Difficulty_Level VARCHAR(30),
    Food_Category VARCHAR(30),
    Date_Created DATE,
    FOREIGN KEY (User_ID)
        REFERENCES Users (User_ID)
);

CREATE TABLE IF NOT EXISTS Time (
    Recipe_ID INT,
    Time_Prep_Type VARCHAR(30),
    Time_Quantity INT,
    Time_Type VARCHAR(30),
    FOREIGN KEY (Recipe_ID)
		REFERENCES Recipes (Recipe_ID)
);

CREATE TABLE IF NOT EXISTS Recipe_Ingredients (
    Recipe_ID INT ,
    Ingredient_ID INT,
    Quantity INT,
    Measurement VArCHAR(30),
    FOREIGN KEY (Ingredient_ID)
        REFERENCES Ingredients (Ingredient_ID),
	FOREIGN KEY (Recipe_ID)
		REFERENCES Recipes (Recipe_ID)
);

CREATE TABLE IF NOT EXISTS Favorites (
    Favorite_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    Recipe_ID INT,
    FOREIGN KEY (User_ID)
        REFERENCES Users (User_ID),
    FOREIGN KEY (Recipe_ID)
        REFERENCES Recipes (Recipe_ID)
);

CREATE TABLE IF NOT EXISTS Comments (
    Comment_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    Recipe_ID INT,
    Comment_Text TEXT,
    Date_Posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (User_ID)
        REFERENCES Users (User_ID),
    FOREIGN KEY (Recipe_ID)
        REFERENCES Recipes (Recipe_ID)
);

DELIMITER //

drop procedure felhBejelentkezes;

CREATE PROCEDURE if not EXISTS felhBejelentkezes(IN mail Varchar(50), jlsz varchar(50))
BEGIN
    SELECT User_ID, Username, Email FROM Users WHERE Users.Email = mail And Users.Passsword = jlsz;
END;

DELIMITER ;

DELIMITER //

drop PROCEDURE felhTokenFrissites;

CREATE PROCEDURE if NOT EXISTS felhTokenFrissites(IN id int, token Text)
BEGIN
    UPDATE Users SET Users.Token = token WHERE Users.User_ID = id;     
END;

DELIMITER ;

delimiter //

DROP PROCEDURE getAllUserInfos;

CREATE PROCEDURE if not EXISTS getAllUserInfos(IN userID int)
BEGIN
    SELECT * FROM Users WHERE Users.User_ID = userID;
END;

delimiter ;

DELIMITER //

drop procedure felhBejelentkezes;

CREATE PROCEDURE if not EXISTS adminBejelentkezes(IN mail Varchar(50), jlsz varchar(50))
BEGIN
    SELECT User_ID, Username, Email FROM Users WHERE Users.Email = mail And Users.Password = jlsz;
END;

DELIMITER ;

delimiter //

DROP PROCEDURE getRecipeInfos;

CREATE PROCEDURE if not EXISTS getRecipeInfos(IN searched_id int)
BEGIN
    SELECT * FROM Recipes WHERE Recipes.Recipe_ID = searched_id;
END;

delimiter ;

INSERT INTO Recipes (Picture_file_name,Title,Description,Instructions,Serving,Difficulty_Level,Food_Category) 
Values ('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel');

delimiter //

DROP PROCEDURE getCommentContent;

CREATE PROCEDURE if not EXISTS getCommentContent(IN searched_id int)
BEGIN
    SELECT Comment_Text FROM Comments WHERE Comments.Comment_ID = searched_id;
END;

delimiter ;

INSERT INTO Comments (Comment_ID, User_ID, Recipe_ID, Comment_Text, Date_Posted)
VALUES (3, 1, 1, "Nagyon finom volt ez az étel!", "2024.02.01");