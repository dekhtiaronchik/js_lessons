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
            this.$parent.getRequest(`${API}/addToBasket.json`)
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
            this.$parent.getRequest(`${API}/deleteFromBasket.json`)
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
    },
    mounted() {
        this.$parent.getRequest(`${API + this.cartUrl}`)
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