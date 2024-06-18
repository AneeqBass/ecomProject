const cart = JSON.parse(localStorage.getItem('cart'));
const cartItemsContainer = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const payButton = document.getElementById('payButton');
const clearCartButton = document.getElementById('clearCartButton');

function populateCart() {
    let cartContent = '';
    let totalPrice = 0;

    cart.forEach(product => {
        cartContent += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Quantity: ${product.quantity}</p>
                        <p class="card-text">Price: R${product.price}</p>
                    </div>
                </div>
            </div>
        `;
        totalPrice += product.price * product.quantity;
    });

    cartItemsContainer.innerHTML = cartContent;
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function clearCart() {
    localStorage.removeItem('cart');
    cartItemsContainer.innerHTML = '';
    totalPriceElement.textContent = '0.00';
}


function handlePayment() {
    alert('Your payment successful! Thank you for shopping at RETRO KITZ'); 
    clearCart();
}

    
populateCart();

    
clearCartButton.addEventListener('click', clearCart);
payButton.addEventListener('click', handlePayment);
