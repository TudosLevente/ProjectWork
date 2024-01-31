module.exports = class Recipe {
    recipe_id = null;
    user_id = null;
    picture_file_name = "";
    title = "";
    description = "";
    instructions = "";
    serving = 0;
    difficulty_level = "";
    food_category = "";
    date_created = "";

    constructor (recipe_id = null,user_id = null,picture_file_name,title,description,instructions,serving,difficulty_level,food_category,date_created) {
        this.recipe_id = recipe_id;
        this.user_id = user_id;
        this.picture_file_name = picture_file_name;
        this.title = title;
        this.description = description;
        this.instructions = instructions;
        this.serving = serving;
        this.difficulty_level = difficulty_level;
        this.food_category = food_category;
        this.date_created = date_created;
    }
}