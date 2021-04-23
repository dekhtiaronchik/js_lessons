Vue.component('product-item', {
    props: ['product', 'img'],
    methods: {
        addProduct() {
            this.$emit('add-product', this.product);
        }
    },
    template: `
                <div class="product-item">
                    <img :src="img" alt="Some img">
                    <div class="desc">
                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price}}₽</p>
                        <button class="buy-btn" @click="addProduct()">Купить</button>
                    </div>
                </div>`
});