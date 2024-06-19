let cart = JSON.parse(localStorage.getItem('cart'));
let cartItemsContainer = document.getElementById('cartItems');
let totalPriceElement = document.getElementById('totalPrice');
let payButton = document.getElementById('payButton');
let clearCartButton = document.getElementById('clearCartButton');

function populateCart() {
    let cartContent = '';
    let totalPrice = 0;

    cart.forEach(product => {
        cartContent +=`
        <div class="col-md-4 mb-4">
            <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <h3 class="price">${product.price.toFixed(2)}</h3>
                <p class="card-text">${product.category}</p>
                <button class="btn btn-dark addToCart" data-id="${product.id}">Add To Cart</button>
            </div>
            </div>
        </div>
        `;
        totalPrice += product.price
    });

    cartItemsContainer.innerHTML = cartContent;
    totalPriceElement.textContent = totalPrice.toFixed(2);
}
populateCart();

function clearCart() {
    localStorage.removeItem('cart');
    cartItemsContainer.innerHTML = '';
    totalPriceElement.textContent = '0.00';
}
clearCartButton.addEventListener('click', clearCart);


function pay() {
    alert('Your payment successful! Thank you for shopping at '); 
    clearCart();
}
payButton.addEventListener('click', pay);
