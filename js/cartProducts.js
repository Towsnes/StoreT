let selectedSize = null;
let selectedColor = null;

document.addEventListener('DOMContentLoaded', function() {
    const sizeButtons = document.querySelectorAll('.size-btn');
    
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.getAttribute('data-size');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const colorButtons = document.querySelectorAll('.color-btn');
    
    colorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            colorButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.getAttribute('data-color');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.querySelector('.add-to-cart');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            addToCartFromDetail();
        });
    }
});

function addToCartFromDetail() {
    if (!selectedSize) {
        alert('⚠️ Vui lòng chọn size!');
        return;
    }
    
    if (!selectedColor) {
        alert('⚠️ Vui lòng chọn màu sắc!');
        return;
    }
    
    const productName = document.querySelector('.product-title').textContent;
    const priceText = document.querySelector('.new-price').textContent;
    const price = parseFloat(priceText.replace('$', ''));
    const imageUrl = document.querySelector('.product-image img').src;

    const product = {
        id: Date.now(), 
        name: productName,
        price: price,
        image: imageUrl,
        size: selectedSize,
        color: selectedColor,
        quantity: 1
    };
    
    if (typeof cart === 'undefined') {
        cart = JSON.parse(localStorage.getItem('storeT_cart')) || [];
    }
    
    const existingItem = cart.find(item => 
        item.name === product.name && 
        item.size === selectedSize && 
        item.color === selectedColor
    );
    
    if (existingItem) {
        existingItem.quantity++;
        showNotification(`✅ Đã cập nhật "${productName}" (${selectedSize}, ${selectedColor}) trong giỏ hàng!`);
    } else {
        cart.push(product);
        showNotification(`✅ Đã thêm "${productName}" (${selectedSize}, ${selectedColor}) vào giỏ hàng!`);
    }

    localStorage.setItem('storeT_cart', JSON.stringify(cart));

    if (typeof updateCart === 'function') {
        updateCart();
    }
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }
}

function showNotification(message) {
    const oldNotification = document.querySelector('.product-notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'product-notification';
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
    }, 2500);
}