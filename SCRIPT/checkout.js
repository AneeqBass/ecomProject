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
         <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td class="w-25"><img class="small-img img-fluid rounded mx-auto d-block w-25" src="${product.image}" alt="${product.name}"></td>
        <td>${product.price.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm remove-btn" data-id="${product.id}">Remove</button></td>
        </tr>
        `;
        totalPrice += product.price
    });

    cartItemsContainer.innerHTML = cartContent;
    totalPriceElement.textContent = totalPrice.toFixed(2);
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            removeProduct(this.dataset.id);
            populateCart()
        });
    });
}

function removeProduct(id) {
    cart = cart.filter(cartItem => cartItem.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    populateCart()
}

function clearCart() {
    localStorage.removeItem('cart');
    cartItemsContainer.innerHTML = `<tr>
                                <th></th>
                                <th>Cart Empty</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>`;
    totalPriceElement.textContent = '0.00';
}
clearCartButton.addEventListener('click', clearCart);


function pay() {
    alert('Your payment successful! Thank you for shopping at '); 
    clearCart();
}
payButton.addEventListener('click', pay);



populateCart()