-- Active: 1701981789402@@127.0.0.1@3306@foodhub
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
  -- SET NEW.Password = CONCAT(SHA2(NEW.Password,256), ':', salt_value);
END;
//
DELIMITER ;

-- Create the desalting function
-- DROP FUNCTION IF EXISTS `VerifyPassword`;
-- DELIMITER //
-- CREATE FUNCTION VerifyPassword(mail VARCHAR(255), p_password VARCHAR(255))
-- RETURNS INT
-- BEGIN
--     DECLARE stored_password VARCHAR(255);
--     DECLARE stored_salt VARCHAR(255);
--     DECLARE hashed_password VARCHAR(255);
--     SELECT Password INTO stored_password FROM Users WHERE `Email` = mail;
--     IF stored_password IS NULL THEN
--         RETURN 0;
--     END IF;
--     SET stored_salt = SUBSTRING_INDEX(stored_password, ':', -1);
--     SET hashed_password = SHA2(p_password, 256);
--     IF hashed_password = stored_password THEN
--         RETURN 1;
--     ELSE
--         RETURN -1;
--     END IF;
-- END //
-- DELIMITER ;

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
Values 
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel'),
('kep.jpg','Kacsa','Frissen sült ropogós kacsa','1. Süssük meg; 2. Együk meg',3,'Könnyen elkészíthető','Főétel');

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
INSERT INTO Users (Username, Email, Password) VALUES ('Bence', 'bence@gmail.com', 'bb123');
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
//
DELIMITER ;
CALL `felhBejelentkezes` ('bencebudai2004@gmail.com','Asdfg123');

-- -- felhBejelentkezes function
DROP FUNCTION IF EXISTS felhBejelentkezes;
DELIMITER //
CREATE FUNCTION felhBejelentkezes(mail VARCHAR(50), jlsz VARCHAR(50))
RETURNS INT
BEGIN
    DECLARE user_id_value INT;
    DECLARE email_value VARCHAR(60);
    DECLARE hashed_password VARCHAR(255);
    DECLARE salt_value VARCHAR(255);
    SELECT User_ID, Password, Email INTO user_id_value, hashed_password, email_value
    FROM Users WHERE Email = mail;
    IF hashed_password IS NOT NULL AND PASSWORD(CONCAT(jlsz, SUBSTRING_INDEX(hashed_password, ':', -1))) = SUBSTRING_INDEX(hashed_password, ':', 1) THEN
    RETURN TRUE;
    ELSE
    RETURN FALSE;
    END IF;
END
//
DELIMITER ;
SELECT felhBejelentkezes ('levi@gmail.com','levi123');
SELECT felhBejelentkezes ('bence@gmail.com','bb123');

-- felhTokenFrissites procedure
drop PROCEDURE if exists felhTokenFrissites;
DELIMITER //
CREATE PROCEDURE felhTokenFrissites(IN id int, token Text)
BEGIN
    UPDATE Users SET Users.Token = token WHERE Users.User_ID = id;     
END;
//
DELIMITER ;

-- felhTokenFrissites function
drop FUNCTION if exists felhTokenFrissites;
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
-- SELECT felhTokenFrissites (1, generateTokenProcedure );

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
SELECT 
    Recipes.User_ID AS Recipes_User_ID,
    Recipes.Picture_data AS Recipes_Picture_data,
    Recipes.Title AS Recipes_Title,
    Recipes.Description AS Recipes_Description,
    Recipes.Instructions AS Recipes_Instructions,
    Recipes.Serving AS Recipes_Serving,
    Recipes.Difficulty_Level AS Recipes_Difficulty_Level,
    Recipes.Date_Created AS Recipes_Date_Created,
    Recipe_Ingredients,
    Recipe_Time
FROM 
    Recipes
INNER JOIN (
    SELECT 
        Recipe_Ingredients.Recipe_ID,
        GROUP_CONCAT(CONCAT(Recipe_Ingredients.Quantity, ' ', Recipe_Ingredients.Measurement, ' ', Ingredients.Ingredient_Name) SEPARATOR ';') AS Recipe_Ingredients
    FROM 
        Recipe_Ingredients
    INNER JOIN 
        Ingredients ON Recipe_Ingredients.Ingredient_ID = Ingredients.Ingredient_ID
    GROUP BY 
        Recipe_Ingredients.Recipe_ID
) AS Ingredients ON Recipes.Recipe_ID = Ingredients.Recipe_ID
INNER JOIN (
    SELECT 
        `Time`.Recipe_ID,
        GROUP_CONCAT(CONCAT(`Time`.Time_Quantity, ' ', `Time`.Time_Type, ' ', `Time`.Time_Prep_Type) SEPARATOR ';') AS Recipe_Time
    FROM 
        `Time`
    GROUP BY 
        `Time`.Recipe_ID
) AS TimeData ON Recipes.Recipe_ID = TimeData.Recipe_ID
WHERE 
    Recipes.Recipe_ID = recipeID;
