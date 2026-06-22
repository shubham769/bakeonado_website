const heroSlides = [
  {
    theme: "cakes",
    eyebrow: "Signature Celebration Cakes",
    title: "BakeONado turns bakery nostalgia into celebration cakes that steal the spotlight.",
    text:
      "From tall birthday cakes to freezer-ready dessert bars and gift boxes, every batch is designed to look polished, travel well, and feel special.",
    cardTitle: "Velvet Swirl Celebration Cake",
    cardCopy: "Tall sponge, cocoa ribbon, and clean frosting edges built for the camera.",
  },
  {
    theme: "frozen",
    eyebrow: "Frozen Dessert Drops",
    title: "A storefront section for ice cream cakes, semifreddo bars, and summer specials.",
    text:
      "Keep the same homepage rhythm while spotlighting chilled desserts that feel premium, festive, and easy to deliver across the city.",
    cardTitle: "Hazelnut Praline Ice Cream Cake",
    cardCopy: "Crunchy praline, dark sponge, and a pour-over fudge moment at the table.",
  },
  {
    theme: "gifts",
    eyebrow: "Gift-Ready Bakery Parcels",
    title: "Use the hero as a sales stage for tea cakes, brownies, and event-ready hamper drops.",
    text:
      "The visual system is built to pivot between product families without rebuilding the page or losing the premium bakery tone.",
    cardTitle: "Weekend Parcel Box",
    cardCopy: "Tea cake, brownie sleeves, and message cards wrapped in the BakeONado red-label mood.",
  },
];

const storyMoments = {
  2021: {
    kicker: "The Home Counter",
    title: "A small oven, handwritten menus, and birthday cakes that spread by word of mouth.",
    text:
      "BakeONado began with short-run orders that prioritized flavor, finish, and packaging. The first customers returned because the cakes felt personal without looking homemade.",
  },
  2024: {
    kicker: "The Frozen Line",
    title: "The menu expanded into ice cream cakes and chilled dessert bars that hold up on delivery.",
    text:
      "That shift made the brand more season-ready and gift-friendly. It also introduced a clearer split between celebration cakes, frozen desserts, and packaged drops.",
  },
  2026: {
    kicker: "The Party Studio",
    title: "Now the brand can stretch from custom centerpieces to cleaner branded gifting.",
    text:
      "The storefront is ready for custom order flows, product collections, and campaign-based launches without losing the warmth of a neighborhood bakery.",
  },
};

const heroEyebrow = document.querySelector("#hero-eyebrow");
const heroTitle = document.querySelector("#hero-title");
const heroText = document.querySelector("#hero-text");
const heroCardTitle = document.querySelector("#hero-card-title");
const heroCardCopy = document.querySelector("#hero-card-copy");
const heroStage = document.querySelector("#hero-stage");
const heroDots = [...document.querySelectorAll(".hero-dots .hero-dot")];

let activeHeroSlide = 0;
let heroIntervalId;

function renderHeroSlide(index) {
  const slide = heroSlides[index];

  if (!slide) {
    return;
  }

  heroEyebrow.textContent = slide.eyebrow;
  heroTitle.textContent = slide.title;
  heroText.textContent = slide.text;
  heroCardTitle.textContent = slide.cardTitle;
  heroCardCopy.textContent = slide.cardCopy;
  heroStage.dataset.theme = slide.theme;

  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
  });

  activeHeroSlide = index;
}

function startHeroCycle() {
  window.clearInterval(heroIntervalId);
  heroIntervalId = window.setInterval(() => {
    const nextSlide = (activeHeroSlide + 1) % heroSlides.length;
    renderHeroSlide(nextSlide);
  }, 5600);
}

heroDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    renderHeroSlide(Number(dot.dataset.slide));
    startHeroCycle();
  });
});

renderHeroSlide(0);
startHeroCycle();

const tabButtons = [...document.querySelectorAll(".tab-button")];
const tabPanels = [...document.querySelectorAll(".tab-panel")];

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { tab } = button.dataset;

    tabButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === tab);
    });
  });
});

