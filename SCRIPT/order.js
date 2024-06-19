function getProductsFromLocalStorage() {
    let products = JSON.parse(localStorage.getItem('Products'));
    if (!products || !Array.isArray(products) || products.length === 0) {
        products.push(new Product(1, "Dell XpS 13", "Laptop", "dell_xps_13.jpg", 24999.99));
        products.push(new Product(2, "MacBook pro", "Laptop", "macbook_pro.jpg", 36900));
        products.push(new Product(3, "HP Pavilion Desktop", "Desktop", "hp_pavilion.jpg", 15999.50));
        products.push(new Product(4, "Logitech MX Master 3", "peripherals", "logitech_mx_master_3.jpg", 1799));
        products.push(new Product(5, "Corsair K95 RGB platinum", "peripherals", "corsair_k95.jpg", 3300.75));
        products.push(new Product(6, "Intel Core i9-10900K", "Components", "intel_core_i9.jpg", 8700.50));
        products.push(new Product(7, "NVIDIA GeForce RTX 3080", "Components", "nvidia_rtx_3080.jpg", 18999.25));
        products.push(new Product(8, "Microsoft Office 365", "Software", "office_365.jpg", 1300));
        products.push(new Product(9, "Adobe Photoshop", "Software", "photoshop.jpg", 3599.99));
        products.push(new Product(10, "Cable Management Kit", "Miscellaneous", "cable_management_kit.jpg", 450));
        products.push(new Product(11, "Gaming Chair", "Miscellaneous", "gaming_chair.jpg", 3000));
        products.push(new Product(12, "Samsung 34-Inch Ultrawide Monitor", "Monitor", "samsung_ultrawide_monitor.jpg", 12499.50 ));
        
        localStorage.setItem('Products', JSON.stringify(products));
    }
    return products;
}

let productContainer = document.getElementById('productContainer');
let products = getProductsFromLocalStorage();

function Product(id, name, category, image, price) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.image = image;
    this.price = price;
}

function displayProducts(products) {
    products.forEach(product => {
        let cardHtml = `
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
        productContainer.innerHTML += cardHtml;
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = products.find(item => item.id === productId);

    if (product) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      alert('Product not found!');
    }
}

function searchProducts(query) {
    let filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
}

document.getElementById('searchInput').addEventListener('input', function() {
    searchProducts(this.value);
});

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);

    document.querySelectorAll('.addToCart').forEach(button => {
        button.addEventListener('click', function() {
          let productId = parseInt(this.getAttribute('data-id'));
          addToCart(productId);
          cartCount();
        });
    });
});

function cartCount() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    document.querySelector('.itemCount').textContent = cart.length;
}

cartCount();


