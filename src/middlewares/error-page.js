export default function errorEncountered(req, res) {
    return res.status(404).render('error-page.ejs')
}