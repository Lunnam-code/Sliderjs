var manualSlideIndex = 1;
var autoSlideIndex = 0;
showSlides(manualSlideIndex);

function plusSlides(n) {
    showSlides(manualSlideIndex += n);
}

function currentSlide(n) {
    showSlides(manualSlideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    if (n > slides.length) { manualSlideIndex = 1; }
    if (n < 1) { manualSlideIndex = slides.length; }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[manualSlideIndex - 1].style.display = "block";
    dots[manualSlideIndex - 1].className += " active";
}

// Automatic slide 
function autoSlide() {
    var slides = document.getElementsByClassName("mySlides");
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    autoSlideIndex++;
    if (autoSlideIndex > slides.length) { autoSlideIndex = 1; }
    slides[autoSlideIndex - 1].style.display = "block";
    setTimeout(autoSlide, 3000); // Change image every 3 seconds
}

autoSlide(); // Start the automatic slideshow
