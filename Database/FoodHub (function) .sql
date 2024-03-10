-- Active: 1708009143398@@127.0.0.1@3306@foodhub
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

-- Ingredients table
CREATE TABLE IF NOT EXISTS Ingredients (
    Ingredient_ID INT AUTO_INCREMENT PRIMARY KEY,
    Ingredient_Name VARCHAR(255) NOT NULL,
    Ingredient_Category VARCHAR(30)
);

-- Recipes table
CREATE TABLE IF NOT EXISTS Recipes (
    Recipe_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    Picture_data BLOB,
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

-- Time table
CREATE TABLE IF NOT EXISTS Time (
    Recipe_ID INT,
    Time_Prep_Type VARCHAR(30),
    Time_Quantity INT,
    Time_Type VARCHAR(30),
    FOREIGN KEY (Recipe_ID)
		REFERENCES Recipes (Recipe_ID)
);

-- Recipe_Ingredients table
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

-- Favorites table
CREATE TABLE IF NOT EXISTS Favorites (
    Favorite_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    Recipe_ID INT,
    FOREIGN KEY (User_ID)
        REFERENCES Users (User_ID),
    FOREIGN KEY (Recipe_ID)
        REFERENCES Recipes (Recipe_ID)
);

-- Comments table
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

-- INSERT UTASÍTÁSOK
INSERT INTO Recipes (Picture_data,Title,Description,Instructions,Serving,Difficulty_Level,Food_Category) 
Values ('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel');
INSERT INTO Ingredients (Ingredient_Name, Ingredient_Category) 
VALUES('Liszt', 'Szénhidrátok'),
('Tojás', 'Fehérjék'),
('Cukor', 'Édesítőszerek'),
('Vaj', 'Zsírok'),
('Tej', 'Fehérjék'),
('Só', 'Fűszerek'),
('Bors', 'Fűszerek'),
('Sütőpor', 'Egyéb');
INSERT INTO Users (Username, Email, Password) VALUES ('Levi', 'levi@gmail.com', 'levi123');
INSERT INTO Favorites (Favorite_ID, User_ID, Recipe_ID)
VALUES (1,1,1);
INSERT INTO Comments (Comment_ID, User_ID, Recipe_ID, Comment_Text, Date_Posted)
VALUES (NULL, 1, 1, "Nagyon finom volt ez az étel!", "2024.02.01");


-- generateToken function
DROP FUNCTION IF EXISTS generateToken;
DELIMITER //
CREATE FUNCTION generateToken() RETURNS VARCHAR(36)
BEGIN
    DECLARE token VARCHAR(36);
    SET token = UUID();
    RETURN token;
END;
//
DELIMITER ;
SELECT generateToken();


-- fekRegisztracio function
DROP FUNCTION IF EXISTS felRegisztracio;
DELIMITER //
CREATE FUNCTION felRegisztracio(in_username VARCHAR(255), in_email VARCHAR(255), in_hashed_password VARCHAR(255), in_token TEXT) RETURNS TEXT
BEGIN
    DECLARE registration_result TEXT;
    DECLARE user_id INT;
    IF EXISTS (SELECT * FROM Users WHERE Email = in_email) THEN
        SET registration_result = 'Email already exists';
    ELSE
        INSERT INTO Users (Username, Email, Password, Token) VALUES (in_username, in_email, in_hashed_password, in_token);
        SET user_id = LAST_INSERT_ID();
        SET registration_result = CONCAT('{"user_id": ', user_id, ', "username": "', in_username, '", "email": "', in_email, '", "token": "', in_token, '"}');
    END IF;
    RETURN registration_result;
END;
//
DELIMITER ;
SELECT felRegisztracio('admin', 'admin@gmail.com', 'admin', generateToken());


-- felhBejelentkezes procedure
/*drop procedure if exists felhBejelentkezes;
DELIMITER //
CREATE PROCEDURE if not EXISTS felhBejelentkezes(IN mail Varchar(50), jlsz varchar(50))
BEGIN
    SELECT User_ID, Username, Email FROM Users WHERE Users.Email = mail And Users.Passsword = jlsz;
END;
DELIMITER ;*/
DROP FUNCTION IF EXISTS felhBejelentkezes;
DELIMITER //
CREATE FUNCTION felhBejelentkezes(mail VARCHAR(50), jlsz VARCHAR(50))
RETURNS INT
BEGIN
    DECLARE user_id INT;
    SELECT User_ID INTO user_id FROM Users WHERE Email = mail AND Password = jlsz;
    RETURN user_id;
END;
//
DELIMITER ;
SELECT felhBejelentkezes('example@example.com', 'password');


-- felhTokenFrissites procedure
/*drop PROCEDURE if exists felhTokenFrissites;
DELIMITER //
CREATE PROCEDURE if NOT EXISTS felhTokenFrissites(IN id int, token Text)
BEGIN
    UPDATE Users SET Users.Token = token WHERE Users.User_ID = id;     
END;
DELIMITER ;*/
DROP FUNCTION IF EXISTS felhTokenFrissites;
DELIMITER //
CREATE FUNCTION felhTokenFrissites(id INT, token TEXT) RETURNS TEXT
BEGIN
    DECLARE info TEXT;
    UPDATE Users SET Token = token WHERE User_ID = id;
    SET info = CONCAT('Token for User_ID ', id, ' has been updated to: ', token);
    RETURN info;
END;
//
DELIMITER ;
SELECT felhTokenFrissites(1, generateToken());


-- getAllUserInfos procedure
/*DROP PROCEDURE if exists getAllUserInfos;
delimiter //
CREATE PROCEDURE if not EXISTS getAllUserInfos(IN userID int)
BEGIN
    SELECT * FROM Users WHERE Users.User_ID = userID;
END;
delimiter ;*/
DROP FUNCTION IF EXISTS getAllUserInfos;
DELIMITER //
CREATE FUNCTION getAllUserInfos(userID INT) RETURNS TEXT
BEGIN
    DECLARE user_info TEXT;
    SELECT CONCAT('User_ID: ', User_ID, ', Username: ', Username, ', Email: ', Email) INTO user_info
    FROM Users
    WHERE User_ID = userID;
    RETURN user_info;
END;
//
DELIMITER ;
SELECT getAllUserInfos(1);


-- felhBejelentkezes procedure
/*drop procedure if exists adminBejelentkezes;
DELIMITER //
CREATE PROCEDURE if not EXISTS adminBejelentkezes(IN mail Varchar(50), jlsz varchar(50))
BEGIN
    SELECT User_ID, Username, Email FROM Users WHERE Users.Email = mail And Users.Password = jlsz;
END;
DELIMITER ;*/
DROP FUNCTION IF EXISTS adminBejelentkezes;
DELIMITER //
CREATE FUNCTION adminBejelentkezes(mail VARCHAR(50), jlsz VARCHAR(50)) RETURNS TEXT
BEGIN
    DECLARE user_info TEXT;
    DECLARE hashed_password VARCHAR(255);
    DECLARE salt_value VARCHAR(255);
    DECLARE user_id_value INT;
    SELECT User_ID, Password INTO user_id_value, hashed_password
    FROM Users
    WHERE Email = mail;
    IF hashed_password IS NOT NULL AND PASSWORD(CONCAT(jlsz, SUBSTRING_INDEX(hashed_password, ':', -1))) = SUBSTRING_INDEX(hashed_password, ':', 1) THEN
        SELECT CONCAT('User_ID: ', user_id_value, ', Username: ', Username, ', Email: ', Email, ', Password:',hashed_password) INTO user_info
        FROM Users
        WHERE Email = mail;
    ELSE
        SET user_info = 'Invalid email or password';
    END IF;
    RETURN user_info;
END;
//
DELIMITER ;
SELECT adminBejelentkezes('admin@gmail.com', 'admin') AS 'adminBejelentkezes';



-- getRecipeInfos procedure
/*DROP PROCEDURE if exists getRecipeInfos;
delimiter //
CREATE PROCEDURE getRecipeInfos(IN recipeID int)
BEGIN
    SELECT * FROM Recipes WHERE Recipes.Recipe_ID = recipeID;
END;
delimiter ;
call getRecipeInfos(1);*/
DROP FUNCTION IF EXISTS getRecipeInfos;
DELIMITER //
CREATE FUNCTION getRecipeInfos(recipeID INT) RETURNS TEXT
BEGIN
    DECLARE recipe_info TEXT;
    SELECT CONCAT('Recipe_ID: ', Recipe_ID, ', Title: ', Title, ', Description: ', Description) INTO recipe_info
    FROM Recipes
    WHERE Recipe_ID = recipeID;
    RETURN recipe_info;
END;
//
DELIMITER ;
SELECT getRecipeInfos(1);


-- getCommentContent procedure
/*DROP PROCEDURE if exists getCommentContent;
delimiter //
CREATE PROCEDURE if not EXISTS getCommentContent(IN searched_id int)
BEGIN
    SELECT Comment_Text FROM Comments WHERE Comments.Comment_ID = searched_id;
END;
delimiter ;*/
DROP FUNCTION IF EXISTS getCommentContent;
DELIMITER //
CREATE FUNCTION getCommentContent(searched_id INT) RETURNS TEXT
BEGIN
    DECLARE comment_text TEXT;
    SELECT Comment_Text INTO comment_text
    FROM Comments
    WHERE Comment_ID = searched_id;
    RETURN comment_text;
END;
//
DELIMITER ;
SELECT getCommentContent(1);


-- getFavorites procedure
/*DROP PROCEDURE if exists getFavorites;
delimiter //
CREATE PROCEDURE if not EXISTS getFavorites(in userid int)
BEGIN
    SELECT * FROM Favorites WHERE Favorites.User_ID = userid;
END;
delimiter ;*/
DROP FUNCTION IF EXISTS getFavorites;
DELIMITER //
CREATE FUNCTION getFavorites(userid INT) RETURNS TEXT
BEGIN
    DECLARE fav_info TEXT;
    SELECT GROUP_CONCAT(Recipe_ID SEPARATOR ', ') INTO fav_info
    FROM Favorites
    WHERE User_ID = userid;
    RETURN fav_info;
END;
//
DELIMITER ;
SELECT getFavorites(1);


-- getIngredients procedure
/*DROP PROCEDURE if exists getIngredients;
delimiter //
CREATE PROCEDURE if not EXISTS getIngredients()
BEGIN
    SELECT * FROM Ingredients;
END;
DELIMITER ;
CALL getIngredients;*/
DROP FUNCTION IF EXISTS getIngredients;
DELIMITER //
CREATE FUNCTION getIngredients() RETURNS TEXT
BEGIN
    DECLARE ingredients_list TEXT DEFAULT '';
    SELECT GROUP_CONCAT(Ingredient_Name SEPARATOR ', ') INTO ingredients_list
    FROM Ingredients;
    RETURN ingredients_list;
END;
//
DELIMITER ;
SELECT getIngredients();


-- Select utasitasok
SELECT * FROM Users;
SELECT * FROM Recipes;
SELECT * FROM Favorites;
SELECT * FROM Comments;
SELECT * FROM Ingredients;

