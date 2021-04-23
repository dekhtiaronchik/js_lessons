const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const getRequest = (url) => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    })
}



class Application {
    constructor() {
        this.cart = new Cart();
        this.productList = new ProductList(".products", this.cart);
    }

    load() {
        this.productList.init();
        this.cart.init();
        this.productList.getProducts();
        this.cart.getCart();
    }

}

///////////////////////////////////////


class ProductList {

    constructor(container, cart) {
        this.container = container;
        this.items = [];
        this.itemsToRender = [];
        this.cart = cart;
    }

    pushProducts(products) {
        //отфильтровываю дубликаты 
        const filteredProducts = products.filter(product => {
            const existingItem = this.items.find(item => {
                return item.product.id_product === product.id_product
            });
            return !existingItem;
        });
        const newItems = filteredProducts.map(product => new ProductItem(product))
        this.items = this.items.concat(newItems);
        this.itemsToRender = newItems;
        this.render();
    }

    render() {
        const block = document.querySelector(this.container);
        this.itemsToRender.forEach((productItem) => {
            block.insertAdjacentHTML('beforeend', productItem.toHTML());
        });
        this.itemsToRender = [];
    }

    getProducts() {
        return getRequest(`${API}/catalogData.json`)
            .then((response) => JSON.parse(response))
            .then((products) => {
                products.forEach(product => {
                    product.img = product.img || 'https://placehold.it/200x150';
                });
                this.pushProducts(products)
            })
            .catch((err) => {
                console.error(err);
            });
    }

    init() {
        const productBlock = document.querySelector(".products");
        productBlock.addEventListener("click", event => {
            if (event.target.classList.contains("buy-btn")) {
                const productId = Number(event.target.parentNode.dataset.id);
                const itemForAdd = this.items.find(item => {
                    return item.product.id_product === productId;
                });
                this.cart.onAddProduct(itemForAdd.product);
            }
        });
    }
}


class ProductItem {
    constructor(product) {
        this.product = product;
    }

    toHTML() {
        return `<div class="product-item" data-id="${this.product.id_product}">
                <img src="${this.product.img}" alt="Some img">
                <div class="desc">
                  <h3>${this.product.product_name}</h3>
                  <p>${this.product.price} \u20bd</p>
                </div>
                <button class="buy-btn">Купить</button>
          </div>`;
    }
}



class Cart {

    constructor() {
        this.items = [];
    }

    render() {
        const block = document.querySelector(".cart");
        block.innerHTML = "";
        this.items.forEach((cartItem) => {
            block.insertAdjacentHTML('beforeend', cartItem.toHTML());
        });
    }

    addProduct(product) {
        const existingItem = this.items.find(item => {
            return item.product.id_product === product.id_product
        });
        if (existingItem) {
            existingItem.amount++;
        } else {
            this.items.push(new CartItem(product, 1));
        }
    }

    addToCartAPI() {
        return getRequest(`${API}/addToBasket.json`)
            .then((response) => JSON.parse(response))
            .catch((err) => {
                console.error(err);
            });
    }

    onAddProduct(product) {
        this.addToCartAPI().then((response) => {
            if (response.result === 1) {
                this.addProduct(product);
                this.render();
            }
        });
    }

    deleteProduct(id_product) {
        const existingItemIndex = this.items.findIndex(item => {
            return item.product.id_product === id_product
        });
        if (existingItemIndex !== -1) {
            if (this.items[existingItemIndex].amount > 1) {
                this.items[existingItemIndex].amount--;
            } else {
                this.items.splice(existingItemIndex, 1);
            }
        }
    }

    deleteProductAPI() {
        return getRequest(`${API}/deleteFromBasket.json`)
            .then((response) => JSON.parse(response))
            .catch((err) => {
                console.error(err);
            });
    }

    onDeleteProduct(id_product) {
        this.deleteProductAPI().then((response) => {
            if (response.result === 1) {
                this.deleteProduct(id_product);
                this.render();
            }
        });
    }

    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
    }

    getCart() {
        return getRequest(`${API}/getBasket.json`)
            .then((response) => JSON.parse(response))
            .then((response) => {
                const cartItems = [];
                response.contents.forEach(item => {
                    item.img = item.img || 'https://placehold.it/200x150';
                    const cartItem = new CartItem(item, item.quantity);
                    cartItems.push(cartItem);
                });
                this.items = cartItems;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    init() {
        const productBlock = document.querySelector(".products");
        const btnCart = document.querySelector(".btn-cart");
        const cartBlock = document.querySelector(".cart");
        btnCart.addEventListener("click", event => {
            cartBlock.classList.toggle("hidden");
            productBlock.classList.toggle("full-size");
            this.render();
        });
        cartBlock.addEventListener("click", event => {
            if (event.target.classList.contains("del-btn")) {
                const productId = Number(event.target.parentNode.dataset.id);
                this.onDeleteProduct(productId);
            }
        });
    }
}



class CartItem {

    constructor(product, amount) {
        this.product = product;
        this.amount = amount;
    }

    getTotalPrice() {
        return this.product.price * this.amount;
    }

    toHTML() {
        return `<div class="product-item" data-id="${this.product.id_product}">
              <img src="${this.product.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.product.product_name}</h3>
                  <p>${this.product.price} \u20bd</p>
                  <p>Количество: ${this.amount}</p>
                </div>
                <button class="del-btn">Удалить</button>
          </div>`;
    }
}

const application = new Application();
application.load();