function Product(id, name, image, quantity, price) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.quantity = quantity;
    this.price = price;
}


let products = [
    { id: 1, name: 'MANCHESTER UNITED 1998 HOME RETRO KIT', price: 1200, description: 'This is the Manchester United Home kit for the 1998-99 Season where they won the Premier League.', image: 'https://mahmud-isaacs.github.io/ecomHostedImages/manUnited.jpg' },

    { id: 2, name: '1996/1997 REAL MADRID RETRO JERSEY', price: 2000, description: 'Special Real Madrid shirt that was released after Madrid won the La Liga season 1996-1997. It was the 66th time Madrid won this Spanish domestic top-tier league.The players faces are present within the material of the shirt. Players like Clarence Seedorf, Davor Šuker, Predrag Mijatović, Raúl.', image: 'https://mahmud-isaacs.github.io/ecomHostedImages/realMadrid.jpg' },
    { id: 3, name: 'TOTTENHAM HOTSPUR 1994 RETRO JERSEY', price: 600, description: 'Worn in a season where Spurs would finish 7th in the league under Gerry Francis', image: 'https://mahmud-isaacs.github.io/ecomHostedImages/spurs.jpg' },

    { id: 4, name: 'MANCHESTER CITY HOME 1997 99 RETRO JERSEY', price: 1100, description: 'The home shirt for the season was a slightly darker shade of blue than the traditional City sky blue known as ‘Laser Blue’. While the home shirt was generally well received, it was the away kit that would take on a special significance to Manchester City fans.', image: 'https://mahmud-isaacs.github.io/ecomHostedImages/manCity.jpg' },

    { id: 5, name: 'ARSENAL 2002-23 HOME KIT RETRO JERSEY', price: 900, description: 'Worn by the likes of Thierry Henry, Dennis Bergkamp, Ashley Cole, Patrick Vieira, Sol Campbell and Giovanni van Bronckhorst.', image: 'https://mahmud-isaacs.github.io/ecomHostedImages/aresnal.jpg' },

    { id: 6, name: 'FC BARCELONA HOME 2010 11 RETRO JERSEY', price: 850, description: 'FC Barcelona 2010/2011 Barca Retro Jersey. Worn by the likes of Lionel Messi.', image: 'https://mahmud-isaacs.github.io/ecomHostedImages/barce.jpg' },

    { id: 7, name: 'CHELSEA AWAY 2003-04 RETRO JERSEY', price: 1250, description: 'Famous away shirt featuring Juan Sebastian Verons name-set in official Lextra felt. The Argentine was one of the most lucractive players in the world at the time of his transfer to Chelsea, but his career in West London was marred by injuries.', image: 'https://mahmud-isaacs.github.io/ecomHostedImages/chelsea.jpg' },

    { id: 8, name: 'ENGLAND 1990 RETRO JERSEY', price: 1300, description: 'Englands alternative football shirt for the Italia 90 World Cup.This was the first blue shirt used since 1970 World Cup.Used against Turkey in a European Qualifying game winning 1-0, Dennis Wise scored his one and only international goal.', image: 'https://mahmud-isaacs.github.io/ecomHostedImages/images%20(1).jpg' },

    { id: 9, name: '1998 SOUTH AFRICA HOME RETRO JERSEY', price: 700, description: 'Step into a time machine and immerse yourself in the rich history of South African football with our 1998 South Africa Home Retro Kit. This meticulously crafted kit is a faithful reproduction of the iconic jersey worn during that momentous year.', image: 'https://mahmud-isaacs.github.io/ecomHostedImages/SA.jpg' },
];


localStorage.setItem('products', JSON.stringify(products));


let productSearch = document.querySelector('.searchInput');
let searchButton = document.querySelector('.searchButton');
let productCards = document.querySelectorAll('.card'); 

productSearch.addEventListener('input', () => {
  let searchValue = productSearch.value.toLowerCase();
  let filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchValue);
  });

  productCards.forEach((card) => {
    let productName = card.querySelector('.card-title').textContent.toLowerCase();
    card.style.display = filteredProducts.some(p => p.name.toLowerCase() === productName) ? 'block' : 'none';
  });
});





function addToCart(id) {
    const product = products.find(product => product.id === id);
    if (product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        cartCount();
        console.log('Product added to cart:', product);
    } 
}


function cartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.querySelector('.itemCount').textContent = itemCount;
}


document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', event => {
        const productId = parseInt(event.target.dataset.id);
        addToCart(productId);
    });
});


cartCount();


