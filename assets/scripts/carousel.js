$(document).ready(function() {

    const CAROUSEL_TIME = 7000;

    const PREV = 'prev';
    const NEXT = 'next';
    
    const prevButton = $('.carousel-control-prev');
    const nextButton = $('.carousel-control-next');
    const slides = $('.carousel-item').toArray();

    const lastSlideIndex = slides.length - 1;

    let currentSlideIndex = 0;
    let carouselInterval;

    prevButton.click(() => {
        navigate(PREV);
    });

    nextButton.click(() => {
        navigate(NEXT);
    });

    function navigate(direction) {

        // Stop the automatic image updates
        clearInterval(carouselInterval);

        const previousSlideIndex = currentSlideIndex;

        if (direction === PREV) {
            currentSlideIndex = getPreviousSlideIndex(currentSlideIndex, lastSlideIndex);
        }

        if (direction === NEXT) {
            currentSlideIndex = getNextSlideIndex(currentSlideIndex, lastSlideIndex);
        }

        updateSlides(slides, currentSlideIndex, previousSlideIndex);

        // Restart the automatic image updates
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

function getPreviousSlideIndex(currentIdx, lastSlideIdx) {
    return currentIdx === 0 ? lastSlideIdx : currentIdx - 1;
}

function getNextSlideIndex(currentIdx, lastSlideIdx) {
    return currentIdx === lastSlideIdx ? 0 : currentIdx + 1;
}

function updateSlides(slides, currentSlideIdx, previousSlideIdx) {
    $(slides[previousSlideIdx]).fadeOut();
    $(slides[currentSlideIdx]).fadeIn();
}