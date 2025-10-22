const tabs = document.querySelectorAll('.product-tab-btn');
const tabContents = document.querySelectorAll('.product-tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('product-tab-active'));
        tabContents.forEach(content => content.classList.remove('product-tab-active'));

        tab.classList.add('product-tab-active');
        document.getElementById(tabName).classList.add('product-tab-active');
    });
});

const stars = document.querySelectorAll('.product-star');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.rating);
        updateStars();
    });

    star.addEventListener('mouseenter', () => {
        const rating = parseInt(star.dataset.rating);
        highlightStars(rating);
    });
});

document.querySelector('.product-rating-stars').addEventListener('mouseleave', () => {
    updateStars();
});

function highlightStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('product-star-active');
            star.textContent = '★';
        } else {
            star.classList.remove('product-star-active');
            star.textContent = '☆';
        }
    });
}

function updateStars() {
    highlightStars(selectedRating);
}

const reviewForm = document.getElementById('reviewForm');

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn load lại trang
    
    if (selectedRating === 0) {
        alert('Please select a rating!');
    } else {
        alert('Thank you for your review!');
        reviewForm.reset();
        selectedRating = 0;
        updateStars();
    }
});

const sizeButtons = document.querySelectorAll('.size-btn');
let selectedSize = null;

sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        sizeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.dataset.size;
        console.log('Selected size:', selectedSize);
    });
});

const colorButtons = document.querySelectorAll('.color-btn');
let selectedColor = null;

colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        colorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = btn.dataset.color;
        console.log('Selected color:', selectedColor);
    });
});
