/**
 * ====================================================================
 * FLOATING PHYSICIANS | PRIMARY JAVASCRIPT LOGIC
 * ====================================================================
 * Handles initialization, animations, navigation, and page functionality.
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize Libraries (AOS)
  if (typeof AOS !== "undefined") {
    AOS.init({
      once: true,
      duration: 800,
      offset: 100,
    });
  }

  // 2. Global Functionality Setup
  setupPageLoader();
  setupActiveNavHighlight();
  setupScrollAnimations();
  setupMobileNavigation();

  // 3. Page-Specific Functionality
  setupServiceModals(); // For services.html
  setupTestimonialSlider(); // For index.html
});

/**
 * Handles the display and fading of the page loader on load.
 * The loader is meant to appear instantly and fade out once the DOM is ready.
 */
function setupPageLoader() {
  const loader = document.getElementById("page-loader");
  if (loader) {
    // Use a slight delay to ensure the animation is seen on fast connections
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";
      }, 500); // Wait for the fade out transition (0.5s)
    }, 300); // Loader visibility duration
  }
}

/**
 * Highlights the active link in the desktop and mobile navigation menus.
 */
function setupActiveNavHighlight() {
  const navLinks = document.querySelectorAll(".navbar a, .mobile-nav a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html"; // Default to index.html

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Manages the "Back to Top" button visibility and the header visibility/style.
 */
function setupScrollAnimations() {
  const header = document.getElementById("main-header");
  const backToTopButton = document.getElementById("back-to-top");
  const scrollThreshold = 100; // Distance in pixels to trigger changes

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Header Scroll Behavior (fixed and receives shadow/blur)
    if (header) {
      if (scrollY > scrollThreshold) {
        header.classList.add("header-visible");
      } else {
        header.classList.remove("header-visible");
      }
    }

    // Back to Top Button Visibility
    if (backToTopButton) {
      if (scrollY > 500) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    }
  });

  // Back to Top Button Click Handler
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

/**
 * Handles opening and closing of the mobile side menu (Hamburger menu).
 */
function setupMobileNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const closeMobileMenu = document.getElementById("closeMobileMenu");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.add("open");
      document.body.style.overflow = "hidden"; // Disable background scrolling
    });
  }

  if (closeMobileMenu && mobileNav) {
    closeMobileMenu.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      document.body.style.overflow = ""; // Re-enable background scrolling
    });
  }

  // Close menu when a link is clicked
  document.querySelectorAll(".mobile-nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileNav.classList.contains("open")) {
        mobileNav.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  });
}

/**
 * ====================================================================
 * SERVICE PAGE MODAL LOGIC (services.html)
 * ====================================================================
 */

