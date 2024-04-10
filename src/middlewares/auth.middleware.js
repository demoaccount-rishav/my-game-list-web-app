export default function authMiddleWare(req, res, next) {
    if (req.session.userEmail) {
        next();
    }
    else {
        res.render('login.ejs', { errorStack: ["You Must Be Logged In First"], successMessage: [] });
    }
}