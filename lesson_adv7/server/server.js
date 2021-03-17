const express = require('express');
const moment = require('moment');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use('/', express.static('../public'));

app.get('/api/products', (req, res) => {
    fs.readFile('./db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({
                result: 0,
                text: err
            }));
        } else {
            res.send(data);
        }
    });
});

app.get('/api/cart', (req, res) => {
    fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({
                result: 0,
                text: err
            }));
        } else {
            res.send(data);
        }
    });
});

app.post('/api/cart', (req, res) => {
    fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({
                result: 0,
                text: err
            }));
        } else {
            const cart = JSON.parse(data);
            cart.contents.push(req.body);
            fs.writeFile('./db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                    logger(req.body, "add");
                }
            })
        }
    });
});

app.put('/api/cart/:id', (req, res) => {
    fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({
                result: 0,
                text: err
            }));
        } else {
            const cart = JSON.parse(data);
            const existingItem = cart.contents.find(el => el.id_product === +req.params.id);
            existingItem.quantity += req.body.quantity;
            fs.writeFile('./db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    });
});

app.delete('/api/cart', (req, res) => {
    fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({
                result: 0,
                text: err
            }));
        } else {
            const cart = JSON.parse(data);
            const itemForDelete = cart.contents.find(item => item.id_product === +req.params.id);
            cart.contents.splice(cart.contents.indexOf(itemForDelete), 1);
            fs.writeFile('./db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                    logger(itemForDelete, "delete");
                }
            })
        }
    });
});

const logger = (productName, action) => {
    fs.readFile('./db/stats.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const stat = JSON.parse(data);
            stat.push({
                time: moment().format('DD MMM YYYY, h:mm:ss a'),
                product_name: productName,
                action: action,
            });
            fs.writeFile('./db/stats.json', JSON.stringify(stat, null, 4), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    })
};


const port = 8082;
app.listen(port, () => {
    console.log(`Listening ${port} port`);
});