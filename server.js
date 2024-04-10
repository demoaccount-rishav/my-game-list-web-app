import express, { urlencoded } from 'express';
import express_ejs_layouts from 'express-ejs-layouts';
import session from 'express-session';
import { resolve } from 'node:path'

import ProductsController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';
import validateRequest from './src/middlewares/validation.middleware.js';
import upload from './src/middlewares/file-upload.middleware.js';
import authMiddleWare from './src/middlewares/auth.middleware.js';
import errorEncountered from './src/middlewares/error-page.js';
import { connectToMongoDB } from './src/configurations/mongodb.js';

const app = express();

app.use(express.static('public'));

const productsController = new ProductsController();
const userController = new UserController();

app.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(urlencoded({ extended: true }));
app.use(express_ejs_layouts);

// app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', resolve('src', 'views'))


app.get('/', authMiddleWare, productsController.getProducts);
app.get('/add-new-product', authMiddleWare, productsController.getAddProduct);
app.post('/', upload.single('imageUrl'), validateRequest, productsController.postAddProduct);
app.get('/update-product/:uid', authMiddleWare, productsController.getUpdateProductView);
// app.post('/update-product', productsController.postUpdateProduct);
app.post('/update-product', authMiddleWare, upload.single('imageUrl'), productsController.postUpdateProduct);
app.post('/delete-product/:uid', authMiddleWare, productsController.deleteProduct);



app.get('/register', userController.getRegister);
app.post('/register', userController.postRegister);

app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin)

app.get('/logout', userController.logout);

app.use(errorEncountered);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    connectToMongoDB()
});