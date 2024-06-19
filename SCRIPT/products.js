let removeButtons = document.querySelectorAll('.remove-btn');
let addItemButton = document.getElementById('addItem');
let tableBody = document.getElementById('productTableBody');

function Product(id, name, category, image, price) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.image = image;
    this.price = price;
}

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

function displayProductsInTable(products) {
    products.forEach(product => {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td><img class="small-img" src="${product.image}" alt="${product.name}"></td>
        <td>${product.price.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm remove-btn" data-id="${product.id}">Remove</button></td>
        `;
        tableBody.appendChild(row);
    });

    document.addEventListener('DOMContentLoaded', () => {
        let products = getProductsFromLocalStorage();
        displayProductsInTable(products);
    });
}



document.addEventListener('DOMContentLoaded', () => {
    let products = getProductsFromLocalStorage();
    displayProductsInTable(products);
});

    