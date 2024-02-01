module.exports = class Comment {

    comment_id = null;
    user_id = null;
    recipe_id = null;
    comment_text = "";
    date_posted	= "";

    constructor (comment_id = null,user_id = null,recipe_id = null,comment_text,date_posted) {
        this.comment_id = comment_id;
        this.user_id = user_id;
        this.recipe_id = recipe_id;
        this.comment_text = comment_text;
        this.date_posted = date_posted;
    }
}