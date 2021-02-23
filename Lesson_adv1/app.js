const products = [{
        id: 1,
        title: 'Notebook',
        price: 20000
    },
    {
        id: 2,
        title: 'Mouse',
        price: 1500
    },
    {
        id: 3,
        title: 'Keyboard',
        price: 5000
    },
    {
        id: 4,
        title: 'Gamepad',
        price: 4500
    },
];

const renderProduct = (product) => {
    return `<div class="product-item">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
}



function renderProducts(products, path) {
    products.forEach(product => {
        document.querySelector(path).insertAdjacentHTML('beforeend', renderProduct(product));
    })
}

renderProducts(products, ".products");