const app = new Vue({
    el: '#app',
    data: {
        showCart: false,
        searchLine: '',
        allProducts: [],
        cart: {
            contents: []
        }
    },
    computed: {
        productsToShow: (vm) => {
            if (!vm.searchLine) {
                return vm.allProducts;
            }

            const regexp = new RegExp(vm.searchLine, 'i');
            return vm.allProducts.filter((product) => regexp.test(product.product_name));
        }
    },
    methods: {
        searchProduct(searchLine) {
            this.searchLine = searchLine;
        },
        addProduct(product) {
            apiClient.addToCart(product.id_product).then(response => {
                if (!response.result) {
                    return;
                }
                let existingItem = this.cart.contents.find(cartItem => cartItem.id_product === product.id_product);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    this.cart.contents.push({
                        ...product,
                        quantity: 1
                    });
                }
            });

        },
        deleteProduct(cartItem) {
            apiClient.deleteFromCart(cartItem.id_product).then(response => {
                if (!response.result) {
                    return;
                }
                if (cartItem.quantity > 1) {
                    cartItem.quantity--;
                } else {
                    this.cart.contents.splice(this.cart.contents.indexOf(cartItem), 1)
                }
            });
        },
    },
    mounted() {
        apiClient.getProducts()
            .then(response => {
                this.allProducts = response.data;
            });
        apiClient.getCart()
            .then(response => {
                this.cart = response.data;
            });
    },

    template: `
    <div>
        <header>
            <div class="logo">Интернет-магазин</div>
            <search @search="searchProduct"></search>
            <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
        </header>
        <main>
            <products :products="productsToShow" @add-product="addProduct"></products>
            <cart :cart="cart" v-show="showCart" @delete-product="deleteProduct"></cart>
        </main>
    </div>
    `
});