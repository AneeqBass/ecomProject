let removeButtons = document.querySelectorAll('.remove-btn');
let addItemButton = document.getElementById('addItem');
let tableBody = document.getElementById('productTableBody');
let products = getProductsFromLocalStorage();
let row = document.createElement('tr');

function Product(id, name, category, image, price) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.image = image;
    this.price = price;
}

function getProductsFromLocalStorage() {
    let products = JSON.parse(localStorage.getItem('Products')) || [];
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

function displayProductsInTable(products) {
    tableBody.innerHTML = '';
    products.forEach(product => {
        let row = `
         <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td><img id="productImg" class="small-img img-fluid rounded mx-auto d-block" src="${product.image}" alt="${product.name}"></td>
        <td>${product.price.toFixed(2)}</td>
        <td>
          <button class="btn btn-primary btn-sm edit-btn" data-id="${product.id}">Edit</button>
          <button class="btn btn-danger btn-sm remove-btn" data-id="${product.id}">Remove</button>
        </td>
        </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            openEditModal(this.dataset.id);
        });
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            removeProduct(this.dataset.id);
        });
    });
}

function openEditModal(id) {
    const product = products.find(p => p.id == id);
    if (product) {
        document.getElementById('editProductId').value = product.id;
        document.getElementById('editProductName').value = product.name;
        document.getElementById('editProductCategory').value = product.category;
        document.getElementById('editProductImage').value = product.image;
        document.getElementById('editProductPrice').value = product.price;
        new bootstrap.Modal(document.getElementById('editProductModal')).show();
    }
}

function searchProducts(query) {
    let filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    displayProductsInTable(filteredProducts);
}

function filterByCategory(category) {
    let filteredProducts = category ? products.filter(product => product.category === category) : products;
    displayProductsInTable(filteredProducts);
}

function sortProductsByPrice(order) {
    let sortedProducts = [...products]; 
    if (order === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    displayProductsInTable(sortedProducts);
}

function addProduct(product) {
    products.push(product);
    localStorage.setItem('Products', JSON.stringify(products));
    displayProductsInTable(products);
}

function removeProduct(id) {
    products = products.filter(product => product.id != id);
    localStorage.setItem('Products', JSON.stringify(products));
    displayProductsInTable(products);
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
    displayProductsInTable(products);
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

    addItemButton.addEventListener('click', () => {
        let id = products.length ? products[products.length - 1].id + 1 : 1;
        let name = document.getElementById('productName').value;
        let category = document.getElementById('productCategory').value;
        let image = document.getElementById('productImage').value;
        let price = parseFloat(document.getElementById('productPrice').value);
        
        if (name && category && image && !isNaN(price)) {
            let newProduct = new Product(id, name, category, image, price);
            addProduct(newProduct);
            document.getElementById('productName').value = '';
            document.getElementById('productCategory').value = '';
            document.getElementById('productImage').value = '';
            document.getElementById('productPrice').value = '';
        } else {
            alert('Please fill out all fields correctly.');
        }
    });
});


document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('editProductId').value;
    const name = document.getElementById('editProductName').value;
    const category = document.getElementById('editProductCategory').value;
    const image = document.getElementById('editProductImage').value;
    const price = parseFloat(document.getElementById('editProductPrice').value);

    const productIndex = products.findIndex(p => p.id == id);
    if (productIndex > -1 && name && category && image && !isNaN(price)) {
        products[productIndex] = new Product(id, name, category, image, price);
        localStorage.setItem('Products', JSON.stringify(products));
        displayProductsInTable(products);
        new bootstrap.Modal(document.getElementById('editProductModal')).hide();
    } else {
        alert('Please fill out all fields correctly.');
    }
});