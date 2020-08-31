const Repository = require('./repository');
const { diskStorage } = require('multer');
class CartsRepository extends Repository {}

module.exports = new CartsRepository('carts.json');
