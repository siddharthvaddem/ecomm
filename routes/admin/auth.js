const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
	requireEmail,
	requirePassword,
	requirePasswordConfirmation,
	requireEmailExists,
	requireValidPasswordForUser
} = require('./validators');
const router = express.Router();
//route handler---to know what to do when receiving a request
router.get('/signup', (req, res) => {
	//POST-post type request-to create a record for the HTML section below
	res.send(signupTemplate({ req }));
});

router.post(
	'/signup',
	[ requireEmail, requirePassword, requirePasswordConfirmation ],
	handleErrors(signupTemplate),
	async (req, res) => {
		const { email, password } = req.body;

		const user = await usersRepo.create({ email, password });

		req.session.userId = user.id;

		res.redirect('/admin/products');
	}
);

router.get('/signout', (req, res) => {
	req.session = null;
	res.send('You are logged out');
});

router.get('/signin', (req, res) => {
	res.send(signinTemplate({}));
});

router.post(
	'/signin',
	[ requireEmailExists, requireValidPasswordForUser ],
	handleErrors(signinTemplate),
	async (req, res) => {
		const { email, password } = req.body;
		const user = await usersRepo.getOneBy({ email });
		if (!user) {
			return res.send('Email not found');
		}

		req.session.userId = user.id;
		res.redirect('/admin/products');
	}
);

module.exports = router;
