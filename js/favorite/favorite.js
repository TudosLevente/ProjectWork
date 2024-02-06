module.exports = class Favorite {

    favorite_id = null;
    user_id = null;
    recipe_id = null;

    constructor(favorite_id = null, user_id = null, recipe_id = null,) {
        this.favorite_id = favorite_id;
        this.user_id = user_id;
        this.recipe_id = recipe_id;
    }
}