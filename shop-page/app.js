let selectedProduct = null;

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn-add-cart" onclick="openModal(${product.id})">Add to Cart</button>
        `;
        productsGrid.appendChild(productCard);
    });
});

function openModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    document.getElementById('modalImage').src = selectedProduct.image;
    document.getElementById('modalName').textContent = selectedProduct.name;
    document.getElementById('modalDescription').textContent = selectedProduct.description;
    document.getElementById('modalPrice').textContent = selectedProduct.price.toFixed(2);
    document.getElementById('quantityInput').value = 1;
    document.getElementById('previewModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('previewModal').style.display = 'none';
    selectedProduct = null;
}

function increaseQty() {
    const input = document.getElementById('quantityInput');
    input.value = parseInt(input.value) + 1;
}

function decreaseQty() {
    const input = document.getElementById('quantityInput');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function addToCartFromModal() {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === selectedProduct.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({...selectedProduct, quantity: quantity});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    closeModal();
    showNotification(`${selectedProduct.name} added to cart!`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

window.onclick = function(event) {
    const modal = document.getElementById('previewModal');
    if (event.target == modal) {
        closeModal();
    }
}
