const fs = require('fs');
const PRODUCT_SERVICE = require('../service/productService');
const qs = require('qs')

class Home {
    static getHtmlProducts(products, indexHtml) {
        let tbody = '';
        products.map((product, index) => {
            tbody += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td><a href="/product/edit/${product.id}" class="btn btn-danger">Edit</a></td>
            <td><a href="/product/delete/${product.id}" class="btn btn-danger">Delete</a></td>
        </tr>`
        });
        indexHtml = indexHtml.replace('{products}', tbody);
        return indexHtml;
    }

    static showHome(req, res) {
        fs.readFile('./views/index.html', 'utf-8', async (err, indexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let products = await PRODUCT_SERVICE.getProduct();
                indexHtml = Home.getHtmlProducts(products, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(indexHtml);
                res.end();
            }
        })
    }

    static showFormCreate(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/create.html', "utf-8", (err, createHtml) => {
                if (err) console.log(err)
                else {
                    res.writeHead(200, 'text/html');
                    res.write(createHtml);
                    res.end();
                }
            })
        } else {
            let productChunk = ''
            req.on('data', chunk => {
                productChunk += chunk
            })
            req.on('end', async (err) => {
                if (err) console.log(err)
                else {
                    let product = qs.parse(productChunk)
                    await PRODUCT_SERVICE.createProduct(product)
                    res.writeHead(301, {'location': '/home'})
                    res.end()
                }
            })
        }
    }

    static showFormEdit(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/edit.html', 'utf-8', async (err, editHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let product = await PRODUCT_SERVICE.findById(id);
                    console.log(product)
                    editHtml = editHtml.replace('{name}', product[0].name);
                    editHtml = editHtml.replace('{price}', product[0].price);
                    editHtml = editHtml.replace('{quantity}', product[0].quantity);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            })
        } else {
            let productChunk = '';
            req.on('data', chunk => {
                productChunk += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    let product = qs.parse(productChunk);
                    await PRODUCT_SERVICE.editProduct(product, id);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            });
        }
    }

    static productDelete(req, res, id) {
        console.log("id: ", id)
        if (req.method === 'GET') {
            fs.readFile('./views/delete.html', 'utf-8', (err, deleteHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(deleteHtml);
                    res.end();
                }
            })
        } else {
            PRODUCT_SERVICE.deleteProduct(id).then(() => {
                console.log('delete done')
            });
            res.writeHead(301, {'location': '/home'});
            res.end();
        }
    }
}

module.exports = Home
