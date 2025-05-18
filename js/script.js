// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slideshow
    initSlideshow();
    
    // Add current year to copyright in footer
    updateCopyright();
});

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slider img');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds
    
    // Initialize automatic slideshow
    let slideTimer = setInterval(nextSlide, slideInterval);
    
    // Add click event to dots for manual navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideTimer);
            currentSlide = index;
            updateSlideshow();
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    });
    
    // Function to move to the next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlideshow();
    }
    
    // Update slideshow display
    function updateSlideshow() {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Deactivate all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate current dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
}

// Update copyright year in footer
function updateCopyright() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copyright p');
    
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2023', currentYear);
    }
}

// Mobile menu toggle functionality
const createMobileMenu = () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    header.appendChild(mobileMenuBtn);
    
    // Add toggle functionality
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-active');
        
        // Change icon based on menu state
        if (nav.classList.contains('mobile-active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
};

// Initialize mobile menu on smaller screens
window.addEventListener('load', () => {
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
});

// Reinitialize mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
        createMobileMenu();
    } else if (window.innerWidth > 768 && document.querySelector('.mobile-menu-btn')) {
        document.querySelector('.mobile-menu-btn').remove();
        document.querySelector('nav').classList.remove('mobile-active');
    }
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for fixed header
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (document.querySelector('.mobile-active')) {
                document.querySelector('nav').classList.remove('mobile-active');
                document.querySelector('.mobile-menu-btn').innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
}); 