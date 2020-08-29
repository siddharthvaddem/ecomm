const express = require('express');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ 'lewcuygebcweueehd273b' ]
	})
);

app.use(authRouter);

app.listen(3000, () => {
	console.log('listening');
});
