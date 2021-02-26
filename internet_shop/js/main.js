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
///////////////////////////////////////


class ProductList {

    constructor(container = '.products') {
        this.container = container;
        this.products = [];
        this.getProducts()
            .then((products) => {
                this.products = products;
                this.render();
                console.log(this.getTotalPrice());
            });

    }



    getTotalPrice() {
        return this.products.reduce((sum, {
            price
        }) => sum + price, 0);
    }


    getTotalWithDiscount(discount) {
        return this.getTotalPrice() * discount;
    }


    getProducts() {
        return getRequest(`${API}/catalogData.json`)
            .then((response) => this.products = JSON.parse(response))
            .catch((err) => {
                console.log(err);
            });
    }


    render() {
        const block = document.querySelector(this.container);

        this.products.forEach((product) => {
            const productItem = new ProductItem(product);
            console.log(productItem);
            block.insertAdjacentHTML('beforeend', productItem.render());
        });
    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.product = product;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.product.product_id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.product.product_name}</h3>
                  <p>${this.product.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
    }
}

const productList = new ProductList();