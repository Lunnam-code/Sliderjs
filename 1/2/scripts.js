var sliderIndex = 1;
showSlides(sliderIndex);

function plusSlides(n){
  showSlides(sliderIndex += n);
}

function currentSlides(n){
  showSlides(sliderIndex = n);
}

function showSlides(n){
  var i;
  var slides = document.getElementsByClassName('mySlides');
  var dots = document.getElementsByClassName('dot');
  if (n > slides.length){ sliderIndex = 1}
  if (n < 1){sliderIndex = slides.length}
  for (i = 0; i < slides.length; i++){
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++){
    dots[i].className = dots[i].className.replace("active","");
  }
  slides[sliderIndex - 1].style.display = "block";
  dots[sliderIndex - 1].className += " active";
}




