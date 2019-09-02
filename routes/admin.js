module.exports = (express, passport) => {
    let router = express.Router();

    router.get('/home', (req, res) => {
        res.send("Admin Home Route");
    })

    return router;
}