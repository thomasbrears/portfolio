// Navigation scroll and scroll-to-top logic
let lastScrollTop = 0; // Keeps track of last scroll position

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

// Theme toggle
document.addEventListener('DOMContentLoaded', (event) => {
  const toggleButton = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  // Function to update the icon based on the theme
  const updateIcon = () => {
    const isDarkMode = document.body.classList.contains('dark-theme');
    if (isDarkMode) {
      toggleButton.innerHTML = '☀️'; // Light mode icon
    } else {
      toggleButton.innerHTML = '🌙'; // Dark mode icon
    }
  };

  // Apply the current theme and update the icon accordingly
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
  updateIcon(); // Update the icon on page load

  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme); // Save the current preference to localStorage
    updateIcon(); // Update the icon on toggle
  });
});


// Function to check whether an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to add 'start' class to element when it comes into view
function animateOnScroll() {
  const headers = document.querySelectorAll('.typed-out-container h2'); // Select all headers you want to apply this to

  headers.forEach((header) => {
    if (isInViewport(header)) {
      header.classList.add('start'); // 'start' class to control animation
    } else {
      header.classList.remove('start'); // Optional: Remove the class if you want the animation to restart every time
    }
  });
}

// Listen for scroll events on the window
window.addEventListener('scroll', animateOnScroll);

// Optional: Run on load if any headers are initially visible
window.addEventListener('load', animateOnScroll);


const canvas = document.getElementById('interactive-canvas');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
let particles = [];
const numberOfParticles = 50;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const initParticles = () => {
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle(Math.random() * width, Math.random() * height));
  }
};

initParticles();

const animate = () => {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  requestAnimationFrame(animate);
};

animate();

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
