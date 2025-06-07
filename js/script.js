// Matrix Rain Effect
class MatrixRain {
  constructor() {
    this.canvas = document.getElementById("matrix-canvas")
    this.ctx = this.canvas.getContext("2d")
    this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?"
    this.fontSize = 14
    this.columns = 0
    this.drops = []

    this.init()
    this.animate()
  }

  init() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.columns = Math.floor(this.canvas.width / this.fontSize)

    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * this.canvas.height
    }
  }

  animate() {
    this.ctx.fillStyle = "rgba(10, 14, 23, 0.05)"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.fillStyle = "#00b7ff"
    this.ctx.font = `${this.fontSize}px 'Fira Code', monospace`

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.chars[Math.floor(Math.random() * this.chars.length)]
      this.ctx.fillText(text, i * this.fontSize, this.drops[i])

      if (this.drops[i] > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0
      }
      this.drops[i] += this.fontSize
    }

    requestAnimationFrame(() => this.animate())
  }

  resize() {
    this.init()
  }
}

// Terminal Typing Animation
class TerminalTyping {
  constructor() {
    this.element = document.getElementById("typing-text")
    this.commands = [
      "scan --target network",
      "analyze --malware sample.exe",
      "monitor --threats realtime",
      "investigate --incident IR-2024-001",
      "hunt --threats advanced",
    ]
    this.currentCommand = 0
    this.currentChar = 0
    this.isDeleting = false
    this.typeSpeed = 100
    this.deleteSpeed = 50
    this.pauseTime = 2000

    this.type()
  }

  type() {
    const current = this.commands[this.currentCommand]

    if (this.isDeleting) {
      this.element.textContent = current.substring(0, this.currentChar - 1)
      this.currentChar--
    } else {
      this.element.textContent = current.substring(0, this.currentChar + 1)
      this.currentChar++
    }

    let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed

    if (!this.isDeleting && this.currentChar === current.length) {
      typeSpeed = this.pauseTime
      this.isDeleting = true
    } else if (this.isDeleting && this.currentChar === 0) {
      this.isDeleting = false
      this.currentCommand = (this.currentCommand + 1) % this.commands.length
    }

    setTimeout(() => this.type(), typeSpeed)
  }
}

// Navigation
class Navigation {
  constructor() {
    this.navbar = document.getElementById("navbar")
    this.navToggle = document.querySelector(".nav-toggle")
    this.navLinks = document.querySelector(".nav-links")
    this.navItems = document.querySelectorAll(".nav-link")

    this.init()
  }

