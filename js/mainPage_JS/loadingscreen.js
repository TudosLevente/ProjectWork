function AnimateLoadingScreen() {
    document.getElementById('loading_screen').style.display = 'flex';
    let slices = document.querySelectorAll('.loading_screen_slice');
    let sliceCount = slices.length;
    let currentSliceIndex = 0;
    let isDisappearing = true;

    function toggleSliceVisibility(index, isVisible) {
        slices[index].style.transition = 'opacity 0.3s ease';
        slices[index].style.opacity = isVisible ? 1 : 0;
    }

    function animateSlices() {
        if (isDisappearing) {
            if (currentSliceIndex < sliceCount) {
                toggleSliceVisibility(currentSliceIndex, false);
                currentSliceIndex++;
            } else {
                currentSliceIndex = 0;
                isDisappearing = false;
            }
        } else {
            if (currentSliceIndex < sliceCount) {
                toggleSliceVisibility(currentSliceIndex, true);
                currentSliceIndex++;
            } else {
                resetPizza();
            }
        }
    }

    function resetPizza() {
        currentSliceIndex = 0;
        isDisappearing = true;
    }

    // Initial animation
    setInterval(animateSlices, 220);

    setTimeout(() => {
        document.getElementById('loading_screen').classList.add('fadeOut');
        setTimeout(() => {
            document.getElementById('loading_screen').style.display = 'none';
        }, 1000);
    }, 1100);

}

window.onload = function () {
    AnimateLoadingScreen();
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}