const priceFormatter = new Intl.NumberFormat("en-IN");
const sizeButtons = [...document.querySelectorAll("[data-size]")];
const variantButtons = [...document.querySelectorAll("[data-variant]")];
const featurePrice = document.querySelector("#feature-price");
const featureSummary = document.querySelector("#feature-summary");
const featureQuantity = document.querySelector("#feature-quantity");
const increaseQuantityButton = document.querySelector("#increase-qty");
const decreaseQuantityButton = document.querySelector("#decrease-qty");
const copyOrderButton = document.querySelector("#copy-order");

let selectedSize = sizeButtons.find((button) => button.classList.contains("is-active"));
let selectedVariant = variantButtons.find((button) => button.classList.contains("is-active"));
let quantity = 1;

function updateFeaturedSelection() {
  const unitPrice = Number(selectedSize.dataset.price);
  const totalPrice = unitPrice * quantity;

  featurePrice.textContent = `Rs. ${priceFormatter.format(totalPrice)}`;
  featureQuantity.textContent = String(quantity);
  featureSummary.textContent = `${selectedSize.dataset.size} | ${selectedVariant.dataset.variant} | Qty ${quantity}`;
}

sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedSize = button;
    sizeButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
    updateFeaturedSelection();
  });
});

variantButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedVariant = button;
    variantButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
    updateFeaturedSelection();
  });
});

increaseQuantityButton.addEventListener("click", () => {
  quantity += 1;
  updateFeaturedSelection();
});

decreaseQuantityButton.addEventListener("click", () => {
  quantity = Math.max(1, quantity - 1);
  updateFeaturedSelection();
});

copyOrderButton.addEventListener("click", async () => {
  const orderCopy = `BakeONado order: Hazelnut Praline Ice Cream Cake | ${featureSummary.textContent}`;
  const defaultLabel = "Copy Order Brief";

  try {
    await navigator.clipboard.writeText(orderCopy);
    copyOrderButton.textContent = "Copied";
  } catch {
    copyOrderButton.textContent = orderCopy;
  }

  window.setTimeout(() => {
    copyOrderButton.textContent = defaultLabel;
  }, 1800);
});

updateFeaturedSelection();

const storyKicker = document.querySelector("#story-kicker");
const storyTitle = document.querySelector("#story-title");
const storyText = document.querySelector("#story-text");
const storyButtons = [...document.querySelectorAll(".story-year")];

function renderStory(year) {
  const story = storyMoments[year];

  if (!story) {
    return;
  }

  storyKicker.textContent = story.kicker;
  storyTitle.textContent = story.title;
  storyText.textContent = story.text;

  storyButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.story === year);
  });
}

storyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderStory(button.dataset.story);
  });
});

renderStory("2021");

const reviewCards = [...document.querySelectorAll("[data-review-card]")];
const reviewDots = [...document.querySelectorAll("[data-review]")];
let activeReview = 0;
let reviewIntervalId;

function renderReview(index) {
  reviewCards.forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === index);
  });

  reviewDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
  });

  activeReview = index;
}

function startReviewCycle() {
  window.clearInterval(reviewIntervalId);
  reviewIntervalId = window.setInterval(() => {
    renderReview((activeReview + 1) % reviewCards.length);
  }, 4200);
}

reviewDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    renderReview(Number(dot.dataset.review));
    startReviewCycle();
  });
});

renderReview(0);
startReviewCycle();

const formStatusMessage = "Thanks. This demo form is ready to connect to your real order workflow.";

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");

    if (status) {
      status.textContent = formStatusMessage;
    }

    form.reset();
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = [...document.querySelectorAll("#site-nav a")];

function closeMobileNav() {
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  siteNav.classList.toggle("is-open", !isExpanded);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileNav();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.14,
  },
);

document.querySelectorAll("[data-reveal]").forEach((element) => {
  revealObserver.observe(element);
});