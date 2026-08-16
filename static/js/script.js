document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.99)';
            header.style.boxShadow = '0 2px 8px rgba(45, 90, 61, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navBtn = document.querySelector('.navbar .btn');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Very simple toggle logic for mobile since we are a single page
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(255, 255, 255, 0.99)';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid var(--primary-green)';
            }
        });
    }

    // Stats Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / 50; // Speed adjustment
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(animateCounters, 30);
            } else {
                counter.innerText = target + (target > 50 ? '+' : ''); // Add + for large numbers
            }
        });
    };

    // Use Intersection Observer for stats animation
    const statsSection = document.getElementById('stats');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // Enquiry Form Submission Alert
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real Django app, this would be an AJAX request or form POST
            const studentName = document.getElementById('studentName').value;
            
            alert(`Success! Thank you ${studentName}. Your enquiry has been submitted. Our team will contact you shortly.`);
            
            enquiryForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Hide mobile menu on click
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Chatbot Icon Interaction
    const chatbotBtn = document.getElementById('chatbotBtn');
    if (chatbotBtn) {
        chatbotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Chat Bot Activated! 💬\n\nWelcome to Cricket Academy Support.\n\nHow can we help you today?\n\n• Enquire about training programs\n• Ask about fees\n• General questions\n\nFor immediate assistance, please use WhatsApp or call +91-9733202925');
        });
    }

});
