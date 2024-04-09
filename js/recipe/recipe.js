module.exports = class Recipe {
    recipe_id = null;
    user_id = null;
    picture_data = "";
    title = "";
    description = "";
    instructions = "";

    ingredient_name = {};
    ingredient_quantity = "";
    ingredient_measurement = "";


    time_prep_type = "";
    time_quantity = "";
    time_type = "";

    serving = 0;
    difficulty_level = "";
    food_category = "";
    date_created = "";

    constructor(
        recipe_id = null,
        user_id = null,
        picture_data,
        title,
        description,
        instructions,
        ingredient_name,
        ingredient_quantity,
        ingredient_measurement,
        time_prep_type,
        time_quantity,
        time_type,
        serving,
        difficulty_level,
        food_category,
        date_created
    ) {
        this.recipe_id = recipe_id;
        this.user_id = user_id;
        this.picture_data = picture_data;
        this.title = title;
        this.description = description;
        this.instructions = instructions;
        //---
        this.ingredient_name = ingredient_name;
        this.ingredient_quantity = ingredient_quantity;
        this.ingredient_measurement = ingredient_measurement;
        this.time_prep_type = time_prep_type;
        this.time_quantity = time_quantity;
        this.time_type = time_type;
        //---
        this.serving = serving;
        this.difficulty_level = difficulty_level;
        this.food_category = food_category;
        this.date_created = date_created;
    }
}