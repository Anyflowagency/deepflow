function initTextAnim() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // gsap code here!

  console.log("hello");
  let headings = document.querySelectorAll(".textanim");

  headings.forEach((heading) => {
    let split = SplitText.create(heading, {
      type: "lines",
      mask: "lines",
      // linesClass: "line++",
    });

    gsap.fromTo(
      split.lines,
      {
        opacity: 0,
        y: 50,
        stagger: 0.05,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          end: "bottom 20%",

          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

function initWordAnim() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  let headings = document.querySelectorAll(".wordanim");

  headings.forEach((heading) => {
    // Split into words instead of lines
    let split = SplitText.create(heading, {
      type: "words",
      wordsClass: "word++",
    });

    gsap.from(split.words, {
      opacity: 0,
      y: 30,
      stagger: 0.08, // stagger between words
      ease: "power2.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

function initLetterAnim() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  let headings = document.querySelectorAll(".letteranim");

  headings.forEach((heading) => {
    // Split into characters
    let split = SplitText.create(heading, {
      type: "chars",
      charsClass: "char++",
    });

    gsap.from(split.chars, {
      opacity: 0,
      filter: "blur(6px)", // only blur
      stagger: 0.03, // faster reveal
      ease: "power2.out",
      duration: 0.4,
      scrollTrigger: {
        trigger: heading,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

function initWordAnimOnLoad(container = document) {
  let headings = container.querySelectorAll(".wordanimonload");

  headings.forEach((heading) => {
    // Split into words
    let split = SplitText.create(heading, {
      type: "words",
      wordsClass: "word++",
    });

    // Set initial state
    gsap.set(split.words, {
      opacity: 0,
      y: 30,
    });

    // Animate words on load
    gsap.to(split.words, {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      ease: "power2.out",
      duration: 0.6,
      delay: 0.3,
    });
  });
}

function initCardHover() {
  const cards = document.querySelectorAll(".solution_item");

  cards.forEach((card) => {
    const textEls = card.querySelectorAll(".text-size-med-large, h3");
    const videoEl = card.querySelector(".solution_card-background");

    // Decide hover colors based on extra class
    let hoverBgColor = "#FF25B3"; // default bg
    let hoverTextColor = "#ffffff"; // default text

    if (card.classList.contains("is-green")) {
      hoverBgColor = "#0FFAA3"; // alt bg
      hoverTextColor = "#111111"; // alt text
    }

    // Create timeline (paused by default)
    const tl3 = gsap.timeline({ paused: true, reversed: true });

    tl3
      .to(card, {
        backgroundColor: hoverBgColor,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        textEls,
        {
          color: hoverTextColor,
          duration: 0.3,
          ease: "power2.out",
        },
        "<"
      )
      .from(
        videoEl,
        {
          bottom: "-65%",
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );

    // Event listeners
    card.addEventListener("mouseenter", () => {
      if (tl3.reversed()) tl3.play();
    });

    card.addEventListener("mouseleave", () => {
      if (!tl3.reversed()) tl3.reverse();
    });
  });
}

function initGradientText() {
  const texts = document.querySelectorAll(".gradient-text");

  texts.forEach((text) => {
    const tl = gsap.timeline({
      delay: 3.5,
      repeat: -1,
      yoyo: true,
      repeatDelay: 3.5,
    });

    tl.to(text, {
      color: "#0FFAA3",
      duration: 1,
      ease: "power2.inOut",
    });
  });
}

function initScrollTrigger() {
  // Make sure ScrollTrigger is registered
  gsap.registerPlugin(ScrollTrigger);
  
  // First, kill any existing ScrollTrigger instances to prevent duplicates
 // ScrollTrigger.getAll().forEach(st => st.kill());
  
  // Check if the element exists before creating the timeline
  const stickyComponent = document.querySelector(".home-sticky_component-wrapper");
  if (!stickyComponent) return;
  
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-sticky_component-wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
     // pin: true,
      // markers: true,
     // id: "home-sticky-animation", // Add ID for easier debugging
    },
  });

  // Check if target elements exist before animating them
  const el1 = document.querySelector(".is-1");
  const el2 = document.querySelector(".is-2");
  
  if (el1) {
    tl2.to(
      ".is-1",
      {
        scale: 0.7,
      },
      "a"
    );
  }

  if (el2) {
    // Check if it's a mobile device (small screen)
    if (window.innerWidth <= 768) {
      tl2.from(
        ".is-2",
        {
          top: "150%",
        },
        "a"
      );
    } else {
      tl2.from(
        ".is-2",
        {
          left: "180%",
        },
        "a"
      );
    }
  }
}

function initSwiper() {
  // Check if the swiper container exists
  const swiperContainer = document.getElementById("testimonials");
  if (!swiperContainer) {
    return; // Exit early if the element doesn't exist
  }

  // Initialize Swiper
  const swiper = new Swiper("#testimonials", {
    // Optional parameters
    loop: true,
    speed: 800,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    // Enhanced pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // Disable default navigation since we're using custom buttons
    navigation: {
      enabled: false,
    },

    // Effect
    effect: "slide",

    // Breakpoints for responsive design
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
    },
  });

  // Connect custom navigation buttons - check if they exist first
  const nextButton = document.getElementById("next-button");
  const prevButton = document.getElementById("prev-button");

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      swiper.slideNext();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      swiper.slidePrev();
    });
  }

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      swiper.slideNext();
    } else if (e.key === "ArrowLeft") {
      swiper.slidePrev();
    }
  });
}

 function initStudioSlider() {
  // Check if the swiper container exists
  const swiperContainer = document.getElementById("studio");
  if (!swiperContainer) {
    return; // Exit early if the element doesn't exist
  }

  // Initialize Swiper
  const swiper = new Swiper("#studio", {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    // Enhanced pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // Disable default navigation since we're using custom buttons
    navigation: {
      enabled: false,
    },

    // Effect
    effect: "slide",

    // Breakpoints for responsive design
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 32,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 32,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
    },
  });

  // Connect custom navigation buttons - check if they exist first
  const nextButton = document.getElementById("next-button");
  const prevButton = document.getElementById("prev-button");

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      swiper.slideNext();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      swiper.slidePrev();
    });
  }

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      swiper.slideNext();
    } else if (e.key === "ArrowLeft") {
      swiper.slidePrev();
    }
  });
} 


