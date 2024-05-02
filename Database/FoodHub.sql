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
    Username VARCHAR(30) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    IsAdmin BOOLEAN DEFAULT FALSE,
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
    Ingredient_Name VARCHAR(255) NOT NULL UNIQUE,
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
    IsVerified BOOLEAN DEFAULT FALSE,
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

INSERT INTO Users (Username, Email, Password, IsAdmin) VALUES
("Admin", "admin@gmail.com", "admin123", 1),
("Levi", "levi@gmail.com", "levi123", 0),
("Bence", "bence@gmail.com", "bence123", 0);

INSERT INTO Ingredients (Ingredient_Name, Ingredient_Category) 
VALUES
('Liszt', 'Szénhidrátok'),
('Tojás', 'Fehérjék'),
('Cukor', 'Édesítőszerek'),
('Vaj', 'Zsírok'),
('Tej', 'Fehérjék'),
('Só', 'Fűszerek'),
('Bors', 'Fűszerek'),
('Sütőpor', 'Egyéb'),
('Sertéshús', 'Fehérjék'),
('Csirkehús', 'Fehérjék'),
('Marhahús', 'Fehérjék'),
('Lazac', 'Fehérjék'),
('Tészta', 'Szénhidrátok'),
('Rizs', 'Szénhidrátok'),
('Barna cukor', 'Édesítőszerek'),
('Méz', 'Édesítőszerek'),
('Olívaolaj', 'Zsírok'),
('Szalonna', 'Zsírok'),
('Kókusztej', 'Fehérjék'),
('Fahéj', 'Fűszerek'),
('Szegfűszeg', 'Fűszerek'),
('Currypor', 'Fűszerek'),
('Élesztő', 'Egyéb'),
('Paradicsom', 'Zöldségek'),
('Hagyma', 'Zöldségek'),
('Burgonya', 'Zöldségek'),
('Répa', 'Zöldségek'),
('Brokkoli', 'Zöldségek'),
('Cukkini', 'Zöldségek'),
('Paprika', 'Zöldségek'),
('Uborka', 'Zöldségek'),
('Zeller', 'Zöldségek'),
('Karfiol', 'Zöldségek'),
('Alma', 'Gyümölcsök'),
('Banán', 'Gyümölcsök'),
('Narancs', 'Gyümölcsök'),
('Kivi', 'Gyümölcsök'),
('Eper', 'Gyümölcsök'),
('Szilva', 'Gyümölcsök'),
('Mangó', 'Gyümölcsök'),
('Ananász', 'Gyümölcsök'),
('Datolya', 'Gyümölcsök'),
('Málna', 'Gyümölcsök'),
('Fasírt', 'Fehérjék'),
('Quinoa', 'Szénhidrátok'),
('Couscous', 'Szénhidrátok'),
('Makaróni', 'Szénhidrátok'),
('Kukorica', 'Szénhidrátok'),
('Lencse', 'Szénhidrátok'),
('Fehérbab', 'Szénhidrátok'),
('Fasírozott paradicsom', 'Édesítőszerek'),
('Sztívia', 'Édesítőszerek'),
('Agavészirup', 'Édesítőszerek'),
('Édesburgonya', 'Szénhidrátok'),
('Kókuszliszt', 'Szénhidrátok'),
('Tönkölyliszt', 'Szénhidrátok'),
('Rizsliszt', 'Szénhidrátok'),
('Zabliszt', 'Szénhidrátok'),
('Szezámmag', 'Zsírok'),
('Dió', 'Zsírok'),
('Mogyoró', 'Zsírok'),
('Paradicsomszósz', 'Egyéb'),
('Tárkony', 'Fűszerek'),
('Majoránna', 'Fűszerek'),
('Oregánó', 'Fűszerek'),
('Koriander', 'Fűszerek'),
('Bazsalikom', 'Fűszerek'),
('Kapribogyó', 'Zöldségek'),
('Sárgarépa', 'Zöldségek'),
('Fejes saláta', 'Zöldségek'),
('Karalábé', 'Zöldségek'),
('Kókuszdió', 'Gyümölcsök'),
('Avokádó', 'Gyümölcsök'),
('Mandula', 'Gyümölcsök'),
('Paradicsomlé', 'Gyümölcsök'),
('Hummusz', 'Fehérjék'),
('Fehér bab', 'Fehérjék'),
('Bulgur', 'Szénhidrátok'),
('Kuszkusz', 'Szénhidrátok'),
('Tarhonya', 'Szénhidrátok'),
('Barna rizs', 'Szénhidrátok'),
('Nyírfacukor', 'Édesítőszerek'),
('Xilit', 'Édesítőszerek'),
('Datolya szirup', 'Édesítőszerek'),
('Kókuszolaj', 'Zsírok'),
('Lenmagolaj', 'Zsírok'),
('Dióolaj', 'Zsírok'),
('Avokádóolaj', 'Zsírok'),
('Kukoricaliszt', 'Szénhidrátok'),
('Tönkölybúza', 'Szénhidrátok'),
('Árpa', 'Szénhidrátok'),
('Köles', 'Szénhidrátok'),
('Kókuszreszelék', 'Szénhidrátok'),
('Kurkuma', 'Fűszerek'),
('Kömény', 'Fűszerek'),
('Csípős paprika', 'Fűszerek'),
('Mustár', 'Fűszerek'),
('Túró', 'Egyéb'),
('Vaníliás cukor', 'Édesítőszerek'),
('Olaj', 'Egyéb'),
('Csokoládédarabok', 'Egyéb');

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

