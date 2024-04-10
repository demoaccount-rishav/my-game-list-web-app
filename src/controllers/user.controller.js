import UserModel from "../models/user.model.js";

export default class UserController {

    getRegister(req, res) {
        res.render('register.ejs', { userEmail: req.session.userEmail });
    }

    postRegister(req, res) {
        const { name, email, password } = req.body;
        UserModel.AddUser(name, email, password);
        // console.log(req.body);
        res.render('login.ejs', { errorStack: [], successMessage: ['Registration Successful', 'Please Log Into Your Account'], userEmail: req.session.userEmail })
    }

    getLogin(req, res) {
        res.render('login.ejs', { errorStack: [], successMessage: [], userEmail: req.session.userEmail });
    }

    postLogin(req, res) {
        const { email, password } = req.body;
        const result = UserModel.searchUser(email, password)
        if (!result) {
            res.render('login.ejs', { errorStack: ["Invalid Credentials"], successMessage: [], userEmail: req.session.userEmail })
        }
        else {
            req.session.userEmail = email;
            // console.log(req.session);
            return res.render('login.ejs', { errorStack: [], successMessage: ['Login Successful'], userEmail: req.session.userEmail });
        }
    }

    logout(req, res) {
        // destroy session
        req.session.destroy(err => {
            if (err) {
                console.log(err);
            } else {
                res.render('login.ejs', { errorStack: [], successMessage: ['Logout Successful']});
            }
        })
    }

}