  init() {
    // Mobile menu toggle
    this.navToggle.addEventListener("click", () => {
      this.navLinks.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    this.navItems.forEach((link) => {
      link.addEventListener("click", () => {
        this.navLinks.classList.remove("active")
      })
    })

    // Smooth scrolling and active link highlighting
    this.navItems.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        this.navbar.style.backgroundColor = "rgba(5, 10, 20, 0.95)"
      } else {
        this.navbar.style.backgroundColor = "rgba(5, 10, 20, 0.9)"
      }

      this.updateActiveLink()
    })
  }

  updateActiveLink() {
    const sections = document.querySelectorAll("section")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const top = section.offsetTop
      const bottom = top + section.offsetHeight
      const id = section.getAttribute("id")
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`)

      if (scrollPos >= top && scrollPos <= bottom) {
        this.navItems.forEach((link) => link.classList.remove("active"))
        if (navLink) navLink.classList.add("active")
      }
    })
  }
}

// Skill Progress Animation
class SkillAnimation {
  constructor() {
    this.skillBars = document.querySelectorAll(".skill-progress")
    this.init()
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target
            const progress = progressBar.getAttribute("data-progress")
            progressBar.style.width = progress + "%"
          }
        })
      },
      { threshold: 0.5 },
    )

    this.skillBars.forEach((bar) => {
      observer.observe(bar)
    })
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right")
    this.init()
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0) translateX(0)"
          }
        })
      },
      { threshold: 0.1 },
    )

    this.elements.forEach((element) => {
      element.style.opacity = "0"
      if (element.classList.contains("fade-in-up")) {
        element.style.transform = "translateY(30px)"
      } else if (element.classList.contains("fade-in-left")) {
        element.style.transform = "translateX(-30px)"
      } else if (element.classList.contains("fade-in-right")) {
        element.style.transform = "translateX(30px)"
      }
      element.style.transition = "all 0.6s ease"
      observer.observe(element)
    })
  }
}

// Back to Top Button
class BackToTop {
  constructor() {
    this.button = document.getElementById("back-to-top")
    this.init()
  }

  init() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        this.button.classList.add("visible")
      } else {
        this.button.classList.remove("visible")
      }
    })

    this.button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Contact Form
class ContactForm {
  constructor() {
    this.form = document.getElementById("contact-form")
    this.init()
  }

  init() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleSubmit()
    })
  }

  handleSubmit() {
    // Get form data
    const formData = new FormData(this.form)
    const data = Object.fromEntries(formData)

    // Simulate form submission
    const submitBtn = this.form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.disabled = true

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
      submitBtn.style.backgroundColor = "#00ff9d"

      setTimeout(() => {
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
        submitBtn.style.backgroundColor = ""
        this.form.reset()
      }, 2000)
    }, 1500)

    // Here you would typically send the data to your server
    console.log("Form submitted:", data)
  }
}

// Glitch Effect on Hover
class GlitchEffect {
  constructor() {
    this.glitchElements = document.querySelectorAll(".glitch")
    this.init()
  }

  init() {
    this.glitchElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.style.animation = "none"
        element.offsetHeight // Trigger reflow
        element.style.animation = null
      })
    })
  }
}

// Particle System for Hero Section
class ParticleSystem {
  constructor() {
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.particles = []
    this.particleCount = 50

    this.init()
  }

  init() {
    this.canvas.style.position = "absolute"
    this.canvas.style.top = "0"
    this.canvas.style.left = "0"
    this.canvas.style.width = "100%"
    this.canvas.style.height = "100%"
    this.canvas.style.pointerEvents = "none"
    this.canvas.style.zIndex = "1"

    const heroSection = document.querySelector(".hero-section")
    if (heroSection) {
      heroSection.style.position = "relative"
      heroSection.appendChild(this.canvas)
    }

    this.resize()
    this.createParticles()
    this.animate()

    window.addEventListener("resize", () => this.resize())
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth
    this.canvas.height = this.canvas.offsetHeight
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1

      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      this.ctx.fillStyle = `rgba(0, 183, 255, ${particle.opacity})`
      this.ctx.fill()
    })

    requestAnimationFrame(() => this.animate())
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Initialize all components
  new MatrixRain()
  new TerminalTyping()
  new Navigation()
  new SkillAnimation()
  new ScrollAnimations()
  new BackToTop()
  new ContactForm()
  new GlitchEffect()
  new ParticleSystem()

  // Add fade-in classes to elements for scroll animations
  const sections = document.querySelectorAll("section")
  sections.forEach((section, index) => {
    const elements = section.querySelectorAll(
      "h2, h3, p, .card, .timeline-item, .skill-item, .project-card, .blog-card",
    )
    elements.forEach((element, elementIndex) => {
      setTimeout(() => {
        if (elementIndex % 3 === 0) {
          element.classList.add("fade-in-up")
        } else if (elementIndex % 3 === 1) {
          element.classList.add("fade-in-left")
        } else {
          element.classList.add("fade-in-right")
        }
      }, elementIndex * 100)
    })
  })
})

// Handle window resize
window.addEventListener("resize", () => {
  if (window.matrixRain) {
    window.matrixRain.resize()
  }
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu if open
    const navLinks = document.querySelector(".nav-links")
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active")
    }
  }
})

// Add custom cursor effect
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor")
  if (cursor) {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  }
})

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
  // Scroll-based animations and effects
}, 16) // ~60fps

window.addEventListener("scroll", throttledScroll)
