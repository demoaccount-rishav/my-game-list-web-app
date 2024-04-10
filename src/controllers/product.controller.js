import ProductModel from "../models/product.model.js";

export default class ProductsController {

    async getProducts(req, res, next) {
        var products = await ProductModel.getAll();
        return res.render('products.ejs', { products, userEmail: req.session.userEmail });
    }

    getAddProduct(req, res, next) {
        res.render('new-product', { errorStack: [], userEmail: req.session.userEmail });
    }

    async postAddProduct(req, res, next) {
        const { name, desc, price } = req.body;
        const imageUrl = 'images/' + req.file.filename;
        await ProductModel.add(name, desc, price, imageUrl);
        var products = await ProductModel.getAll();
        res.render('products.ejs', { products, userEmail: req.session.userEmail });
    }

    async getUpdateProductView(req, res, next) {
        // 1. if product exists then return view
        // const id = req.params.id;
        const uid = req.params.uid;
        const productFound = await ProductModel.getById(uid);
        if (productFound) {
            res.render('update-product', { product: productFound, userEmail: req.session.userEmail });
        }
        // 2. else return errors.
        else {
            res.status(401).send('Product not found');
        }
    }

    async postUpdateProduct(req, res) {
        const { uid, name, desc, price } = req.body;
        // console.log(req.body);
        const imageUrl = 'images/' + req.file.filename;
        await ProductModel.update(uid, name, desc, price, imageUrl);
        var products = await ProductModel.getAll();
        res.render('products.ejs', { products, userEmail: req.session.userEmail });
    }

    async deleteProduct(req, res) {
        const uid = req.params.uid;
        const productFound = await ProductModel.getById(uid);
        if (!productFound) {
            return res.status(401).send('Product not found');
        }
        await ProductModel.delete(uid);
        var products = await ProductModel.getAll();
        res.render('products.ejs', { products, userEmail: req.session.userEmail });
    }
}