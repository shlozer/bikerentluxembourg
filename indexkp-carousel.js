const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const pauseButton = document.querySelector('.carousel__nav__pause');
const dots = Array.from(dotsNav.children);
var pause_indicator = false;


//console.log(track);
const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
    else {if (targetIndex === (slides.length - 1)) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }}
}

function automaticSwapper () {
    if (pause_indicator) {
        pause_indicator = false;
    }
    else {
        if (!pause_indicator) {
            pause_indicator = true;
        }
    }        

    //clearInterval(automaticMover);
}

pauseButton.addEventListener('click', automaticSwapper);


prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
        
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows (slides, prevButton, nextButton, prevIndex);

    if (pause_indicator) {
        pause_indicator = false;
    }

});



nextButton.addEventListener('click', e =>{
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows (slides, prevButton, nextButton, nextIndex);

    if (pause_indicator) {
        pause_indicator = false;
    }


});

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    //moveToSlide(track, currentSlide, prevSlide);
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);

});

document.addEventListener('DOMContentLoaded', () => {
    
    function Mover() {

        if (pause_indicator) {
            return;
        }
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const prevDot = currentDot.previousElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);
        const prevIndex = slides.findIndex(slide => slide === prevSlide);
        const firstSlide = slides[0];
        const firstDot = dots[0];

        //console.log(nextIndex);
        
        if (nextIndex === -1) {
            moveToSlide(track, currentSlide, firstSlide);
            updateDots(currentDot, firstDot);
            hideShowArrows (slides, prevButton, nextButton, 0);
            return;
        }
        
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows (slides, prevButton, nextButton, nextIndex);

    }
    
    function automaticMover () {
        setInterval(Mover, 1500)
    }

    function automaticMoverLate () {
        setTimeout(automaticMover, 1000);
    }

    //document.addEventListener('DOMContentLoaded', automaticMoverLate());
    window.addEventListener('load', automaticMoverLate());
    //pauseButton.addEventListener('click', automaticSwapper);
});