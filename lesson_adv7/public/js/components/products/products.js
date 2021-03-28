Vue.component('products', {
    data() {
        return {
            defaultImg: 'https://placehold.it/200x150',
        }
    },
    props: ['products'],
    template: `
            <div class="products full-size">
                <product-item 
                    v-for="product of products" 
                    :key="product.id_product" 
                    :img="defaultImg" 
                    :product="product"
                    @add-product="$emit('add-product',$event)"
                    >
                </product-item>
            </div>`
});