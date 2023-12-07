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

-- Create tables --
CREATE TABLE IF NOT EXISTS Users (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Ingredients (
    Ingredient_ID INT AUTO_INCREMENT PRIMARY KEY,
    Ingredient_Name VARCHAR(255) NOT NULL,
    Ingredient_Category VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS Recipe_Ingredients (
    Recipe_Ingredient_ID INT AUTO_INCREMENT PRIMARY KEY,
    Ingredient_ID INT,
    Quantity INT,
    Measurement VArCHAR(30),
    FOREIGN KEY (Ingredient_ID)
        REFERENCES Ingredients (Ingredient_ID)
);

CREATE TABLE IF NOT EXISTS Time (
    Time_ID INT AUTO_INCREMENT PRIMARY KEY,
    Time_Prep_Type VARCHAR(30),
    Time_Quantity INT,
    Time_Type VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS Recipes (
    Recipe_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    Picture_file_name VARCHAR(255),
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    Recipe_Ingredient_ID INT,
    Instructions TEXT,
    Time_ID INT,
    Serving INT,
    Difficulty_Level VARCHAR(30),
    Food_Category VARCHAR(30),
    Date_Created DATE,
    FOREIGN KEY (User_ID)
        REFERENCES Users (User_ID),
    FOREIGN KEY (Time_ID)
        REFERENCES Time (Time_ID),
    FOREIGN KEY (Recipe_Ingredient_ID)
        REFERENCES Recipe_Ingredients (Recipe_Ingredient_ID)
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


INSERT INTO Users (Username, Email, Password) VALUES ('Levi', 'levi@gmail.com', 'levi123');
