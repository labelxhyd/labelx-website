/**
 * LabelX Studio — main.js
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ─── SERVICES LOGIC FOR INDEX PAGE ─── */
  const serviceRows = document.querySelectorAll('.service-row');
  
  if (serviceRows.length > 0) {
    serviceRows.forEach((row) => {
      const header = row.querySelector('.service-header');
      if (header) {
        header.addEventListener('click', () => {
          const isActive = row.classList.contains('active');
          
          // Optionally close others
          serviceRows.forEach(r => {
            r.classList.remove('active');
            const icon = r.querySelector('.service-icon');
            if (icon) icon.textContent = '+';
          });
          
          if (!isActive) {
            row.classList.add('active');
            const icon = row.querySelector('.service-icon');
            if (icon) icon.textContent = '-';
          }
        });
      }
    });
  }

  /* ─── FORM HANDLING ─── */
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Submitting...';
        btn.disabled = true;
        
        setTimeout(() => {
          btn.textContent = 'Success!';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            form.reset();
          }, 2000);
        }, 1000);
      }
    });
  });
  /* ─── HERO SLIDESHOW LOGIC ─── */
  const heroImg = document.getElementById('hero-slideshow-img');
  if (heroImg) {
    let images = [];
    const dataImages = heroImg.getAttribute('data-images');
    if (dataImages) {
      images = dataImages.split(',').map(s => s.trim()).filter(Boolean);
    } else {
      images = [
        'assets/images/landing_page_img6.jpeg',
        'assets/images/landing_page_img1.jpeg',
        'assets/images/landing_page_img2.jpeg',
        'assets/images/landing_page_img3.jpeg',
        'assets/images/landing_page_img5.jpeg',
        'assets/images/landing_page_img7.jpeg'
      ];
    }
    let currentIndex = 0;
    let timerId = null;
    let isPaused = false;
    let isFirstRun = true;

    // Preload images for smooth instant swapping (flipbook effect)
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const runSlideshow = () => {
      if (isPaused) return;
      
      // 1st image stays longer only on the very first run
      const duration = isFirstRun ? 1500 : 150; 
      isFirstRun = false;

      timerId = setTimeout(() => {
        if (isPaused) return;
        
        currentIndex = (currentIndex + 1) % images.length;
        heroImg.src = images[currentIndex];
        
        // Schedule next image
        runSlideshow();
      }, duration);
    };

    const startSlideshow = () => {
      isPaused = false;
      runSlideshow();
    };

    const stopSlideshow = () => {
      isPaused = true;
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
    };

    // Remove CSS transition to ensure a crisp, instant frame swap
    heroImg.style.transition = 'none';
    
    // Start slideshow initially
    startSlideshow();

    // Pause on hover
    heroImg.addEventListener('mouseenter', stopSlideshow);
    heroImg.addEventListener('mouseleave', startSlideshow);
  }

  /* ─── SCROLL ANIMATIONS ─── */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.why-labelx').forEach(el => {
    observer.observe(el);
  });
  /* ─── WORK CARDS INTERACTIVITY ─── */
  const workCards = document.querySelectorAll('.work-card');
  if (workCards.length > 0) {
    let currentMaxZIndex = 10;
    
    workCards.forEach(card => {
      card.style.cursor = 'pointer';
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      
      card.addEventListener('click', () => {
        currentMaxZIndex++;
        card.style.zIndex = currentMaxZIndex;
      });
      
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '-15px 15px 30px rgba(0,0,0,0.15)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '-10px 0 20px rgba(0,0,0,0.1)';
      });
    });
  }
});
