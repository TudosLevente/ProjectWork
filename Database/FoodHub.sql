-- Active: 1707314970079@@127.0.0.1@3306@foodhub
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
-- *296A11A90EEC6D320FC8430F0038498FC514B8B2:3019d65f4204bc3b15847793be1ac6dc
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
    Picture_data VARCHAR(255),
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

ALTER TABLE Recipes
MODIFY Picture_data VARCHAR(255) AFTER User_ID;

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

DROP PROCEDURE IF EXISTS generateTokenProcedure;
DELIMITER //
CREATE PROCEDURE generateTokenProcedure(OUT generatedToken VARCHAR(36))
BEGIN
    SET generatedToken = UUID();
END;
//
DELIMITER ;


-- felhBejelentkezes procedure
drop procedure if exists felhBejelentkezes;
DELIMITER //
CREATE PROCEDURE felhBejelentkezes(IN mail Varchar(50), jlsz varchar(50))
BEGIN
    SELECT User_ID, Username, Email FROM Users WHERE Users.Email = mail And Users.Password = jlsz;
END;
//felhBejelentkezes
DELIMITER ;


-- felhTokenFrissites procedure
drop PROCEDURE if exists felhTokenFrissites;
DELIMITER //
CREATE PROCEDURE felhTokenFrissites(IN id int, token Text)
BEGIN
    UPDATE Users SET Users.Token = token WHERE Users.User_ID = id;     
END;
//
DELIMITER ;


-- getAllUserInfos procedure
DROP PROCEDURE if exists getAllUserInfos;
delimiter //
CREATE PROCEDURE getAllUserInfos(IN userID int)
BEGIN
    SELECT * FROM Users WHERE Users.User_ID = userID;
END;
//
delimiter ;


-- felhBejelentkezes procedure
drop procedure if exists adminBejelentkezes;
DELIMITER //
CREATE PROCEDURE adminBejelentkezes(IN mail Varchar(50), jlsz varchar(50))
BEGIN
    SELECT User_ID, Username, Email FROM Users WHERE Users.Email = mail And Users.Password = jlsz;
END;
//
DELIMITER ;


-- getRecipeInfos procedure
DROP PROCEDURE if exists getRecipeInfos;
delimiter //
CREATE PROCEDURE getRecipeInfos(IN recipeID int)
BEGIN
    SELECT * FROM Recipes WHERE Recipes.Recipe_ID = recipeID;
END;
//
delimiter ;
call getRecipeInfos(1);


-- getCommentContent procedure
DROP PROCEDURE if exists getCommentContent;
delimiter //
CREATE PROCEDURE getCommentContent(IN searched_id int)
BEGIN
    SELECT Comment_Text FROM Comments WHERE Comments.Comment_ID = searched_id;
END;
//
delimiter ;


-- getFavorites procedure
DROP PROCEDURE if exists getFavorites;
delimiter //
CREATE PROCEDURE getFavorites(in userid int)
BEGIN
    SELECT * FROM Favorites WHERE Favorites.User_ID = userid;
END;
//
delimiter ;


-- getIngredients procedure
DROP PROCEDURE if exists getIngredients;
delimiter //
CREATE PROCEDURE getIngredients()
BEGIN
    SELECT * FROM Ingredients;
END;
//
DELIMITER ;
CALL getIngredients;


-- Select utasitasok
SELECT * FROM Users;
SELECT * FROM Recipes;
SELECT * FROM Favorites;
SELECT * FROM Comments;
SELECT * FROM Ingredients;

