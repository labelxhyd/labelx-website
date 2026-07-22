/**
 * LabelX Studio — main.js
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ─── ACCORDION LOGIC FOR INDEX PAGE ─── */
  const accBtns = document.querySelectorAll('.acc-btn');
  const accContents = document.querySelectorAll('.acc-content');
  
  if (accBtns.length > 0) {
    accBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // Toggle the clicked one
        const isActive = btn.style.fontSize === '2.5rem';
        
        // Reset all
        accBtns.forEach(b => {
          b.style.fontSize = '1.2rem';
          const icon = b.querySelector('.icon');
          if (icon) icon.textContent = '+';
        });
        accContents.forEach(c => {
          c.classList.remove('active');
        });
        
        // Activate clicked if it wasn't active
        if (!isActive) {
          btn.style.fontSize = '2.5rem';
          const icon = btn.querySelector('.icon');
          if (icon) icon.textContent = '-';
          
          // Assuming each btn corresponds to a content block if we had them all,
          // but we only have one `.acc-content` in the HTML demo right now.
          // If we had multiples, we could toggle `accContents[index].classList.add('active')`.
          // For now, we'll just show the single content block when any button is active to simulate interaction.
          if (accContents.length > 0) {
            accContents[0].classList.add('active');
          }
        }
      });
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
});
