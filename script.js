const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const header = document.querySelector('.site-header');
const backToTop = document.querySelector('.back-to-top');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('main section[id]');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('nav--open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav--open');
  });
});

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + window.innerHeight * 0.3;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });

  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (window.scrollY > 500) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});

const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('about-in-view');
      aboutObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3,
});

if (aboutSection) {
  aboutObserver.observe(aboutSection);
}

const gallerySection = document.querySelector('.gallery');
if (gallerySection) {
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('gallery-in-view');
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  galleryObserver.observe(gallerySection);
}

const contactSection = document.querySelector('.contact');
if (contactSection) {
  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('contact-in-view');
        contactObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  contactObserver.observe(contactSection);
}

// observe product cards for fade-in
const productCards = document.querySelectorAll('.coffee-card.card-animate');
if (productCards.length) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('card-in-view');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  productCards.forEach((c) => cardObserver.observe(c));
}

  // Smooth scroll for Order Now buttons (prevent default jump behavior)
  document.querySelectorAll('a[href="#contact"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const contact = document.getElementById('contact');
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // update focus for accessibility
        contact.setAttribute('tabindex', '-1');
        contact.focus({ preventScroll: true });
        // remove tabindex after focus
        setTimeout(() => contact.removeAttribute('tabindex'), 1000);
      }
    });
  });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