// Service Data (Detailed Content for Modals)
const serviceDetails = {
  "fm-dm": {
    title: "Precision FM/DM Floors (Superflat)",
    content: `
            <h4>Engineering for Automation</h4>
            <p>Our Precision Free Movement (FM) and Defined Movement (DM) floors are essential for modern logistics. Using advanced <strong>3D Laser Screed Technology</strong>, we achieve industry-leading flatness tolerances (meeting TR34 and ASTM E1155 standards). This precision is critical for **Very Narrow Aisle (VNA)** racking and high-speed Automated Guided Vehicles (AGVs), minimizing maintenance and operational downtime.</p>
            <h4>Key Features:</h4>
            <ul>
                <li><strong>Laser-Guided Accuracy:</strong> Sub-millimeter leveling across expansive areas.</li>
                <li><strong>Operational Efficiency:</strong> Reduces sway in high-lift forklifts, enabling faster handling speeds.</li>
                <li><strong>Certified Compliance:</strong> Guarantee compliance with FM2, DM1, and other superflat specifications.</li>
            </ul>
        `,
  },
  "resin-epoxy": {
    title: "Resinous Epoxy & PU Systems",
    content: `
            <h4>Seamless, Chemical-Resistant Protection</h4>
            <p>We provide seamless, durable coatings for environments demanding high hygiene and chemical resistance. Our systems include <strong>Epoxy, Polyurethane (PU), and Polyaspartic</strong>, tailored to resist thermal shock, acids, alkalis, and heavy abrasion. Ideal for **Food & Beverage processing, Pharmaceuticals, and Laboratories**.</p>
            <h4>System Benefits:</h4>
            <ul>
                <li><strong>Urethane Cement:</strong> Exceptional resistance to temperature fluctuations and steam cleaning.</li>
                <li><strong>Hygienic Finish:</strong> Non-porous surfaces with integrated cove bases prevent microbial growth.</li>
                <li><strong>Customizable:</strong> Available in anti-slip textures and a wide range of colors and decorative flake systems.</li>
            </ul>
        `,
  },
  jointless: {
    title: "Steel Fibre Reinforced (SFRC) Jointless Slabs",
    content: `
            <h4>Eliminating Joints, Maximizing Durability</h4>
            <p>Traditional contraction joints are maintenance hotspots. Our Steel Fibre Reinforced Concrete (SFRC) technology allows for **massive, jointless pours** over vast areas. The dispersed steel fibres provide three-dimensional reinforcement, significantly enhancing the concrete's tensile strength, crack control, and load-bearing capacity.</p>
            <h4>Advantages:</h4>
            <ul>
                <li><strong>Zero Joint Maintenance:</strong> Eliminates chipping and wear associated with hard-wheeled traffic crossing joints.</li>
                <li><strong>Faster Construction:</strong> Reduced time spent on joint cutting and filling.</li>
                <li><strong>High Load Capacity:</strong> Superior resistance to static and dynamic loads compared to mesh-reinforced slabs.</li>
            </ul>
        `,
  },
  polished: {
    title: "Polished Concrete & Densification",
    content: `
            <h4>Aesthetic Brilliance, Industrial Strength</h4>
            <p>Polished concrete is a sustainable and sophisticated flooring solution. Through a multi-step mechanical grinding process combined with the application of <strong>Lithium Silicate Densifiers</strong>, we transform ordinary concrete into a hard, glossy, and dust-proof surface. This is a popular choice for **Retail Showrooms, Commercial Offices, and Malls**.</p>
            <h4>Process & Results:</h4>
            <ul>
                <li><strong>Durability:</strong> Increases surface hardness by up to 40% and drastically reduces abrasion.</li>
                <li><strong>Aesthetics:</strong> Customizable sheen levels (matte, semi-gloss, high-gloss) and receptive to integral coloring/dyes.</li>
                <li><strong>Low Maintenance:</strong> Reduces dusting and only requires routine cleaning.</li>
            </ul>
        `,
  },
  overlay: {
    title: "Decorative Overlays & Resurfacing",
    content: `
            <h4>Transforming Old Concrete</h4>
            <p>Decorative polymer cement **Micro-Toppings and Overlays** are ideal for rejuvenating damaged, stained, or unattractive existing concrete surfaces without the cost and disruption of demolition. Applied in thin layers, these overlays bond permanently to the substrate, creating a fresh canvas.</p>
            <h4>Applications:</h4>
            <ul>
                <li><strong>Faux Finishes:</strong> Can be stamped or textured to convincingly mimic natural stone, brick, wood planks, or tile patterns.</li>
                <li><strong>Indoor/Outdoor Use:</strong> Perfect for patios, pool decks (with anti-slip additives), driveways, and interior floors.</li>
                <li><strong>Cost-Effective:</strong> A budget-friendly way to achieve a high-end look on existing structures.</li>
            </ul>
        `,
  },
  stained: {
    title: "Stained & Dyed Finishes",
    content: `
            <h4>Deep, Translucent Color Effects</h4>
            <p>Concrete staining and dyeing penetrate the concrete surface to create rich, permanent, and unique color effects. **Acid Stains** react chemically with the concrete to produce variegated, translucent, marble-like tones, while **Water-Based Dyes** offer a wider, more uniform palette of vibrant colors.</p>
            <h4>Design Flexibility:</h4>
            <ul>
                <li><strong>Unique Aesthetic:</strong> No two stained floors are exactly alike due to the interaction with the concrete's chemical composition.</li>
                <li><strong>Durability:</strong> The color is integral to the surface, meaning it will not chip, peel, or fade like paint.</li>
                <li><strong>Sealing Required:</strong> Always finished with a high-performance clear sealer or densifier for UV and wear protection.</li>
            </ul>
        `,
  },
  "prep-repair": {
    title: "Surface Preparation & Repair",
    content: `
            <h4>The Foundation of Longevity</h4>
            <p>Proper surface preparation is the single most critical factor for a long-lasting floor system. We use advanced mechanical methods like <strong>Shot Blasting and Diamond Grinding</strong> to remove laitance, old coatings, and contaminants, creating the optimal surface profile for adhesion (measured using CSP standards).</p>
            <h4>Repair Services:</h4>
            <ul>
                <li><strong>Crack and Spall Repair:</strong> Full-depth crack filling and patching using durable, rapid-curing polymer mortars.</li>
                <li><strong>Moisture Mitigation:</strong> Application of high-performance vapor barriers to prevent moisture-related failures (blistering, delamination) of applied coatings.</li>
                <li><strong>Slab Leveling:</strong> Use of self-leveling underlayments to ensure a perfectly flat base for subsequent finishes.</li>
            </ul>
        `,
  },
  "design-qa": {
    title: "Design, QA & Consulting",
    content: `
            <h4>Engineering Excellence from Concept to Completion</h4>
            <p>Our consultancy services offer expert guidance through every phase. This includes structural assessment, material selection, detailed technical specification drafting, and <strong>Quality Assurance (QA) testing</strong> for flatness, strength, and material compliance.</p>
            <h4>Consulting Scope:</h4>
            <ul>
                <li><strong>Specification Drafting:</strong> Ensuring the concrete mix, joint layout, and finishing meets exact project needs (TR34, ACI).</li>
                <li><strong>Project Management:</strong> On-site supervision to ensure strict adherence to safety and quality protocols.</li>
                <li><strong>QA Testing:</strong> Conducting F-number surveys (for flatness), core drilling (for strength), and pull-off tests (for adhesion) before handover.</li>
            </ul>
        `,
  },
  maintenance: {
    title: "Ongoing Maintenance & Training",
    content: `
            <h4>Protecting Your Investment</h4>
            <p>A proactive maintenance plan is essential for maximizing the lifespan and appearance of your engineered floor. We provide tailored aftercare support, including operator training for your facility staff and scheduled resealing services.</p>
            <h4>Support Services:</h4>
            <ul>
                <li><strong>Training Programs:</strong> Educating your team on correct cleaning protocols, spill management, and heavy equipment operation on high-performance surfaces.</li>
                <li><strong>Resealing Schedules:</strong> Periodic application of clear protective sealers to maintain gloss, abrasion resistance, and stain resistance.</li>
                <li><strong>Rehabilitation:</strong> Assessment and remediation of wear and damage, including joint reconstruction and localized resurfacing.</li>
            </ul>
        `,
  },
};

