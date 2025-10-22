let cart = JSON.parse(localStorage.getItem('storeT_cart')) || [];

function saveCart() {
    localStorage.setItem('storeT_cart', JSON.stringify(cart));
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.toggle('active');
    }
}

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    if (!cartItemsDiv) return;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Giỏ hàng trống</p>
            </div>
        `;
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) cartTotal.style.display = 'none';
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image" style="background-image: url('${item.image}');"></div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                ${item.size || item.color ? `
                    <div class="cart-item-options">
                        ${item.size ? `<span>Size: ${item.size}</span>` : ''}
                        ${item.color ? `<span>Color: ${item.color}</span>` : ''}
                    </div>
                ` : ''}
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Xóa</button>
                </div>
            </div>
        </div>
    `).join('');

    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) cartTotal.style.display = 'block';
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        saveCart();  // ← Lưu vào localStorage
        updateCart();
        updateCartBadge();
    }
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        saveCart();  
        updateCart();
        updateCartBadge();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();  // ← Lưu vào localStorage
    updateCart();
    updateCartBadge();
    showNotification('🗑️ Đã xóa khỏi giỏ hàng');
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = document.getElementById('totalAmount');
    if (totalAmount) {
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function updateCart() {
    displayCartItems();
    updateTotal();
}

function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`✅ Thanh toán thành công!\nTổng tiền: $${total.toFixed(2)}`);
    
    cart = [];
    saveCart();  // ← Xóa localStorage
    updateCart();
    updateCartBadge();
    toggleCart();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10001;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        font-weight: 500;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    updateCart();
    updateCartBadge();
});