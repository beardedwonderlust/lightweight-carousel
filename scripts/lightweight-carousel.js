const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide .img');
//Buttons
const previousBtn = document.querySelector('#previousBtn');
const nextBtn = document.querySelector('#nextBtn');
//Counter
let counter = 1;
//const size = carouselImages[0].clientWidth;
let carouselWidth = carouselSlide.offsetWidth;
//console.log('width:  ' + carouselWidth);

const addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

initilize();

nextBtn.addEventListener('click', () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = 'transform 0.2s ease-in-out';
  counter++;
  carouselSlide.style.transform = 'translateX(' + (-carouselWidth * counter) + 'px)';
});

previousBtn.addEventListener('click', () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = 'transform 0.2s ease-in-out';
  counter--;
  carouselSlide.style.transform = 'translateX(' + (-carouselWidth * counter) + 'px)';
});


carouselSlide.addEventListener('transitionend', () => {
  if (carouselImages[counter].id === 'lastClone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = 'translateX(' + (-carouselWidth * counter) + 'px)';
  }
  if (carouselImages[counter].id === 'firstClone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = 'translateX(' + (-carouselWidth * counter) + 'px)';

  }
});
addEvent(window, "resize", function(event) {
  console.log('resized');
  initilize();
});

function initilize()
{
  carouselWidth = carouselSlide.offsetWidth;
	carouselSlide.style.transition = 'none';
	carouselSlide.style.transform = 'translateX(' + (-carouselWidth * counter) + 'px)';
  for(var i = 0; i < carouselImages.length; i++) {
      carouselImages[i].style.minWidth = (carouselWidth + 'px');
  }
}