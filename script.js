const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const dotsContainer = document.querySelector('#dotsContainer');
const progressBar = document.querySelector('#progressBar');

let counter = 0;
let slideInterval;
const duration = 4000; // 4 detik

// 1. Inisialisasi Dots
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// 2. Fungsi Animasi Progress Bar
function resetProgressBar() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    
    // Force Reflow
    void progressBar.offsetWidth; 
    
    progressBar.style.transition = `width ${duration}ms linear`;
    progressBar.style.width = '100%';
}

// 3. Update Tampilan Slider
function updateSlider() {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[counter].classList.add('active');
    dots[counter].classList.add('active');
    
    resetProgressBar();
}

function nextSlide() {
    counter = (counter + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    counter = (counter - 1 + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    counter = index;
    updateSlider();
    restartTimer();
}

// 4. Timer Logic
function startTimer() {
    resetProgressBar();
    slideInterval = setInterval(nextSlide, duration);
}

function restartTimer() {
    clearInterval(slideInterval);
    startTimer();
}

// Event Listeners
nextBtn.addEventListener('click', () => {
    nextSlide();
    restartTimer();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    restartTimer();
});

// Jalankan Slider
startTimer();