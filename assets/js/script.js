'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}



/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}


  // Get the form element
  const contactForm = document.querySelector('.contact-form');

  // Form submission event listener
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission (page reload)

    // Get the input fields and values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Simple validation: Ensure all fields are filled
    if (name && email && phone && message) {
      const formData = {
        name: name,
        email: email,
        phone: phone,
        message: message
      };

      // Send data to server using fetch API
      fetch('/submit-contact', {
        method: 'POST',  // POST request
        headers: {
          'Content-Type': 'application/json',  // Sending JSON
        },
        body: JSON.stringify(formData),  // Convert formData to JSON format
      })
      .then(response => response.json())  // Parse JSON response
      .then(data => {
        // Handle success response
        if (data.success) {
          alert('Your message has been sent successfully!');
          contactForm.reset();  // Reset the form after submission
        } else {
          alert('There was an error sending your message. Please try again later.');
        }
      })
      .catch(error => {
        // Handle network or server errors
        alert('There was a problem with your request. Please try again.');
        console.error('Error:', error);
      });
    } else {
      alert('Please fill out all fields.');
    }
  });

