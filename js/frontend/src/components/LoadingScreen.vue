<template>
    <div class="loading_screen_blur" id="loading_screen">
        <div class="loading_screen_body_div">
            <div class="loading_screen_pizza">
                <img class="loading_screen_slice" src="@/assets/images/mainPage_Image/pizzaslice.png" alt="Pizza slice">
                <img class="loading_screen_slice" src="@/assets/images/mainPage_Image/pizzaslice.png" alt="Pizza slice">
                <img class="loading_screen_slice" src="@/assets/images/mainPage_Image/pizzaslice.png" alt="Pizza slice">
                <img class="loading_screen_slice" src="@/assets/images/mainPage_Image/pizzaslice.png" alt="Pizza slice">
                <img class="loading_screen_slice" src="@/assets/images/mainPage_Image/pizzaslice.png" alt="Pizza slice">
                <img class="loading_screen_slice" src="@/assets/images/mainPage_Image/pizzaslice.png" alt="Pizza slice">
            </div>
        </div>
    </div>
</template>

<script>
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
}
</script>

<style scoped>
.loading_screen_blur {
    backdrop-filter: blur(10px);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    zoom: 50%;
}

.loading_screen_body_div {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    zoom: 50%;
    position: absolute;
    z-index: 1;
    backdrop-filter: blur(10px);
}

.loading_screen_pizza {
    width: 500px;
    height: 500px;
    position: relative;
}

.loading_screen_slice {
    width: 460px;
    height: 420px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 50% 50%;
}

.loading_screen_slice:nth-child(1) {
    transform: translate(-50%, -50%) rotate(30deg) translate(150px) rotate(95deg);
}

.loading_screen_slice:nth-child(2) {
    transform: translate(-50%, -50%) rotate(90deg) translate(150px) rotate(95deg);
}

.loading_screen_slice:nth-child(3) {
    transform: translate(-50%, -50%) rotate(150deg) translate(150px) rotate(95deg);
}

.loading_screen_slice:nth-child(4) {
    transform: translate(-50%, -50%) rotate(210deg) translate(150px) rotate(95deg);
}

.loading_screen_slice:nth-child(5) {
    transform: translate(-50%, -50%) rotate(270deg) translate(150px) rotate(95deg);
}

.loading_screen_slice:nth-child(6) {
    transform: translate(-50%, -50%) rotate(330deg) translate(150px) rotate(95deg);
}

.fadeOut {
    animation: fadeOut 1s ease forwards;
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
</style>