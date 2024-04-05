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

var userID = null;

document.addEventListener('DOMContentLoaded', function () {
    getData('/getLoggedInUserData').then((response) => {
        console.log(response);
        userID = response.user_id;
    }).catch((error) => {
        console.error('Error:', error);
    });
});

function uploadFile() {
    const formData = new FormData();
    const fileInput = document.getElementById('picture_data');
    const titleInput = document.getElementById('title');

    // Check if both file and title inputs are provided
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const title = titleInput.value.trim();
        const extension = file.name.split('.').pop(); // Get file extension

        // Rename the file with the title and extension
        const newFileName = title.replace(/\s+/g, '-');

        // Append the renamed file and title to FormData
        formData.append('picture_data', file);
        formData.append('title', newFileName);

        // Make a fetch request to upload the file and title
        postFormData('http://localhost:8000/api/upload', formData)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }
                return response.text();
            })
            .then(data => {
                // Handle the response data, e.g., display a message or update UI
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function uploadRecipe() {
    uploadFile();
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

    var recipeData = {
        picture_data: picture_data_input.files[0],
        title: title_input.value,
        description: description_input.value,
        ingredient_name: ingredients_input,
        ingredient_quantity: quantities_input,
        ingredient_measurement: measurements_input,
        instructions: instructions_input,
        time_prep_type: prep_type_input,
        time_quantity: prep_time_input,
        time_type: prep_time_type_input,
        serving: parseInt(serving_input.innerHTML),
        difficulty_level: difficulty_level_input.options[difficulty_level_input.selectedIndex].innerHTML,
        food_category: food_category_input.options[food_category_input.selectedIndex].innerHTML,
        user_id: userID
    };

    var pictureData = new FormData();
    pictureData.append('picture_data', picture_data_input.files[0]);

    postData('http://localhost:8000/api/uploadRecipe', recipeData)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to upload recipe.");
            }
            return res.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function cancelUpload() {
    window.location.href = '/';
};