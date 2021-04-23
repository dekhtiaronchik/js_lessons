Vue.component('cart', {
    props: ['cart'],
    data() {
        return {
            imgCart: 'https://placehold.it/50x100',
        }
    },
    template: `
            <div>
                <div class="cart-block">
                    <h3>Корзина</h3>
                    <p v-if="!cart.contents.length">Корзина пуста</p>
                    <cart-item class="cart-item" 
                        v-for="item of cart.contents" 
                        :key="item.id_product" 
                        :cart-item="item" 
                        :img="imgCart"
                        @delete-product = "$emit('delete-product',$event)">  
                    </cart-item>
                </div>
            </div>`
});