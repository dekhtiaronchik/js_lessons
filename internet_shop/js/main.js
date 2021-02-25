class ProductList {

    constructor(container = '.products') {
        this.container = container;
        this.products = [];
        this.fetchProducts();
        this.render();
        console.log(this.getTotalPrice());
    }



    getTotalPrice() {
        return this.products.reduce((sum, {
            price
        }) => sum + price, 0);
        // let sum = 0;
        // this.goods.forEach(good => {
        //     sum += good.price
        // });
        // return sum;
    }


    getTotalWithDiscount(discount) {
        return this.getTotalPrice() * discount;
    }


    fetchProducts() {
        this.products = [{
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
        return `<div class="product-item" data-id="${this.product.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.product.title}</h3>
                  <p>${this.product.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
    }
}

const productList = new ProductList();