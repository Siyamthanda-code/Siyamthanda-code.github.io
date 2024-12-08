const firebase = window.firebase;
const database = firebase.database();
const reservationsRef = database.ref('reservations');

/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});



/** * RESERVATION */
document.addEventListener('submit', (e) => {
  console.log('Form submitted!');
  if (e.target.classList.contains('form-left')) {
  e.preventDefault();
  const nameInput = document.querySelector('input[name="name"]');
  const phoneInput = document.querySelector('input[name="phone"]');
  const personSelect = document.querySelector('select[name="person"]');
  const reservationDateInput = document.querySelector('input[name="reservation-date"]');
  const timeSelect = document.querySelector('select[name="time"]');
  const messageInput = document.querySelector('textarea[name="message"]');

    if (nameInput.value && phoneInput.value && personSelect.value && reservationDateInput.value && timeSelect.value) {
const reservation = {
name: nameInput.value,
phone: phoneInput.value,
numberOfPeople: personSelect.value,
reservationDate: reservationDateInput.value,
time: timeSelect.value,
message: messageInput.value || ''
};

  
const reservationsRef = window.reservationsRef;
reservationsRef.push(reservation)
.then(() => {
nameInput.value = '';
phoneInput.value = '';
personSelect.value = '1-person';
reservationDateInput.value = '';
timeSelect.value = '08:00am';
messageInput.value = '';
alert('Reservation submitted successfully!');
})
.catch((error) => {
console.error('Error submitting reservation:', error);
alert('There was an error submitting your reservation. Please try again.');
});
} else {
alert('Please fill in all required fields.');
}
}
});
  


/**
 * FOOTER
 */

// Initialize EmailJS with your public key and additional settings
(function(){
  emailjs.init({
    publicKey: 'wLU48TQDY13rFak04', // Replace with your actual EmailJS public key
    // Do not allow headless browsers
    blockHeadless: true,
    blockList: {
      // Block the suspended emails
      list: ['foo@emailjs.com', 'bar@emailjs.com'],
      // The variable contains the email address
      watchVariable: 'userEmail',
    },
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 10000,
    },
  });
})();

document.getElementById('subscribe-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the email address from the input field
  var email = document.querySelector("input[name='email_address']").value;

  // Prepare the parameters for the email service
  var params = {
      email: email,
  };

  const serviceID = "service_4ezgvn9"; // Your EmailJS service ID
  const templateID = "template_kom7p67"; // Your EmailJS template ID

  // Send the email using EmailJS
  emailjs.send(serviceID, templateID, params)
      .then(res => {
          // Clear the input field after successful submission
          document.querySelector("input[name='email_address']").value = "";
          alert("Your message was sent successfully!");
      })
      .catch(err => {
          console.error(err);
          alert("Failed to send your message. Please try again.");
      });
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
}
});