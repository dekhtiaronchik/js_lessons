Vue.component('products', {
    data() {
        return {
            products: [],
            filteredProducts: [],
            imgCatalog: 'https://placehold.it/200x150',
            catalogUrl: '/catalogData.json',
        }
    },
    methods: {

    },
    mounted() {
        this.$parent.getRequest(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filteredProducts.push(el);
                }
            });
    },
    template: `
            <div class="products full-size">
                <product-item 
                    v-for="item of filteredProducts" 
                    :key="item.id_product" 
                    :img="imgCatalog" 
                    :product-item="item">
                </product-item>
            </div>`
});

Vue.component('product-item', {
    props: ['productItem', 'img'],
    template: `
                <div class="product-item">
                    <img :src="img" alt="Some img">
                    <div class="desc">
                        <h3>{{productItem.product_name}}</h3>
                        <p>{{productItem.price}}₽</p>
                        <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(productItem)">Купить</button>
                    </div>
                </div>`
});