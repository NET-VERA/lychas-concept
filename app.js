// --- DATA OBJECTS & APPLICATION STATE ---
const PRODUCTS_DATA = [
    { id: 1, name: "Elegant Crystal Earrings", category: "Earrings", price: 8000, image: "img/bg.jpg", desc: "Premium quality luxury drop earrings with high-grade reflective crystal simulation." },
    { id: 2, name: "Gold Chain Choker Necklace", category: "Necklaces", price: 12000, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop", desc: "Polished multi-layer 18k rose gold plated style necklace designed for formal necklines." },
    { id: 3, name: "Classic Pearl Statement Bracelet", category: "Bracelets", price: 9500, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop", desc: "Stunning elastic statement piece structured with high luster cream pearls." },
    { id: 4, name: "Luxury Leather Handbag", category: "Bags", price: 35000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop", desc: "Premium sleek layout bag with gold finish lock clips and compact organizational slots." },
    { id: 5, name: "Velvet Elegant Headbands", category: "Hair Accessories", price: 5000, image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=400&auto=format&fit=crop", desc: "Soft secure premium hold styling band offering exceptional comfort for structural luxury hair units." },
    { id: 6, name: "Minimalist Stackable Rings", category: "Rings", price: 7000, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop", desc: "Set of three independent geometric luxury finish bands to augment modern attire styles." }
];

const GALLERY_DATA = [
    { id: 1, type: "makeup", src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=500&auto=format&fit=crop" },
    { id: 2, type: "wigs", src: "https://images.unsplash.com/photo-1605497746444-ac9dbd5388a8?q=80&w=500&auto=format&fit=crop" },
    { id: 3, type: "beauty", src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500&auto=format&fit=crop" },
    { id: 4, type: "accessories", src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500&auto=format&fit=crop" },
    { id: 5, type: "makeup", src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=500&auto=format&fit=crop" },
    { id: 6, type: "wigs", src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=500&auto=format&fit=crop" }
];

const REVIEWS_DATA = [
    { name: "Abigail Livinus", score: 5, comment: "I absolutely loved my makeup. The result was beautiful and lasted through the entire evening celebration!" },
    { name: "Chioma N.", score: 5, comment: "The custom frontal unit revamp was phenomenal. Service delivery is premium and timely!" },
    { name: "Funmi A.", score: 5, comment: "Beautiful premium earrings and high attention to customer service. Will keep ordering from Lynch's Concept." }
];

const SERVICE_DETAILS = {
    makeup: { title: "Cosmetic Makeup Artistry", desc: "Our premium cosmetic styling covers bridal layouts, editorial design, and sleek personal glam profiles. We deploy exclusive elite product palettes designed to hold beautifully under professional photography lights while retaining lightweight skin comfort." },
    wigs: { title: "Luxury Wigs & Hair Sprays", desc: "Specialized lace customization, node ventilation corrections, structural color adjustments, and distribution of maximum hold hair melting lace sprays. We preserve the structural integrity of your luxury hair investment." },
    beauty: { title: "Advanced Beauty Enhancements", desc: "Meticulous single-strand premium lash applications, perfect custom eyebrow mapping configurations, and revitalizing skin prep methods designed to elevate and sustain natural beauty layers seamlessly." },
    accessories: { title: "Luxury Accessory Curation", desc: "Explore our highly durable line of hypoallergenic custom statement jewelry, exquisite designer presentation bags, and specialized styling tools gathered to harmonize perfectly with premium cosmetic makeovers." }
};

let cartState = [];
let currentLightboxIndex = 0;
let activeGalleryFilter = 'all';
let currentReviewIndex = 0;
let activeShopCategory = 'all';
let activeShopSearch = '';

// --- CORE APPLICATION INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initializeLoadingScreen();
    initializeTheme();
    renderGalleryItems();
    renderProductsStore();
    renderReviewSlides();
    initializeCartSystem();
    setupNavigationEventListeners();
    setupFormValidations();
    setupScrollAnimations();

    // FIXED: Setup open button click event directly after structural initialization
    const cartOpenBtn = document.getElementById("cartOpenBtn");
    if (cartOpenBtn) {
        cartOpenBtn.addEventListener("click", () => {
            const overlay = document.getElementById("cartOverlay");
            if(overlay) overlay.classList.add("open");
        });
    }

    // FIXED: Moved safely inside DOMContentLoaded layout cycle to prevent script halting
    const searchInput = document.getElementById("productSearchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            activeShopSearch = e.target.value;
            renderProductsStore();
        });
    }
});

// 29. LOADING SCREEN
function initializeLoadingScreen() {
    setTimeout(() => {
        const loader = document.getElementById("loading-screen");
        if(loader) {
            loader.classList.add("fade-out");
        }
        
        // Trigger the hero text sequence right after loader fades
        setTimeout(() => {
            const heroContent = document.getElementById("heroContent");
            if(heroContent) {
                heroContent.classList.add("active");
            }
        }, 400); // Wait 400ms after loader fade starts
        
    }, 2800); // Match your loading screen duration
}


// 26. DARK / LIGHT MODE MANAGEMENT
function initializeTheme() {
    const savedTheme = localStorage.getItem("preferred-theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    const toggleBtn = document.getElementById("themeToggle");
    if(!toggleBtn) return;
    toggleBtn.innerHTML = savedTheme === "dark" ? "🌙" : "☀️";

    toggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const targetTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("preferred-theme", targetTheme);
        toggleBtn.innerHTML = targetTheme === "dark" ? "🌙" : "☀️";
        showToast(`Switched to ${targetTheme} mode`);
    });
}

// 1. NAVIGATION BAR MOBILE INTERACTION & 30. SMOOTH SCROLLING
function setupNavigationEventListeners() {
    const hamburger = document.getElementById("hamburgerMenu");
    const navLinksContainer = document.getElementById("navLinks");
    const links = document.querySelectorAll(".nav-links a, .footer-links a, .hero-buttons a");
    
    if(hamburger && navLinksContainer) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("open");
            navLinksContainer.classList.toggle("open");
        });

        document.addEventListener("click", (e) => {
            if(!hamburger.contains(e.target) && !navLinksContainer.contains(e.target) && navLinksContainer.classList.contains("open")) {
                hamburger.classList.remove("open");
                navLinksContainer.classList.remove("open");
            }
        });
    }

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if(targetId && targetId.startsWith("#")) {
                e.preventDefault();
                if(hamburger) hamburger.classList.remove("open");
                if(navLinksContainer) navLinksContainer.classList.remove("open");
                
                const section = document.querySelector(targetId);
                if(section) {
                    window.scrollTo({
                        top: section.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    const backTop = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        if(backTop) {
            if(window.scrollY > 400) {
                backTop.classList.add("visible");
            } else {
                backTop.classList.remove("visible");
            }
        }
        updateActiveNavigationHighlight();
    });

    if(backTop) {
        backTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

function updateActiveNavigationHighlight() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
    let currentActiveSectionId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if(window.scrollY >= sectionTop) {
            currentActiveSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === `#${currentActiveSectionId}`) {
            link.classList.add("active");
        }
    });
}

// 27. INTERSECTION OBSERVER SMOOTH SCROLL ANIMATIONS
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

// 3. SERVICES DETAILS MODAL SYSTEM
function openServiceModal(key) {
    const service = SERVICE_DETAILS[key];
    if(!service) return;
    
    const titleEl = document.getElementById("modalServiceTitle");
    const descEl = document.getElementById("modalServiceDesc");
    const modal = document.getElementById("serviceModal");
    
    if(titleEl) titleEl.innerText = service.title;
    if(descEl) descEl.innerText = service.desc;
    if(modal) {
        modal.classList.add("open");
        modal.onclick = (e) => { if(e.target === modal) closeServiceModal(); };
    }
}

function closeServiceModal() {
    const modal = document.getElementById("serviceModal");
    if(modal) modal.classList.remove("open");
}

// 4. PORTFOLIO GALLERY FILTERS & LIGHTBOX
function renderGalleryItems() {
    const grid = document.getElementById("galleryGrid");
    if(!grid) return;
    grid.innerHTML = "";
    
    const filteredItems = activeGalleryFilter === 'all' ? GALLERY_DATA : GALLERY_DATA.filter(i => i.type === activeGalleryFilter);
    
    filteredItems.forEach((item, index) => {
        const itemEl = document.createElement("div");
        itemEl.className = "gallery-item";
        itemEl.innerHTML = `<img src="${item.src}" alt="Lynch Portfolio Piece representing ${item.type}">`;
        itemEl.onclick = () => openLightbox(index, filteredItems);
        grid.appendChild(itemEl);
    });
}

function filterGallery(category, buttonElement) {
    activeGalleryFilter = category;
    if(buttonElement) {
        const btns = buttonElement.parentElement.querySelectorAll(".filter-btn");
        btns.forEach(b => b.classList.remove("active"));
        buttonElement.classList.add("active");
    }
    renderGalleryItems();
}

let currentLightboxArray = [];
function openLightbox(index, itemsArray) {
    currentLightboxIndex = index;
    currentLightboxArray = itemsArray;
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    if(lightboxImg) lightboxImg.src = currentLightboxArray[currentLightboxIndex].src;
    if(lightbox) lightbox.classList.add("open");
}

function closeLightbox(event) {
    const lightbox = document.getElementById("lightbox");
    if(lightbox && (event.target.id === "lightbox" || event.target.className === "close-btn")) {
        lightbox.classList.remove("open");
    }
}

function changeLightboxImage(direction, event) {
    if(event) event.stopPropagation();
    currentLightboxIndex += direction;
    if(currentLightboxIndex >= currentLightboxArray.length) currentLightboxIndex = 0;
    if(currentLightboxIndex < 0) currentLightboxIndex = currentLightboxArray.length - 1;
    
    const lightboxImg = document.getElementById("lightboxImg");
    if(lightboxImg) lightboxImg.src = currentLightboxArray[currentLightboxIndex].src;
}

// 5. BOUTIQUE ENGINE (RENDER, 6. SEARCH, 7. FILTERS)
function renderProductsStore() {
    const grid = document.getElementById("shopGrid");
    if(!grid) return;
    grid.innerHTML = "";

    const filtered = PRODUCTS_DATA.filter(p => {
        const matchesCategory = (activeShopCategory === 'all' || p.category.toLowerCase() === activeShopCategory.toLowerCase());
        const matchesSearch = p.name.toLowerCase().includes(activeShopSearch.toLowerCase()) || p.desc.toLowerCase().includes(activeShopSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if(filtered.length === 0) {
        grid.innerHTML = `<div class="no-products">No matching premium accessories found in this criteria.</div>`;
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-meta">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-price-row">
                    <span class="product-price">₦${product.price.toLocaleString()}</span>
                    <button class="add-to-cart-btn" onclick="addItemToCart(${product.id})" aria-label="Add ${product.name} to cart">+</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterProducts(category, buttonElement) {
    activeShopCategory = category;
    if(buttonElement) {
        const btns = buttonElement.parentElement.querySelectorAll(".filter-btn");
        btns.forEach(b => b.classList.remove("active"));
        buttonElement.classList.add("active");
    }
    renderProductsStore();
}

// 8. SHOPPING CART CORE ARCHITECTURE & 11. LOCAL STORAGE LAYERS
function initializeCartSystem() {
    const savedCart = localStorage.getItem("lynchs_concept_cart");
    if(savedCart) {
        try { cartState = JSON.parse(savedCart); } catch(e) { cartState = []; }
    }
    updateCartUIDrawerState();
}

function closeCartDrawer(event) {
    if(!event || event.target.id === "cartOverlay") {
        const overlay = document.getElementById("cartOverlay");
        if(overlay) overlay.classList.remove("open");
    }
}

// Safe programmatic open helper function
function openCartDrawerProgrammatically() {
    const overlay = document.getElementById("cartOverlay");
    if(overlay) overlay.classList.add("open");
}

function saveCartStateToStorage() {
    localStorage.setItem("lynchs_concept_cart", JSON.stringify(cartState));
}

// 9. CART DRAWER LAYOUT RENDER & 10. AUTOMATIC CALCULATION MECHANISM
function updateCartUIDrawerState() {
    const container = document.getElementById("cartItemsContainer");
    const footer = document.getElementById("cartFooterSection");
    const badge = document.getElementById("cartBadgeCount");

    const totalItemCount = cartState.reduce((sum, item) => sum + item.quantity, 0);
    if(badge) badge.innerText = totalItemCount;
    if(!container) return;

    if(cartState.length === 0) {
        container.innerHTML = `
            <div class="cart-empty-state">
                <span class="cart-empty-icon">🛒</span>
                <h4>Your Cart Is Empty</h4>
                <p style="font-size:0.85rem; color:var(--text-secondary); margin:0.5rem 0 1.5rem 0;">Discover something beautiful from our collection.</p>
                <button class="btn-premium" onclick="closeCartDrawer(null); window.location.href='#shop';">Explore Accessories</button>
            </div>
        `;
        if(footer) footer.innerHTML = "";
        return;
    }

    container.innerHTML = "";
    let overallTotalValue = 0;

    cartState.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        overallTotalValue += itemSubtotal;

        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₦${item.price.toLocaleString()}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="changeItemQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeItemQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeCartItemCompletely(${item.id})">Remove</button>
        `;
        container.appendChild(row);
    });

    if(footer) {
        footer.innerHTML = `
            <div class="cart-summary-row"><span>Total Items:</span><span>${totalItemCount}</span></div>
            <div class="cart-summary-row cart-total-row"><span>Order Total:</span><span>₦${overallTotalValue.toLocaleString()}</span></div>
            <div class="cart-footer-btns">
                <button class="btn-premium" onclick="dispatchOrderToWhatsApp()">Checkout On WhatsApp</button>
                <button class="btn-outline" style="padding:0.5rem; font-size:0.75rem;" onclick="clearAllCartItems()">Clear Entire Bag</button>
            </div>
        `;
    }
}

function addItemToCart(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if(!product) return;

    const targetIndex = cartState.findIndex(item => item.id === productId);
    if(targetIndex > -1) {
        cartState[targetIndex].quantity += 1;
    } else {
        cartState.push({ ...product, quantity: 1 });
    }

    saveCartStateToStorage();
    updateCartUIDrawerState();
    showToast(`✓ Added ${product.name} to cart`);
}

function changeItemQuantity(productId, alteration) {
    const index = cartState.findIndex(item => item.id === productId);
    if(index === -1) return;

    cartState[index].quantity += alteration;
    if(cartState[index].quantity <= 0) {
        cartState.splice(index, 1);
        showToast("Product removed from bag");
    }
    
    saveCartStateToStorage();
    updateCartUIDrawerState();
}

// Helper cleanups
function removeCartItemCompletely(productId) {
    cartState = cartState.filter(item => item.id !== productId);
    saveCartStateToStorage();
    updateCartUIDrawerState();
    showToast("✓ Product removed");
}

function clearAllCartItems() {
    cartState = [];
    saveCartStateToStorage();
    updateCartUIDrawerState();
    showToast("Cart updated: cleared empty");
}

// 14. WHATSAPP ORDER SYSTEM INTEGRATION DIRECT LINK GENERATOR
function dispatchOrderToWhatsApp() {
    if(cartState.length === 0) return;

    let messageBody = "Hello Lynch’s Concept 👋\n\nI would like to place an order.\n\nOrder Details:\n";
    let computedTotalValue = 0;

    cartState.forEach(item => {
        const sub = item.price * item.quantity;
        computedTotalValue += sub;
        messageBody += `- ${item.name} × ${item.quantity}\n  ₦${sub.toLocaleString()}\n`;
    });

    messageBody += `\nTotal Amount: ₦${computedTotalValue.toLocaleString()}\n\nPlease let me know how I can complete my order.`;
    
    const encryptedUrlSegment = encodeURIComponent(messageBody);
    const destinationPhone = "2349067939264"; 
    const finalWhatsAppString = `https://wa.me/${destinationPhone}?text=${encryptedUrlSegment}`;

    window.open(finalWhatsAppString, '_blank');
}

// 15. APPOINTMENT BOOKING & 16. VALIDATION CHECKS
function setupFormValidations() {
    const form = document.getElementById("appointmentForm");
    if(!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById("bookingName").value.trim();
        const phoneInput = document.getElementById("bookingPhone").value.trim();
        const serviceSelect = document.getElementById("bookingService").value;
        const dateInput = document.getElementById("bookingDate").value;
        const timeInput = document.getElementById("bookingTime").value;
        const userMessage = document.getElementById("bookingMessage").value.trim();

        if(!nameInput) { showToast("⚠ Please enter your name.", true); return; }
        if(!phoneInput) { showToast("⚠ Please enter your phone number.", true); return; }
        if(!serviceSelect) { showToast("⚠ Please select a service.", true); return; }
        if(!dateInput) { showToast("⚠ Please select a date.", true); return; }
        if(!timeInput) { showToast("⚠ Please select a time.", true); return; }

        let bookingWhatsAppString = `Hello Lynch’s Concept 👋\n\nI would like to book an appointment.\n\n`;
        bookingWhatsAppString += `Name: ${nameInput}\n`;
        bookingWhatsAppString += `Phone: ${phoneInput}\n`;
        bookingWhatsAppString += `Service: ${serviceSelect}\n`;
        bookingWhatsAppString += `Date: ${dateInput}\n`;
        bookingWhatsAppString += `Time: ${timeInput}\n`;
        if(userMessage) { bookingWhatsAppString += `Message: ${userMessage}\n`; }

        showToast("✓ Appointment details verified!");
        form.reset();

        const finalBookingUrl = `https://wa.me/2349067939264?text=${encodeURIComponent(bookingWhatsAppString)}`;
        setTimeout(() => window.open(finalBookingUrl, '_blank'), 600);
    });
}

// 20. TESTIMONIALS SLIDER AUTOMATION LOGIC
function renderReviewSlides() {
    const container = document.getElementById("reviewsContainer");
    if(!container) return;
    container.innerHTML = "";

    REVIEWS_DATA.forEach((rev, idx) => {
        const item = document.createElement("div");
        item.className = `review-card ${idx === 0 ? 'active' : ''}`;
        
        let starsString = "";
        for(let i=0; i<rev.score; i++) { starsString += "★"; }

        item.innerHTML = `
            <div class="stars">${starsString}</div>
            <p class="review-text">"${rev.comment}"</p>
            <div class="review-author">${rev.name}</div>
        `;
        container.appendChild(item);
    });

    setInterval(() => { moveReviewSlide(1); }, 5000);
}

function moveReviewSlide(direction) {
    const cards = document.querySelectorAll(".review-card");
    if(cards.length === 0) return;

    cards[currentReviewIndex].classList.remove("active");
    currentReviewIndex += direction;

    if(currentReviewIndex >= cards.length) currentReviewIndex = 0;
    if(currentReviewIndex < 0) currentReviewIndex = cards.length - 1;

    cards[currentReviewIndex].classList.add("active");
}

// 25. SYSTEM TOAST NOTIFICATIONS ANIMATED FEEDBACK ELEMENT
function showToast(message, isError = false) {
    const container = document.getElementById("toast-container");
    if(!container) return;
    const toast = document.createElement("div");
    toast.className = `toast ${isError ? 'error' : ''}`;
    toast.innerHTML = `<span>${message}</span><button style="color:#fff;margin-left:1rem;" onclick="this.parentElement.remove()">&times;</button>`;
    
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => { toast.remove(); }, 300);
    }, 3500);
}

















// --- DRAGGABLE WHATSAPP LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("whatsappContainer");
    const button = document.getElementById("whatsappBtn");
    if (!container || !button) return;

    let isDragging = false;
    let hasDragged = false;
    let startX, startY, initialLeft, initialTop;

    // Helper: Gets client coordinates for Mouse & Touch
    const getPos = (e) => e.touches ? e.touches[0] : e;

    const onStart = (e) => {
        isDragging = true;
        hasDragged = false;
        
        const pos = getPos(e);
        startX = pos.clientX;
        startY = pos.clientY;

        const rect = container.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        // Switch positioning from bottom/right to absolute top/left coordinates
        container.style.bottom = "auto";
        container.style.right = "auto";
        container.style.left = `${initialLeft}px`;
        container.style.top = `${initialTop}px`;
    };

    const onMove = (e) => {
        if (!isDragging) return;

        const pos = getPos(e);
        const deltaX = pos.clientX - startX;
        const deltaY = pos.clientY - startY;

        // Mark as real drag if moved more than 5px
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            hasDragged = true;
        }

        let newLeft = initialLeft + deltaX;
        let newTop = initialTop + deltaY;

        // 1. BOUNDARY CHECK: Do not allow dragging above top edge (Navbar height margin)
        const minTop = 70; 
        const maxTop = window.innerHeight - container.offsetHeight - 15;
        const minLeft = 10;
        const maxLeft = window.innerWidth - container.offsetWidth - 10;

        newTop = Math.max(minTop, Math.min(newTop, maxTop));
        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));

        container.style.left = `${newLeft}px`;
        container.style.top = `${newTop}px`;
    };

    const onEnd = () => {
        if (!isDragging) return;
        isDragging = false;

        const rect = container.getBoundingClientRect();
        const screenCenterX = window.innerWidth / 2;
        const buttonCenterX = rect.left + rect.width / 2;

        // 2. BOUNDARY CHECK: Don't stay stuck in screen center horizontally (Snaps to left or right margin)
        const centerZoneWidth = window.innerWidth * 0.3; // Center 30% area
        if (Math.abs(buttonCenterX - screenCenterX) < centerZoneWidth / 2) {
            const targetLeft = buttonCenterX < screenCenterX ? 15 : (window.innerWidth - rect.width - 15);
            container.style.transition = "left 0.3s ease, top 0.3s ease";
            container.style.left = `${targetLeft}px`;
            
            setTimeout(() => {
                container.style.transition = "none";
            }, 300);
        }
    };

    // Prevent direct link opening when user was dragging
    button.addEventListener("click", (e) => {
        if (hasDragged) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // Touch events for Android / Mobile
    container.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);

    // Mouse events for Desktop preview
    container.addEventListener("mousedown", onStart);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
});
