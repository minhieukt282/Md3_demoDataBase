const CONNECTION = require('../model/connection')

CONNECTION.connecting()

class ProductService {
    getProduct() {
        let connection = CONNECTION.getConnection()
        return new Promise((resolve, reject) => {
            connection.query('select * from product', (err, dataProduct) => {
                if (err) reject(err)
                else resolve(dataProduct)
            })
        })
    }

    createProduct(product) {
        let connection = CONNECTION.getConnection()
        let sql = `insert into product(name, price, quantity)
                   values ('${product.name}', ${+product.price}, ${+product.quantity})`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, dataProduct) => {
                if (err) reject(err)
                else {
                    console.log('create success')
                    resolve(dataProduct)
                }
            })
        })
    }

    findById(id) {
        let connection = CONNECTION.getConnection()
        let sql = `select *
                   from product
                   where id = ${id}`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, productId) => {
                if (err) reject(err)
                else {
                    console.log('Find id done')
                    resolve(productId)
                }
            })
        })
    }

    editProduct(product, id) {
        let connection = CONNECTION.getConnection()
        return new Promise((resolve, reject) => {
            let sql = `update product
                       set name     = '${product.name}',
                           price    = ${product.price},
                           quantity = ${product.quantity}
                       where id = ${id}`
            connection.query(sql, (err, productUpdate) => {
                if (err) reject(err)
                else {
                    console.log('update done')
                    resolve(productUpdate)
                }
            })
        })
    }

    deleteProduct(id) {
        let connection = CONNECTION.getConnection()
        return new Promise((resolve, reject) => {
            let sql = `delete
                       from product
                       where id = ${id}`
            connection.query(sql, (err, productDelete) => {
                if (err) reject(err);
                else resolve(productDelete)
            })
        })
    }
}

module.exports = new ProductService()
