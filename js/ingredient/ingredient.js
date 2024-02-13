module.exports = class Ingredient {

    ingredient_id = null;
    ingredient_name = "";
    ingredient_category = "";

    constructor(ingredient_id = null, ingredient_name, ingredient_category) {
        this.ingredient_id = ingredient_id;
        this.ingredient_name = ingredient_name;
        this.ingredient_category = ingredient_category;
    }
}