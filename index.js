const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const bodyParser = require('body-parser');
const adminProductsRouter = require('./routes/admin/products');

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ 'lewcuygebcweueehd273b' ]
	})
);

app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);
app.listen(3000, () => {
	console.log('listening');
});
