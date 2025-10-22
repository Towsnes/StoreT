const products = [
    { 
        id: 1,
        name: "premium Straight Leg Jeans White", 
        image: 'images/premium Straight Leg Jeans White.jpg', 
        original: 129.00, 
        sale: 89.00,
        link: 'products/premiumJean.html',
        popularity: 95
    },
    { 
        id: 2,
        name: "Slim Fit Straight Leg Jeans", 
        image: 'images/Slim Fit Straight Leg Jeans.jpg', 
        original: 145.00, 
        sale: 89.00,
        link: 'products/slimJean.html',
        popularity: 88
    },
    { 
        id: 3,
        name: "Casual Line Square Blazer Grey", 
        image: 'images/Casual Line Square Blazer Grey.jpg', 
        original: 350.00, 
        sale: 299.00,
        link: 'products/blazerJacket.html',
        popularity: 92
    },
    { 
        id: 4,
        name: "Classic Denim Jacket", 
        image: 'images/Classic Denim Jacket.jpg', 
        original: 149.00, 
        sale: 129.00,
        link: 'products/classicJacket.html',
        popularity: 85
    },
    { 
        id: 5,
        name: "Coolman Denim Jacket", 
        image: 'images/Coolman Denim Jacket.jpg', 
        original: 450.00, 
        sale: 399.00,
        link: 'products/coolmanJacket.html',
        popularity: 78
    },
    { 
        id: 6,
        name: "Exclusive Motive Leather Shoes", 
        image: 'images/Exclusive Motive Leather Shoes.jpg', 
        original: 79.00, 
        sale: 59.00,
        link: 'products/exclusiveShoes.html',
        popularity: 90
    },
    { 
        id: 7,
        name: "Premium Motive Leather Shoes", 
        image: 'images/Premium Motive Leather Shoes.jpg', 
        original: 299.00, 
        sale: 249.00,
        link: 'products/preMotiveShoes.html',
        popularity: 87
    },
    { 
        id: 8,
        name: "Leather Rockerman Jacket", 
        image: 'images/Leather Rockerman Jacket.jpg', 
        original: 89.00, 
        sale: 69.00,
        link: 'products/LeatherJacket.html',
        popularity: 93
    },
    { 
        id: 9,
        name: "BeachBoy Summer Shirt", 
        image: 'images/BeachBoy Summer Shirt.jpg', 
        original: 399.00, 
        sale: 339.00,
        link: 'products/summerShirt.html',
        popularity: 82
    },
    { 
        id: 10,
        name: "Premium Semi Leather Shoes", 
        image: 'images/Premium Semi Leather Shoes.jpg', 
        original: 119.00, 
        sale: 99.00,
        link: 'products/semiShoes.html',
        popularity: 89
    },
    { 
        id: 11,
        name: "Premium Blazer Yellow", 
        image: 'images/Premium Blazer Yellow.jpg', 
        original: 159.00, 
        sale: 129.00,
        link: 'products/blazerYellow.html',
        popularity: 91
    },
    { 
        id: 12,
        name: "Premium Leather Shoes", 
        image: 'images/Premium Leather Shoes.jpg', 
        original: 69.00, 
        sale: 49.00,
        link: 'products/preLeatherShoes.html',
        popularity: 94
    }
];

let cart = JSON.parse(localStorage.getItem('storeT_cart')) || [];

function saveCart() {
    localStorage.setItem('storeT_cart', JSON.stringify(cart));
}

const sortSelect = document.querySelector('.sort-select');
const productsGrid = document.querySelector('.products-grid');

function renderProducts(sortedProducts) {
    productsGrid.innerHTML = '';
    sortedProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-link', product.link); 
        card.setAttribute('data-id', product.id); 
        
        card.innerHTML = `
            <span class="sale-badge">Sale!</span>
            <div class="product-image" style="background-image: url('${product.image}');"></div>
            <div class="product-name">${product.name}</div>
            <div class="price-container">
                <span class="original-price">$${product.original.toFixed(2)}</span>
                <span class="sale-price">$${product.sale.toFixed(2)}</span>
            </div>
            <button class="add-to-cart" data-product-id="${product.id}">Add to cart</button>
        `;
        productsGrid.appendChild(card);
    });
    
    attachProductClickListeners();
}

function attachProductClickListeners() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.replaceWith(card.cloneNode(true));
    });
    
    document.querySelectorAll('.product-card').forEach(card => {
        // Click vào card (trừ nút) → Sang trang chi tiết
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart')) {
                const link = this.getAttribute('data-link');
                if (link) {
                    window.location.href = link;
                }
            }
        });
        
        const button = card.querySelector('.add-to-cart');
        if (button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Ngăn click card
                const productId = parseInt(this.getAttribute('data-product-id'));
                addToCart(productId);
            });
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Không tìm thấy sản phẩm!');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.sale,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();  // ← Lưu vào localStorage
    updateCart();
    updateCartBadge();
    showNotification(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
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
        saveCart();  
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
    saveCart(); 
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
    saveCart();  
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

sortSelect.addEventListener('change', function() {
    let sortedProducts = [...products];
    
    switch(this.value) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.sale - b.sale);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.sale - a.sale);
            break;
        case 'popularity':
            sortedProducts.sort((a, b) => b.popularity - a.popularity);
            break;
        default:
            sortedProducts = [...products];
    }
    
    renderProducts(sortedProducts);
    
    const resultsText = document.querySelector('.results-text');
    if (resultsText) {
        resultsText.textContent = `Showing all ${sortedProducts.length} results`;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    updateCart();
    updateCartBadge();
});