-- getAllUserInfos procedure
DROP PROCEDURE if exists getAllUserInfos;
delimiter //
CREATE PROCEDURE getAllUserInfos(IN userID int)
BEGIN
    SELECT * FROM Users WHERE Users.User_ID = userID;
END;
//
delimiter ;

-- getAllRecipeInfos procedure
DROP PROCEDURE if exists getAllRecipeInfos;
delimiter //
CREATE PROCEDURE getAllRecipeInfos()
BEGIN
    SELECT * FROM Recipes;
END;
//
delimiter ;

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

drop procedure if exists loadRecipeInfos;
Delimiter //
CREATE PROCEDURE loadRecipeInfos(IN recipeID int)
BEGIN
    SELECT * FROM Recipes WHERE Recipe_ID = recipeID AND IsVerified = TRUE;
END;
//
delimiter ;

drop procedure if exists loadRecipeInfosAdmin;
Delimiter //
CREATE PROCEDURE loadRecipeInfosAdmin()
BEGIN
    SELECT * FROM Recipes WHERE IsVerified = FALSE;
END;
//
delimiter ;

-- getCommentContent procedure
DROP PROCEDURE if exists getCommentContent;
delimiter //
CREATE PROCEDURE getCommentContent(IN recipeId int)
BEGIN
    SELECT Comments.Comment_ID, Comments.Comment_Text, Comments.Date_Posted, Users.Username FROM Comments 
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

drop procedure if exists giveAdminRole;
Delimiter //
CREATE PROCEDURE giveAdminRole(IN user_email VARCHAR(255))
BEGIN
    UPDATE Users SET IsAdmin = TRUE WHERE Users.Email = user_email;
END;
//
delimiter ;

drop procedure if exists deleteAdminRole;
Delimiter //
CREATE PROCEDURE deleteAdminRole(IN user_email VARCHAR(255))
BEGIN
    UPDATE Users SET IsAdmin = FALSE WHERE Users.Email = user_email;
END;
//
delimiter ;

drop procedure if exists getAdmins;
Delimiter //
CREATE PROCEDURE getAdmins(IN user_email VARCHAR(255))
BEGIN
    SELECT Users.Email, Users.Username, Users.User_ID FROM Users WHERE IsAdmin = TRUE;
END;
//
delimiter ;

drop procedure if exists uploadIngredient;
Delimiter //
CREATE PROCEDURE uploadIngredient(IN ingredientName VARCHAR(255), IN ingredientCategory VARCHAR(255))
BEGIN
    INSERT INTO Ingredients (Ingredient_Name, Ingredient_Category) 
    VALUES (ingredientName, ingredientCategory);
END;
//
delimiter ;

drop procedure if exists removeIngredient;
Delimiter //
CREATE PROCEDURE removeIngredient(IN ingredient_id INT)
BEGIN
    DELETE FROM Ingredients WHERE Ingredients.Ingredient_ID = ingredient_id;
END;
//
delimiter ;

drop procedure if exists updateIngredient;
Delimiter //
CREATE PROCEDURE updateIngredient(IN ingredient_id INT, IN ingredientName VARCHAR(255))
BEGIN
    UPDATE Ingredients SET Ingredients.Ingredient_Name = ingredientName WHERE Ingredients.Ingredient_ID = ingredient_id;
END;
//
delimiter ;

drop procedure if exists verifyRecipe;
Delimiter //
CREATE PROCEDURE verifyRecipe(IN recipeid INT)
BEGIN
    UPDATE Recipes SET IsVerified = TRUE WHERE Recipes.Recipe_ID = recipeid;
END;
//
delimiter ;


drop procedure if exists deleteFromRecipe;
Delimiter //
CREATE PROCEDURE deleteFromRecipe(IN recipeid INT)
BEGIN
    DELETE FROM Recipes WHERE Recipes.Recipe_ID = recipeid;
END;
//
delimiter ;

drop procedure if exists deleteFromTime;
Delimiter //
CREATE PROCEDURE deleteFromTime(IN recipeid INT)
BEGIN
    DELETE FROM Time WHERE Time.Recipe_ID = recipeid;
END;
//
delimiter ;

drop procedure if exists deleteFromRecipe_Ingredients;
Delimiter //
CREATE PROCEDURE deleteFromRecipe_Ingredients(IN recipeid INT)
BEGIN
    DELETE FROM Recipe_Ingredients WHERE Recipe_Ingredients.Recipe_ID = recipeid;
END;
//
delimiter ;

drop procedure if exists getRecipesByCategory;

DELIMITER //
CREATE PROCEDURE getRecipesByCategory(IN category VARCHAR(150))
BEGIN
    SELECT Recipes.Recipe_ID, Recipes.Title, Recipes.Picture_data, Recipes.Food_Category FROM Recipes WHERE Recipes.Food_Category = category AND Recipes.IsVerified = TRUE;
END;
//
DELIMITER //