END;
//
delimiter ; 
 CALL getRecipeInfos(2)

drop procedure if exists loadRecipeInfos;
Delimiter //
CREATE PROCEDURE loadRecipeInfos(IN recipeID int)
BEGIN
    SELECT * FROM Recipes WHERE Recipe_ID = recipeID;
END;
//
delimiter ;


-- getCommentContent procedure
DROP PROCEDURE if exists getCommentContent;
delimiter //
CREATE PROCEDURE getCommentContent(IN recipeId int)
BEGIN
    SELECT Comments.Comment_Text, Comments.Date_Posted, Users.Username FROM Comments 
    INNER JOIN Users
    ON Comments.User_ID = Users.User_ID
    WHERE Comments.Recipe_ID = recipeId;
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

-- -- Functions
-- SELECT VerifyPassword ('levi@gmail.com' ,'levi123');

-- Select utasitasok
SELECT * FROM Users;
SELECT * FROM Recipes;
SELECT * FROM Favorites;
SELECT * FROM Comments;
SELECT * FROM Ingredients;


SELECT 
    Recipes.User_ID AS Recipes_User_ID,
    Recipes.Picture_data AS Recipes_Picture_data,
    Recipes.Title AS Recipes_Title,
    Recipes.Description AS Recipes_Description,
    Recipes.Instructions AS Recipes_Instructions,
    Recipes.Serving AS Recipes_Serving,
    Recipes.Difficulty_Level AS Recipes_Difficulty_Level,
    Recipes.Date_Created AS Recipes_Date_Created,
    Recipe_Ingredients,
    Recipe_Time
FROM 
    Recipes
INNER JOIN (
    SELECT 
        Recipe_Ingredients.Recipe_ID,
        GROUP_CONCAT(CONCAT(Recipe_Ingredients.Quantity, ' ', Recipe_Ingredients.Measurement, ' ', Ingredients.Ingredient_Name) SEPARATOR ';') AS Recipe_Ingredients
    FROM 
        Recipe_Ingredients
    INNER JOIN 
        Ingredients ON Recipe_Ingredients.Ingredient_ID = Ingredients.Ingredient_ID
    GROUP BY 
        Recipe_Ingredients.Recipe_ID
) AS Ingredients ON Recipes.Recipe_ID = Ingredients.Recipe_ID
INNER JOIN (
    SELECT 
        `Time`.Recipe_ID,
        GROUP_CONCAT(CONCAT(`Time`.Time_Quantity, ' ', `Time`.Time_Type, ' ', `Time`.Time_Prep_Type) SEPARATOR ';') AS Recipe_Time
    FROM 
        `Time`
    GROUP BY 
        `Time`.Recipe_ID
) AS TimeData ON Recipes.Recipe_ID = TimeData.Recipe_ID
WHERE 
    Recipes.Recipe_ID = 1;

DROP PROCEDURE IF EXISTS `UpdateUser`;
DELIMITER //

CREATE PROCEDURE UpdateUser(IN userId INT, IN new_username VARCHAR(255), IN new_email VARCHAR(255))
BEGIN
    UPDATE Users
    SET Username = new_username, Email = new_email
    WHERE User_ID = userId;
END;
//
DELIMITER ;

DELIMITER //

CREATE PROCEDURE getAllUserRecipes(IN userId INT)
BEGIN
    SELECT Recipe_ID, Title, Picture_data 
    FROM Recipes 
    WHERE User_ID = userId;
END;
//
DELIMITER ;

CALL getAllUserRecipes(7);

INSERT INTO Recipe_Ingredients (Recipe_ID,Ingredient_ID,Quantity,Measurement) VALUES
(1, 1, 1, "Milligram"),
(1, 2, 2, "Gramm"),
(1, 2, 3, "Dekagramm"),
(1, 2, 4, "Milligram"),
(1, 1, 5, "Milligram"),
(1, 1, 6, "Milligram");

INSERT INTO Time (Recipe_ID,Time_Prep_Type,Time_Quantity,Time_Type) VALUES
(1, "Előkészület", 15, "perc"),
(1, "Pihentetés", 35, "perc"),
(1, "Sütés", 1, "óra"),
(1, "Marinálás", 1, "nap");
