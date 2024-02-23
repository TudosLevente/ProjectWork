function refreshTime() {
    const time_inputs = document.querySelectorAll(".preparation_div_row_type_small_input");
    const time_type_inputs = document.querySelectorAll('[id^="selected_time"]');

    time_inputs.forEach(function (input) {
        input.addEventListener("change", addTime);
    });

    time_type_inputs.forEach(function (input) {
        input.addEventListener("change", addTime);
    });
};

function addTime() {
    const times = document.querySelectorAll('.preparation_div_row_type_small_input');

    const sumTime = document.getElementById('sum_time')

    const numberOfElements = document.querySelectorAll('[id^="selected_time"]').length + 1;

    var counter = 1;

    var sum = 0;

    times.forEach(function (time) {
        const selected_time = document.getElementById(`selected_time${counter}`);

        if (selected_time.value == "perc") {
            sum += parseInt(time.value);
        }
        else if (selected_time.value == "óra") {
            sum += parseInt(time.value * 60);
        }
        else if (selected_time.value == "nap") {
            sum += parseInt(time.value * 24 * 60);
        }

        sumTime.innerHTML = sum + " perc";
        counter++;
    });
};

refreshTime();