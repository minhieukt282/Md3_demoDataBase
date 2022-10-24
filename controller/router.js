const PRODUCT_ROUTING = require('./home');
const handler = {
    "home": PRODUCT_ROUTING.showHome,
    "product/create": PRODUCT_ROUTING.showFormCreate,
    "product/edit": PRODUCT_ROUTING.showFormEdit,
    "product/delete": PRODUCT_ROUTING.productDelete
}

module.exports = handler;