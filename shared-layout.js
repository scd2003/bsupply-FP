(() => {
    const currentPage = document.body.dataset.page || "";
    const isNestedPage = window.location.pathname.includes("/shop-page/")
        || window.location.pathname.includes("/cart-page/")
        || window.location.pathname.includes("\\shop-page\\")
        || window.location.pathname.includes("\\cart-page\\");
    const basePath = isNestedPage ? "../" : "";

    const links = [
        { key: "home", label: "Home", href: `${basePath}index.html` },
        { key: "shop", label: "Shop", href: `${basePath}shop-page/shop.html` },
        { key: "cart", label: "Cart", href: `${basePath}cart-page/cart.html`, cart: true }
    ];

    const headerRoot = document.getElementById("site-header");
    const footerRoot = document.getElementById("site-footer");

    if (headerRoot) {
        headerRoot.innerHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <a class="logo" href="${basePath}index.html" aria-label="G&S Beauty home">G&S Beauty</a>
                    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-links" id="primary-navigation">
                        ${links.map((link) => `
                            <li>
                                <a href="${link.href}" class="${currentPage === link.key ? "active" : ""}">
                                    ${link.label}
                                    ${link.cart ? '<span class="cart-count" data-cart-count>0</span>' : ""}
                                </a>
                            </li>
                        `).join("")}
                    </ul>
                </div>
            </nav>
        `;

        const menuToggle = headerRoot.querySelector(".menu-toggle");
        const navLinks = headerRoot.querySelector(".nav-links");

        if (menuToggle && navLinks) {
            menuToggle.addEventListener("click", () => {
                const isOpen = navLinks.classList.toggle("open");
                menuToggle.classList.toggle("open", isOpen);
                menuToggle.setAttribute("aria-expanded", String(isOpen));
            });

            navLinks.querySelectorAll("a").forEach((link) => {
                link.addEventListener("click", () => {
                    navLinks.classList.remove("open");
                    menuToggle.classList.remove("open");
                    menuToggle.setAttribute("aria-expanded", "false");
                });
            });
        }
    }

    if (footerRoot) {
        footerRoot.innerHTML = `
            <footer class="site-footer">
                <div class="footer-container">
                    <div>
                        <p class="footer-brand">G&S Beauty</p>
                        <p class="footer-copy">Beauty essentials curated for your daily ritual.</p>
                    </div>
                    <div class="footer-meta">
                        <p>Shop skincare, makeup, and self-care favorites.</p>
                        <p>&copy; <span data-current-year></span> G&S Beauty. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        document.querySelectorAll("[data-cart-count]").forEach((badge) => {
            badge.textContent = totalItems;
            badge.classList.toggle("has-items", totalItems > 0);
        });
    }

    document.querySelectorAll("[data-current-year]").forEach((node) => {
        node.textContent = new Date().getFullYear();
    });

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cart-updated", updateCartCount);
})();
