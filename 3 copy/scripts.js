const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper div");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;
const intervalDuration = 3000; 
let intervalId; 


//Let's work on the infinte or loop scrolling effect

//get the number of card that can fit in the carousel at once
let cardPerview = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginningof the carousel for infinit e scrolling 
carouselChildrens.slice(-cardPerview).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML)
});

// Insert copies of the first few cards to end of the carousel for infinite scrolling 
carouselChildrens.slice(0, cardPerview).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML)
});



const infiniteScroll = () =>{
  //if the carousel is at the begging, scrol to the end
  if(carousel.scrollLeft === 0){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  } 
  //if the carousel is at the end, scroll beginning
  else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

}

// for mousemovement 


const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging")
  //records the initial cursor and scroll possition of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) =>{
  if (!isDragging) return // if isdragging is full from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () =>{
    //if clicked button is left, then substract first card width from the carousel scrollLeft else add to it
    carousel.scrollLeft += btn.id ===  "left" ? -firstCardWidth : firstCardWidth;
  })
});

// Function to move the carousel to the right
const moveRight = () => {
  carousel.scrollLeft += firstCardWidth;
  restartAutoplay(); // Restart autoplay after manual navigation
};

// Function to start the autoplay
const startAutoplay = () => {
  intervalId = setInterval(moveRight, intervalDuration);
};

// Function to restart the autoplay
const restartAutoplay = () => {
  clearInterval(intervalId);
  startAutoplay();
};

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    moveRight();
    stopAutoplay(); // Stop autoplay when manual navigation occurs
  });
});

// Add event listeners for drag start and scroll to restart autoplay
carousel.addEventListener('mousedown', () => {
  stopAutoplay();
});

carousel.addEventListener('scroll', () => {
  restartAutoplay();
});

// Start autoplay when the page loads
startAutoplay();



carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);//stop dragging when mouse is released
carousel.addEventListener('scroll', infiniteScroll);
wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
