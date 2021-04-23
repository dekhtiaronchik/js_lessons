const express = require('express');
const fs = require('fs');
const app = express();
const cartController = require('./controllers/cartController');
const productsController = require('./controllers/productsController');


app.use(express.json());
app.use('/', express.static('../public'));

app.get('/api/products', productsController.getProducts);
app.get('/api/cart', cartController.getCart);
app.post('/api/cart', cartController.addProduct);
app.delete('/api/cart/:id', cartController.deleteProduct);

const port = 8082;
app.listen(port, () => {
    console.log(`Listening ${port} port`);
});