/* // Navigation scroll and scroll-to-top logic
let lastScrollTop = 0; // Keeps track of last scroll position
*/
window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Scroll to top button display logic
    let scrollBtn = document.getElementById("scroll-to-top");
    if (currentScroll > 100) { // Show after 100px of scroll
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }

    // Navbar hide/show logic
    if (currentScroll > lastScrollTop && currentScroll > 80) { // Hide navbar after 80px of scroll
        document.getElementById("navbar").style.top = "-60px"; // Adjust value to navbar height
    } else {
        document.getElementById("navbar").style.top = "0"; // Show navbar
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
}, false); 

// Scroll to top button click logic
document.getElementById("scroll-to-top").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Function to close the mobile menu
function closeMenu() {
  var navLinks = document.querySelector('.nav-links');
  if (navLinks.classList.contains('active')) { // Check if the menu is open
    navLinks.classList.remove('active'); // Close the menu
  }
}

function toggleMenu() {
  var navLinks = document.querySelector('.nav-links');
  var brandName = document.querySelector('.brand-name');
  navLinks.classList.toggle('active');
  brandName.classList.toggle('adjusted'); 
}

// Add click event listeners to all nav links for mobile menu close
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMenu); // Close menu when a link is clicked
});

// Toggle dropdown menu for touch devices
function toggleDropdown(e) {
  e.preventDefault(); // Prevent link from navigating to #projects
  var dropdownContent = e.target.nextElementSibling; // Get the next element, which should be the dropdown content
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("checkbox");
  const themeSwitch = document.getElementById("themeSwitch");
  const ball = document.getElementById("ball");
  const body = document.body;

  // Retrieve theme from localStorage
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    body.classList.add("light-theme");
    themeSwitch.style.backgroundColor = "#ebf7ed"; // Light background
    ball.style.transform = "translateX(24px)"; // Ball position for light mode
    checkbox.checked = true;
  } else {
    body.classList.add("dark-theme");
    themeSwitch.style.backgroundColor = "#000"; // Dark background
    ball.style.transform = "translateX(0)"; // Ball position for dark mode
  }

  // Listen for checkbox state change
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      body.classList.replace("dark-theme", "light-theme");
      themeSwitch.style.backgroundColor = "#ebf7ed"; // Light background
      ball.style.transform = "translateX(24px)";
      localStorage.setItem("theme", "light");
    } else {
      body.classList.replace("light-theme", "dark-theme");
      themeSwitch.style.backgroundColor = "#000"; // Dark background
      ball.style.transform = "translateX(0)";
      localStorage.setItem("theme", "dark");
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.toggle-button');
  const categories = document.querySelectorAll('.tech-category');
  
  // Set default category to languages
  document.getElementById('languages').classList.add('active');
  document.querySelector('.toggle-button[data-category="languages"]').classList.add('active');
  
  buttons.forEach(button => {
      button.addEventListener('click', function () {
          const category = button.getAttribute('data-category');
          
          // Hide all categories
          categories.forEach(cat => cat.classList.remove('active'));
          
          // Show the selected category
          document.getElementById(category).classList.add('active');
          
          // Remove active class from all buttons and add it to the clicked button
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
      });
  });
});
