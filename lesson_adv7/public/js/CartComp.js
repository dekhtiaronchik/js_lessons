Vue.component('cart', {
    data() {
        return {
            imgCart: 'https://placehold.it/50x100',
            cartItems: [],
            cartUrl: '/getBasket.json',

        }
    },
    methods: {
        addProduct(product) {
            let existingItem = this.cartItems.find(el => el.id_product === product.id_product);
            if (existingItem) {
                this.$parent.putJson(`/api/cart/${existingItem.id_product}`, {
                    quantity: 1
                });
                existingItem.quantity++;
            } else {
                let productForAdd = Object.assign({
                    quantity: 1
                }, product);
                this.$parent.postJson('/api/cart', productForAdd)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(productForAdd);
                        }
                    });
            }
        },
        deleteProduct(item) {
            this.$parent.deleteJson('/api/cart')
                .then((response) => {
                    if (response.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted() {
        this.$parent.getRequest('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
            <div>
                
                <div class="cart-block" v-show="$parent.showCart">
                    <h3>Корзина</h3>
                    <p v-if="!cartItems.length">Корзина пуста</p>
                    <cart-item class="cart-item" 
                        v-for="item of cartItems" 
                        :key="item.id_product" 
                        :cart-item="item" 
                        :img="imgCart"
                        @delete-product = "deleteProduct">  
                    </cart-item>
                </div>
            </div>`
});



Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
    <div>
        <div class="cart-item">
            <img :src="img" alt="Some image">
            <div class="product-desc">
                <p class="product-title">{{cartItem.product_name}}</p>
                <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
            </div>
        </div>
            <div class="right-block">
            <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
            <button class="del-btn" @click="$emit('delete-product', cartItem.id_product)">Удалить</button>
        </div>
    </div>
    `
});