
// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');

    if (mobileMenu.classList.contains('open')) {
        mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Navigation
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const section = item.getAttribute('data-section');

        // Update active tab
        document.querySelectorAll('.tab-trigger').forEach(trigger => {
            trigger.classList.remove('active');
            if (trigger.getAttribute('data-tab') === section) {
                trigger.classList.add('active');
            }
        });

        // Show active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(section).classList.add('active');

        // Update active nav item
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
        });
        item.classList.add('active');

        // Close mobile menu if open
        mobileMenu.classList.remove('open');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Tabs
const tabTriggers = document.querySelectorAll('.tab-trigger');

tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const tab = trigger.getAttribute('data-tab');

        // Update active tab
        tabTriggers.forEach(t => {
            t.classList.remove('active');
        });
        trigger.classList.add('active');

        // Show active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tab).classList.add('active');

        // Update active nav item
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
            if (navItem.getAttribute('data-section') === tab) {
                navItem.classList.add('active');
            }
        });
    });
});

// Accordion
const accordionTriggers = document.querySelectorAll('.accordion-trigger');

accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', !expanded);

        const content = trigger.nextElementSibling;
        content.classList.toggle('open');
    });
});

// FAQ
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('open');
        const answer = question.nextElementSibling;
        answer.classList.toggle('open');
    });
});
