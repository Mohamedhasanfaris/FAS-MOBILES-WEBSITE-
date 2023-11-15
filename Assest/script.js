window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown h2')) {
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
        }
    }
});
let cart = [];
function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    updateCartDisplay();
}
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    cartItemsElement.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`;
        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = 'Decrease';
        decreaseButton.onclick = function () {
            decreaseQuantity(item.name);
        };
        listItem.appendChild(decreaseButton);
        cartItemsElement.appendChild(listItem);
    });
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalElement.textContent = total.toFixed(2);
}
function decreaseQuantity(itemName) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity--;
        } else {
            cart = cart.filter(item => item.name !== itemName);
        }
        updateCartDisplay();
    }
}
function removeItem(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartDisplay();
}
function checkout() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    if (cart.length === 0) {
        alert('Your cart is empty. Add items before checking out.');
        return;
    }
    alert(`Thank you for your order! Total amount: ₹${totalElement.textContent}`);
    cart = [];
    updateCartDisplay();
}
function handleSocialMediaClick(event) {
    event.preventDefault();
    const socialMediaId = event.target.id;
    console.log(`Clicked on social media icon with ID: ${socialMediaId}`);
    window.open(event.target.href, '_blank');
}