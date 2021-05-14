$(document).ready(function() {

    // Used CONST here as I don't want these values to change 
    // lexical scoping to determine the timing value for each picture to be assigned before the functiion is carried out
    
    const CAROUSEL_TIME = 7000; 

    const PREV = 'prev';
    const NEXT = 'next';
    
    const prevButton = $('.carousel-control-prev');
    const nextButton = $('.carousel-control-next');
    const slides = $('.carousel-item').toArray();

    const lastSlideIndex = slides.length - 1;

    // LET used here as the values will change by incrementing and decremanting through the images on display

    let currentSlideIndex = 0;
    let carouselInterval;

    prevButton.click(() => {
        navigate(PREV);
    });

    nextButton.click(() => {
        navigate(NEXT);
    });

    function navigate(direction) {

        // Stopping the automatic image updates

        clearInterval(carouselInterval);

        const previousSlideIndex = currentSlideIndex;

        //Setting the direction of the image to determine an increment or a decrement on clicking

        if (direction === PREV) {
            currentSlideIndex = getPreviousSlideIndex(currentSlideIndex, lastSlideIndex);
        }

        if (direction === NEXT) {
            currentSlideIndex = getNextSlideIndex(currentSlideIndex, lastSlideIndex);
        }

        updateSlides(slides, currentSlideIndex, previousSlideIndex);

        // Restarting the automatic image updates

        carouselInterval = initCarouselTimer();
    }

    function initCarouselTimer() {
        return setInterval(() => {
            const previousSlideIndex = currentSlideIndex;
            currentSlideIndex = getNextSlideIndex(currentSlideIndex, lastSlideIndex);

            updateSlides(slides, currentSlideIndex, previousSlideIndex);
        }, CAROUSEL_TIME)
    };

    carouselInterval = initCarouselTimer();
});


//Setting the values of the pictures where they slide from one to the next
//determining the end or start of the images to either go back to the end 
//when the start is reached or go to the start when the end is reached

function getPreviousSlideIndex(currentIdx, lastSlideIdx) {
    return currentIdx === 0 ? lastSlideIdx : currentIdx - 1;
}

function getNextSlideIndex(currentIdx, lastSlideIdx) {
    return currentIdx === lastSlideIdx ? 0 : currentIdx + 1;
}

// Creating a transition to fade in and out of the pictures 

function updateSlides(slides, currentSlideIdx, previousSlideIdx) {
    $(slides[previousSlideIdx]).fadeOut(3000);
    $(slides[currentSlideIdx]).fadeIn(3000);
}