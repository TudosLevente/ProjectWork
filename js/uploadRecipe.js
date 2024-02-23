function retrieveIngredients() {
    var ingredientInputs = document.getElementsByName("ingredient[]");
    var ingredients = [];

    for (var i = 0; i < ingredientInputs.length; i++) {
        ingredients.push(ingredientInputs[i].value);
    }

    return ingredients;
}

function retrieveQuantities() {
    var quantityInputs = document.getElementsByName("quantity[]");
    var quantities = [];

    for (var i = 0; i < quantityInputs.length; i++) {
        quantities.push(quantityInputs[i].value);
    }

    return quantities;
}

function retrieveMeasurements() {
    var measurementInputs = document.getElementsByName("measurement[]");
    var measurements = [];

    for (var i = 0; i < measurementInputs.length; i++) {
        measurements.push(measurementInputs[i].value);
    }

    return measurements;
}

function retrieveInstructions() {
    var instructionTitles = document.querySelectorAll('[id^="instruction_title"]');
    var instructionInputs = document.querySelectorAll('[id^="instructionInput"]');

    var instructions = [];

    for (var i = 0; i < instructionTitles.length; i++) {
        var title = instructionTitles[i].innerHTML.trim();
        var input = instructionInputs[i].value.trim();
        instructions.push({ title: title, input: input });
    }

    return instructions;
}

function retrievePreparationType() {
    var preparationTypeSelects = document.querySelectorAll('[id^="prep_input"]');
    var preparationTypes = [];

    preparationTypeSelects.forEach(function (select) {
        var preparationType = select.options[select.selectedIndex].innerHTML;
        preparationTypes.push(preparationType);
    });

    return preparationTypes;
}

function retrievePrepTime() {
    var prepTimeInputs = document.querySelectorAll('[id^="prepTimeInput"]');
    var prepTime = [];

    prepTimeInputs.forEach(function (select) {
        var preparationTime = select.value;
        prepTime.push(preparationTime);
    });

    return prepTime;
}

function retrievePrepTimeType() {
    var preparationTimeTypeSelects = document.querySelectorAll('[id ^= "selected_time"]');
    var preparationTimeTypes = [];

    preparationTimeTypeSelects.forEach(function (select) {
        var preparationTimeType = select.options[select.selectedIndex].innerHTML;
        preparationTimeTypes.push(preparationTimeType);
    });

    return preparationTimeTypes;
}

function uploadRecipe() {

    var picture_data_input = document.getElementById('picture_data');
    var title_input = document.getElementById('title');
    var description_input = document.getElementById('description');
    var ingredients_input = retrieveIngredients();
    var quantities_input = retrieveQuantities();
    var measurements_input = retrieveMeasurements();
    var instructions_input = retrieveInstructions();
    var prep_type_input = retrievePreparationType();
    var prep_time_input = retrievePrepTime();
    var prep_time_type_input = retrievePrepTimeType();
    var serving_input = document.getElementById('serving_size');
    var difficulty_level_input = document.getElementById('difficulty');
    var food_category_input = document.getElementById('food_category');

    var userID = null;

    getData('/getLoggedInUserData').then((response) => {
        console.log(response);
        userID = response.user_id;
    }).catch((error) => {
        console.error('Error:', error);
    });

    var recipeData = {
        picture_data: picture_data_input.value,
        title: title_input.value,
        description: description_input.value,
        ingredients: ingredients_input,
        quantities: quantities_input,
        measurements: measurements_input,
        instructions: instructions_input,
        preparation_type: prep_type_input,
        preparation_time: prep_time_input,
        preparation_time_type: prep_time_type_input,
        serving_size: parseInt(serving_input.innerHTML),
        difficulty_level: difficulty_level_input.options[difficulty_level_input.selectedIndex].innerHTML,
        food_category: food_category_input.options[food_category_input.selectedIndex].innerHTML,
        user_id: userID
    };

    postData('http://localhost:8000/api/uploadRecipe', recipeData).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to upload recipe.");
        }

        console.log(response.json());


    }).catch((error) => {
        console.error('Error:', error);
    });

    console.log(picture_data_input.value); //nem tömb
    console.log(title_input.value); //nem tömb
    console.log(description_input.value); //nem tömb
    console.log(ingredients_input); //tömb
    console.log(quantities_input); //tömb
    console.log(measurements_input); //tömb
    console.log(instructions_input); //tömb 
    console.log(prep_type_input); //tömb
    console.log(prep_time_input); // tömb
    console.log(prep_time_type_input); //tömb
    console.log(parseInt(serving_input.innerHTML)); //nem tömb
    console.log(difficulty_level_input.options[difficulty_level_input.selectedIndex].innerHTML); //nem tömb
    console.log(food_category_input.options[food_category_input.selectedIndex].innerHTML); //nem tömb
}