/**
 * Attaches click handlers to service cards to open the modal.
 */
function setupServiceModals() {
  const cards = document.querySelectorAll(".modern-card[data-service-id]");
  const modal = document.getElementById("serviceModal");
  const modalContentDetail = document.getElementById("modalContentDetail");
  const closeModal = document.getElementById("closeModal");

  if (!modal || !modalContentDetail) return; // Exit if elements not found (e.g., on index.html)

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const serviceId = this.getAttribute("data-service-id");
      const detail = serviceDetails[serviceId];

      if (detail) {
        modalContentDetail.innerHTML = `<h3>${detail.title}</h3>${detail.content}`;
        modal.classList.add("open");
        document.body.style.overflow = "hidden"; // Prevent background scroll
      }
    });
  });

  closeModal.addEventListener("click", closeServiceModal);
  modal.addEventListener("click", (e) => {
    // Close modal if clicking the overlay, but not the content itself
    if (e.target === modal) {
      closeServiceModal();
    }
  });
}

/**
 * Closes the service details modal.
 */
function closeServiceModal() {
  const modal = document.getElementById("serviceModal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = ""; // Restore background scroll
  }
}

/**
 * ====================================================================
 * TESTIMONIAL SLIDESHOW LOGIC (index.html)
 * ====================================================================
 */
function setupTestimonialSlider() {
  const carousel = document.querySelector(".testimonial-carousel");
  if (!carousel) return; // Exit if not on the index page

  const slidesContainer = carousel.querySelector(".testimonial-slides");
  const slides = carousel.querySelectorAll(".testimonial-card-slide");
  const prevButton = carousel.querySelector(".prev-slide");
  const nextButton = carousel.querySelector(".next-slide");
  const totalSlides = slides.length;
  let currentIndex = 0;
  let slideInterval;

  /**
   * Updates the position of the slides container.
   */
  function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    slidesContainer.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
  }

  /**
   * Navigates to the next slide, looping to the start if necessary.
   */
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  /**
   * Navigates to the previous slide, looping to the end if necessary.
   */
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Event Listeners for controls
  nextButton.addEventListener("click", () => {
    clearInterval(slideInterval); // Stop autoplay on user interaction
    nextSlide();
    startAutoPlay();
  });

  prevButton.addEventListener("click", () => {
    clearInterval(slideInterval); // Stop autoplay on user interaction
    prevSlide();
    startAutoPlay();
  });

  // Ensure the carousel updates on resize
  window.addEventListener("resize", updateCarousel);

  // Initial load update
  updateCarousel();

  // Autoplay functionality
  function startAutoPlay() {
    // Set a new interval only if one isn't already running
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    slideInterval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
  }

  // Start the show!
  startAutoPlay();
}