// Store the observer globally so we can disconnect it during page transitions
let cardObserver = null;

function initCardObserver() {
    // First, disconnect any existing observer to prevent memory leaks
    if (cardObserver) {
        cardObserver.disconnect();
        cardObserver = null;
    }
    
    const cards = document.querySelectorAll(".features-card_wrapper");
    const cardTexts = document.querySelectorAll(".features-sticky-text p");
    
    // If elements don't exist on this page, exit early
    if (cards.length === 0 || cardTexts.length === 0) return;

    // Keep track of which cards are currently visible
    const visibleCards = new Set();

    // Initialize Intersection Observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.3, // trigger when 30% of the card is visible
    };

    cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const index = Array.from(cards).indexOf(entry.target);

            if (entry.isIntersecting) {
                // Add this card to visible set
                visibleCards.add(index);
            } else {
                // Remove this card from visible set
                visibleCards.delete(index);
            }
        });

        // Reset all texts to gray first
        cardTexts.forEach((text) => {
            text.style.color = "gray";
        });

        // If any cards are visible, highlight only the first (topmost) one
        if (visibleCards.size > 0) {
            const activeCardIndex = Math.min(...visibleCards);
            cardTexts[activeCardIndex].style.color = "white";
        }
    }, observerOptions);

    // Observe each card
    cards.forEach((card) => {
        cardObserver.observe(card);
    });

    // Add click event listeners to card texts
    cardTexts.forEach((text, index) => {
        text.style.cursor = 'pointer'; // Change cursor to indicate clickable
        
        text.addEventListener('click', () => {
            // Scroll to the corresponding card
            cards[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Enable snap scrolling only within the sticky section
    const stickySection = document.querySelector('.stickySection');
    let isScrolling = false;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollTimeout = null;
    
    // Calculate card positions once to avoid recalculating on every scroll
    const cardPositions = Array.from(cards).map(card => {
        return card.offsetTop;
    });
    
    // Add wheel event listener for simple one-scroll-one-card behavior
    let lastWheelTime = 0;
    const wheelThreshold = 200; // Minimum time between wheel events in ms
    
    stickySection.addEventListener('wheel', (e) => {
        // Get the sticky section's position
        const stickySectionTop = stickySection.offsetTop;
        const stickySectionBottom = stickySectionTop + stickySection.offsetHeight;
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Check if we're scrolling within the sticky section
        if (currentScroll >= stickySectionTop && currentScroll <= stickySectionBottom) {
            // Special handling for scrolling at the edges
            const scrollingUp = e.deltaY < 0;
            const atTopEdge = Math.abs(currentScroll - stickySectionTop) < 50;
            
            // If we're at the top edge and trying to scroll up, allow normal scrolling
            if (scrollingUp && atTopEdge) {
                // Don't prevent default - let the page scroll normally
                return;
            }
            
            // Always prevent default within the sticky section to take control of scrolling
            e.preventDefault();
            
            // Throttle wheel events to ensure one card per scroll action
            const now = Date.now();
            if (now - lastWheelTime < wheelThreshold || isScrolling) {
                return;
            }
            lastWheelTime = now;
            
            // Simple direction detection - just check if deltaY is positive or negative
            const scrollDirection = e.deltaY > 0 ? 'down' : 'up';
            
            // Find current active card
            let currentActiveCard = 0;
            cardTexts.forEach((text, i) => {
                if (text.style.color === 'white') {
                    currentActiveCard = i;
                }
            });
            
            // Move exactly one card based on direction
            let targetCard = currentActiveCard;
            if (scrollDirection === 'down' && targetCard < cards.length - 1) {
                targetCard = currentActiveCard + 1;
            } else if (scrollDirection === 'up' && targetCard > 0) {
                targetCard = currentActiveCard - 1;
            } else {
                // If we can't move in the desired direction, don't do anything
                return;
            }
            
            // Set scrolling flag to prevent multiple actions
            isScrolling = true;
            
            // Scroll to the target card
            cards[targetCard].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active card text
            cardTexts.forEach((text, i) => {
                text.style.color = i === targetCard ? "white" : "gray";
            });
            
            // Reset the scrolling flag after animation completes
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    }, { passive: false });
    
    // Simple scroll event handler for touch/trackpad scrolling
    let lastScrollTime = 0;
    const scrollThreshold = 400; // Longer threshold for scroll events
    
    window.addEventListener('scroll', () => {
        // Get the sticky section's position
        const stickySectionTop = stickySection.offsetTop;
        const stickySectionBottom = stickySectionTop + stickySection.offsetHeight;
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Check if we're scrolling within the sticky section
        // But not at the edges where we want normal scrolling behavior
        if (currentScroll >= stickySectionTop + 50 && currentScroll <= stickySectionBottom - 50) {
            // Skip if we're already handling a scroll or it's too soon after the last one
            const now = Date.now();
            if (isScrolling || now - lastScrollTime < scrollThreshold) {
                return;
            }
            
            // Simple direction detection
            const scrollDirection = currentScroll > lastScrollTop ? 'down' : 'up';
            
            // Find current active card
            let currentActiveCard = 0;
            cardTexts.forEach((text, i) => {
                if (text.style.color === 'white') {
                    currentActiveCard = i;
                }
            });
            
            // Move exactly one card based on direction
            let targetCard = currentActiveCard;
            if (scrollDirection === 'down' && currentActiveCard < cards.length - 1) {
                targetCard = currentActiveCard + 1;
            } else if (scrollDirection === 'up' && currentActiveCard > 0) {
                targetCard = currentActiveCard - 1;
            } else {
                // If we can't move in the desired direction, don't do anything
                return;
            }
            
            // Special handling for edges
            const scrollingUp = scrollDirection === 'up';
            const atTopEdge = Math.abs(currentScroll - stickySectionTop) < 100;
            const atBottomEdge = Math.abs(currentScroll - stickySectionBottom) < 100;
            
            // Allow normal scrolling at edges when trying to exit
            if ((scrollingUp && atTopEdge) || (!scrollingUp && atBottomEdge)) {
                return;
            }
            
            // Update timestamp and set scrolling flag
            lastScrollTime = now;
            isScrolling = true;
            
            // Scroll to the target card
            cards[targetCard].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active card text
            cardTexts.forEach((text, i) => {
                text.style.color = i === targetCard ? "white" : "gray";
            });
            
            // Reset the scrolling flag after animation completes
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
        
        lastScrollTop = currentScroll;
    });
}
function initAppearAnimations(sectionSelector = ".section_studio-features", itemSelector = ".appear") {
  const sections = gsap.utils.toArray(sectionSelector);

  sections.forEach(section => {
    const items = section.querySelectorAll(itemSelector);

    if (!items.length) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      }
    }).from(items, {
      opacity: 0,
      filter: "blur(10px)",
      y: 100,
      duration: 1,
      stagger: 0.2,
      ease: "power2.inOut",
    });
  });
}



function initAllAnimations() {
  initTextAnim();
  initWordAnim();
  initLetterAnim();
 // initWordAnimOnLoad();
  initCardHover();
  initGradientText();
  initScrollTrigger();
  initSwiper();
  initStudioSlider();
  initCardObserver();
  initAppearAnimations();
}

function resetWebflow(data) {
  let dom = $(
    new DOMParser().parseFromString(data.next.html, "text/html")
  ).find("html");
  // reset webflow interactions
  $("html").attr("data-wf-page", dom.attr("data-wf-page"));
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require("ix2").init();
  // reset w--current class
  $(".w--current").removeClass("w--current");
  $("a").each(function () {
    if ($(this).attr("href") === window.location.pathname) {
      $(this).addClass("w--current");
    }
  });
  // reset scripts
  dom.find("[data-barba-script]").each(function () {
    let codeString = $(this).text();
    if (codeString.includes("DOMContentLoaded")) {
      let newCodeString = codeString.replace(
        /window\.addEventListener\("DOMContentLoaded",\s*\(\s*event\s*\)\s*=>\s*{\s*/,
        ""
      );
      codeString = newCodeString.replace(/\s*}\s*\);\s*$/, "");
    }
    let script = document.createElement("script");
    script.type = "text/javascript";
    if ($(this).attr("src")) script.src = $(this).attr("src");
    script.text = codeString;
    document.body.appendChild(script).remove();
  });
}

// Initial load
document.addEventListener("DOMContentLoaded", function () {
  initAllAnimations();
});

// Barba.js setup
barba.hooks.before((data) => {
  // Kill all ScrollTrigger instances before transitioning
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(st => st.kill());
  }
  
  // Disconnect the card observer if it exists
  if (cardObserver) {
    cardObserver.disconnect();
    cardObserver = null;
  }
});

barba.hooks.enter((data) => {
  gsap.set(data.next.container, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
  });
});

barba.hooks.after((data) => {
  gsap.set(data.next.container, { position: "relative" });
  $(window).scrollTop(0);
  resetWebflow(data);
  
  // Small delay to ensure DOM is fully updated before reinitializing animations
  setTimeout(() => {
    // Reinitialize all animations after page transition
    initAllAnimations();
  }, 50);
});

document.addEventListener("DOMContentLoaded", () => {
  initWordAnimOnLoad(document);
});

// Barba page transitions
barba.init({
  preventRunning: true,
  transitions: [
    {
      sync: true,
      beforeEnter({ next }) {
        // Hide next container initially and prepare word animation
        gsap.set(next.container, { opacity: 0, y: "100vh" });
        initWordAnimOnLoad(next.container);
      },
      enter({ current, next }) {
        let tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });

        // Scale down current page and fade out
        tl.to(current.container, { opacity: 0, scale: 0.9 });

        // Bring next page from bottom
        tl.to(next.container, { opacity: 1, y: 0 }, "<");

        return tl;
      },
    },
  ],
});
