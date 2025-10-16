// Initialize EmailJS
emailjs.init("-SvEcjUJ53gIa3U4h");

// Project Details Toggle
document.addEventListener('DOMContentLoaded', function() {
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    let activeProject = null;
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const projectDetails = document.getElementById(projectId);
            
            // Close previously opened project
            if (activeProject && activeProject !== projectDetails) {
                activeProject.classList.remove('active');
                const prevButton = activeProject.previousElementSibling.querySelector('.view-details');
                if (prevButton) prevButton.textContent = 'View Details';
            }
            
            // Toggle current project
            if (projectDetails.classList.contains('active')) {
                projectDetails.classList.remove('active');
                this.textContent = 'View Details';
                activeProject = null;
            } else {
                projectDetails.classList.add('active');
                this.textContent = 'Hide Details';
                activeProject = projectDetails;
            }
        });
    });
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-progress')) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width + '%';
                    }, 300);
                }
            }
        });
    }, { threshold: 0.3 });
    
    fadeElements.forEach(el => observer.observe(el));
    skillBars.forEach(el => observer.observe(el));
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 16, 0.95)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(5, 5, 16, 0.8)';
            navbar.style.padding = '1rem 0';
        }
    });
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Add current time to form data
        const timeField = document.createElement('input');
        timeField.type = 'hidden';
        timeField.name = 'time';
        timeField.value = new Date().toLocaleString();
        this.appendChild(timeField);
        
        emailjs.sendForm('Gmail_API', 'template_u2hgis5', this)
            .then(function() {
                // Success message
                alert('✅ Message sent successfully! I\'ll get back to you soon.');
                document.getElementById('contactForm').reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove time field
                if (timeField.parentNode) {
                    timeField.parentNode.removeChild(timeField);
                }
            }, function(error) {
                // Error message
                alert('❌ Failed to send message. Please try again or email me directly at amirhamzabadal2477@gmail.com');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove time field
                if (timeField.parentNode) {
                    timeField.parentNode.removeChild(timeField);
                }
            });
    });
});