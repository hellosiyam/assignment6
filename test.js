    // document.addEventListener("DOMContentLoaded", function () {
    //     const loadBtn = document.getElementById("loadBtn");
    //     const spinnerContainer = document.getElementById("spinnerContainer");

    //     loadBtn.addEventListener("click", function () {
    //         // Show the spinner
    //         spinnerContainer.classList.remove("hidden");

    //         // Simulate a loading process (e.g., API call)
    //         setTimeout(() => {
    //             spinnerContainer.classList.add("hidden");
    //         }, 3000);
    //     });
    // });

document.addEventListener ('DOMContentLoaded', () =>{
    const loadBtn = document.getElementById('loadBtn');
    const spinnerContainer = document.getElementById('spinnerContainer');

    loadBtn.addEventListener('click', () => {
        spinnerContainer.classList.remove('hidden');

        setTimeout(() => {
            spinnerContainer.classList.add('hidden');
        }, 2000)

    });    
});
