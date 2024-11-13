const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const country = document.getElementById('country');
const score = document.getElementById('score');
const add = document.getElementById('add');
const dynamic = document.querySelector('.dynamic-div');

let data = [];

function updateUI() {
    if (data.length === 0) {
        dynamic.innerHTML = "You have extracted all data.";
        return;
    }

    data.sort((a, b) => b.score - a.score);  // Sort the data based on score in descending order
    let info = "";
    data.forEach((obj, idx) => {
        info += `
            <div class="user-info">
                <span>${idx + 1}</span>
                <span>${obj.name}</span>
                <span>${obj.country}</span>
                <span>${obj.score}</span>
                <div class="btns">
                    <button type="button" data-index="${idx}">+5</button>
                    <button type="button" data-index="${idx}">X</button>
                    <button type="button" data-index="${idx}">-5</button>
                </div>
            </div>
        `;
    });
    dynamic.innerHTML = info;
    buttonWorking();  // Re-attach event listeners after the update
}

function buttonWorking() {
    // Event listeners for all buttons inside the `.btns` div
    document.querySelectorAll('.btns button').forEach((button) => {
        button.addEventListener('click', (event) => {
            const idx = event.target.getAttribute('data-index');  // Get index from the button's data attribute

            if (event.target.innerText === "+5") {
                data[idx].score += 5;
            } else if (event.target.innerText === "-5") {
                data[idx].score -= 5;
            } else if (event.target.innerText === "X") {
                data.splice(idx, 1);  // Remove the item from the array
            }

            updateUI();  // Re-render the UI
        });
    });
}

add.addEventListener('click', () => {
    if (fname.value === '' || lname.value === '' || country.value === '' || score.value === '') {
        alert('Enter All Information Of The Contestant');
        return;
    } else {
        let obj = {
            name: `${fname.value} ${lname.value}`,  // Correct string interpolation
            country: country.value,
            score: +score.value
        };
        data.push(obj);
        updateUI();
    }

    // Clear input fields after adding a contestant
    fname.value = '';
    lname.value = '';
    country.value = '';
    score.value = '';
});
