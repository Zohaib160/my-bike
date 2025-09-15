let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthItems = items.length;

// ✅ clone first item and add it to the end
let firstClone = items[0].cloneNode(true);
list.appendChild(firstClone);

// update items after cloning
items = document.querySelectorAll('.slider .list .item');

function reloadSlider(transition = true) {
    let checkLeft = items[active].offsetLeft;
    list.style.transition = transition ? "left 0.8s ease" : "none"; 
    list.style.left = -checkLeft + 'px';

    // update dots only for real slides
    if (active < lengthItems) {
        document.querySelector('.slider .dots li.active').classList.remove('active');
        dots[active].classList.add('active');
    }
}

next.onclick = function () {
    active++;
    reloadSlider();

    // when reaching the clone, reset back to real first
    if (active === lengthItems) {
        setTimeout(() => {
            active = 0;
            reloadSlider(false); // no transition when resetting
        }, 800); // wait for transition to finish
    }
};

prev.onclick = function () {
    active = (active - 1 < 0) ? lengthItems - 1 : active - 1;
    reloadSlider();
};

dots.forEach((li, key) => {
    li.addEventListener('click', function () {
        active = key;
        reloadSlider();
    });
});

let refreshSlider = setInterval(() => { next.click(); }, 5000);
