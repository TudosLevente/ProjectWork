function displayImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageSrc = e.target.result;
            document.getElementById('imageContainer').style.backgroundImage = `url('${imageSrc}')`;
            document.getElementById('imageContainer').style.backgroundRepeat = 'no-repeat';
            document.getElementById('imageContainer').style.backgroundSize = 'contain';
            document.getElementById('picture_data').style.display = 'none';
            document.getElementById('recipe_image_input_label').style.display = 'none';
            document.getElementById('recipe_image_delete_button').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function deleteImage() {
    var imageContainer = document.getElementById('imageContainer');
    imageContainer.style.backgroundImage = 'none';
    document.getElementById('picture_data').style.display = 'none';
    document.getElementById('recipe_image_input_label').style.display = 'block';
    document.getElementById('recipe_image_delete_button').style.display = 'none';
}