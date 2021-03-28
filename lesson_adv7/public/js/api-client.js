const apiClient = {
    addToCart(productId) {
        return httpClient.post('/api/cart', {
            productId
        });
    },
    deleteFromCart(productId) {
        return httpClient.delete(`/api/cart/${productId}`);
    },
    getProducts() {
        return httpClient.get('/api/products');
    },
    getCart() {
        return httpClient.get('/api/cart');
    },
}