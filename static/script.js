document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector(".mobile-menu-toggle")
    const mobileMenu = document.querySelector(".mobile-menu")
  
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
  
      // Animate hamburger to X
      const spans = menuToggle.querySelectorAll("span")
      if (mobileMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll(".mobile-nav-list a")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
  
        // Reset hamburger icon
        const spans = menuToggle.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      })
    })
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Add shadow to header on scroll
    window.addEventListener("scroll", () => {
      const header = document.querySelector(".header")
      if (window.scrollY > 10) {
        header.style.boxShadow = "var(--shadow)"
      } else {
        header.style.boxShadow = "var(--shadow-sm)"
      }
    })
  
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".feature-card, .testimonial-card, .pricing-card")
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial state for animated elements
    document.querySelectorAll(".feature-card, .testimonial-card, .pricing-card").forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })
  
    // Run animation on load and scroll
    window.addEventListener("load", animateOnScroll)
    window.addEventListener("scroll", animateOnScroll)
  })
  
  