function displayImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageSrc = e.target.result;
            document.getElementById('imageContainer').style.backgroundImage = `url('${imageSrc}')`;
            document.getElementsById('imageContainer').style.backgroundRepeat = 'no-repeat';
            document.getElementById('picture_data').style.display = 'block';
            document.getElementById('picture_data').style.visibility = 'hidden';
        };
        reader.readAsDataURL(file);
    }
}