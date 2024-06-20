function getProductsFromLocalStorage() {
    let products = JSON.parse(localStorage.getItem('Products'));
    if (!products || !Array.isArray(products) || products.length === 0) {
        products.push(new Product(1, "Dell XpS 13", "Laptop", "https://aneeqbass.github.io/ecommerceImages/DellXpS13.jpg", 24999.99));
        products.push(new Product(2, "MacBook Pro", "Laptop", "https://aneeqbass.github.io/ecommerceImages/MacBookPro.jpg", 36900));
        products.push(new Product(3, "HP Pavilion Desktop", "Desktop", "https://aneeqbass.github.io/ecommerceImages/HPPavilionDesktop.jpg", 15999.50));
        products.push(new Product(4, "Logitech MX Master 3", "peripherals", "https://aneeqbass.github.io/ecommerceImages/LogitechMXMaster3.png", 1799));
        products.push(new Product(5, "Corsair K95 RGB Platinum", "peripherals", "https://aneeqbass.github.io/ecommerceImages/CorsairK95RGBPlatinum.png", 3300.75));
        products.push(new Product(6, "Intel Core i9-10900K", "Components", "https://aneeqbass.github.io/ecommerceImages/IntelCorei9-10900K.jpg", 8700.50));
        products.push(new Product(7, "NVIDIA GeForce RTX 3080", "Components", "https://aneeqbass.github.io/ecommerceImages/NVIDIAGeForceRTX3080.png", 18999.25));
        products.push(new Product(8, "Microsoft Office 365", "Software", "https://aneeqbass.github.io/ecommerceImages/MicrosoftOffice365.png", 1300));
        products.push(new Product(9, "Adobe Photoshop", "Software", "https://aneeqbass.github.io/ecommerceImages/AdobePhotoshop.png", 3599.99));
        products.push(new Product(10, "Cable Management Kit", "Miscellaneous", "https://aneeqbass.github.io/ecommerceImages/CableManagementKit.jpg", 450));
        products.push(new Product(11, "Gaming Chair", "Miscellaneous", "https://aneeqbass.github.io/ecommerceImages/GamingChair.jpg", 3000));
        products.push(new Product(12, "Samsung 34-Inch Ultrawide Monitor", "Monitor", "https://aneeqbass.github.io/ecommerceImages/Samsung34-InchUltrawideMonitor.jpg", 12499.50 ));
        
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
    productContainer.innerHTML = "";
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


function filterByCategory(category) {
    let filteredProducts = category ? products.filter(product => product.category === category) : products;
    displayProducts(filteredProducts);
}

function sortProductsByPrice(order) {
    let sortedProducts = [...products];
    if (order === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    displayProducts(sortedProducts);
}

function updateCategorySelect() {
    const categories = [...new Set(products.map(product => product.category))];
    categorySelect.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCategorySelect()

    document.getElementById('searchInput').addEventListener('input', function() {
        searchProducts(this.value);
    });

    document.getElementById('categorySelect').addEventListener('change', function() {
        filterByCategory(this.value);
    });

    document.getElementById('sortPriceSelect').addEventListener('change', function() {
        sortProductsByPrice(this.value);
    });

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
    cart.length == null? document.querySelector('.itemCount').textContent = 0:document.querySelector('.itemCount').textContent = cart.length;
}

cartCount();


