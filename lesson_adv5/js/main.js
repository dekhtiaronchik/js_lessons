const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const app = new Vue({
    el: '#app',
    data: {
        searchLine: '',
        products: [],
        filteredProducts: [],
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x100',
        cartItems: [],
        cartUrl: '/getBasket.json',
        catalogUrl: '/catalogData.json',
        showCart: false,
    },

    methods: {
        getRequest(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(product) {
            this.getRequest(`${API}/addToBasket.json`)
                .then(response => {
                    if (response.result === 1) {
                        const existingItem = this.cartItems.find(item =>
                            item.id_product === product.id_product);
                        if (existingItem) {
                            existingItem.quantity++;
                        } else {
                            let productForAdd = Object.assign({
                                quantity: 1
                            }, product);
                            this.cartItems.push(productForAdd);
                        }
                    }
                })
        },

        deleteProduct(id_product) {
            this.getRequest(`${API}/deleteFromBasket.json`)
                .then((response) => {
                    if (response.result === 1) {
                        const existingItemIndex = this.cartItems.findIndex(item => {
                            return item.id_product === id_product
                        });
                        if (existingItemIndex !== -1) {
                            if (this.cartItems[existingItemIndex].quantity > 1) {
                                this.cartItems[existingItemIndex].quantity--;
                            } else {
                                this.cartItems.splice(existingItemIndex, 1);
                            }
                        }
                    }


                })
        },

        filter() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.filteredProducts = this.products.filter(el => regexp.test(el.product_name));
        },
    },

    mounted() {
        this.getRequest(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
        this.getRequest(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filteredProducts.push(el);
                }
            });
    }
});