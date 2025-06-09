// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const formMessage = document.getElementById('form-message');
    
    formMessage.textContent = `Thank you, ${name}! Your message has been received. We'll get back to you soon.`;
    formMessage.style.display = 'block'; // Ensure it's visible

    // Optional: Hide message after a few seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
        formMessage.textContent = '';
    }, 5000); // Hide after 5 seconds
    
    this.reset();

    // In a real application, you'd send this data to a backend server:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         name: name,
    //         email: this.querySelector('input[type="email"]').value,
    //         subject: this.querySelector('input[type="text"][placeholder="Subject"]').value,
    //         message: this.querySelector('textarea').value
    //     }),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));
});

// Dynamic counter animation for stats
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const targetText = stat.textContent; // e.g., "15,000+"
        const target = parseInt(targetText.replace(/[^\d]/g, '')); // Extract number
        const hasPlus = targetText.includes('+');

        let current = 0;
        const duration = 2000; // milliseconds
        let startTime = null; // Use let for mutable variable

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;

            if (progress < 1) {
                current = target * progress;
                stat.textContent = Math.floor(current).toLocaleString() + (hasPlus ? '+' : '');
                requestAnimationFrame(step);
            } else {
                stat.textContent = target.toLocaleString() + (hasPlus ? '+' : '');
            }
        }
        requestAnimationFrame(step);
    });
}

// Intersection Observer for animations and stat counter
const observerOptions = {
    threshold: 0.1, // Element is 10% visible
    rootMargin: '0px 0px -50px 0px' // Adjust trigger point
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in animation to general sections
            if (entry.target.classList.contains('fade-in') || entry.target.classList.contains('slide-in-left')) {
                entry.target.style.animationDelay = '0.2s'; // Small delay for staggered effect
                entry.target.classList.add('fade-in'); // or slide-in-left
            }

            // Trigger number animation for stats section once
            if (entry.target.id === 'stats' && !entry.target.dataset.animated) {
                animateNumbers();
                entry.target.dataset.animated = 'true'; // Mark as animated to prevent re-triggering
            }
            // Stop observing once animated, but keep observing if you want re-animations on scroll
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Observe all relevant elements for animation
document.querySelectorAll('header, main section, .post-card, .contact-card').forEach(el => {
    observer.observe(el);
});
