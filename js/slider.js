const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;

slides[currentSlide].style.display = 'block';

prevButton.addEventListener('click', () => {
  slides[currentSlide].style.display = 'none';
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  slides[currentSlide].style.display = 'block';
});

nextButton.addEventListener('click', () => {
  slides[currentSlide].style.display = 'none';
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].style.display = 'block';
});
