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
            <button class="del-btn" @click="$emit('delete-product', cartItem)">Удалить</button>
        </div>
    </div>
    `
});