function refreshTime() {
    const inputs = document.querySelectorAll(".preparation_div_row_type_small_input");
    inputs.forEach(function (input) {
        input.addEventListener("change", addTime);
    });
};

function addTime() {
    const times = document.querySelectorAll('.preparation_div_row_type_small_input');

    const sumTime = document.getElementById('sum_time');

    var sum = 0;

    times.forEach(function (time) {
        sum += parseInt(time.value);

        sumTime.innerHTML = sum + " perc";
    });
};

refreshTime();