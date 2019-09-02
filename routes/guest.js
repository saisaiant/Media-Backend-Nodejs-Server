module.exports = (express) => {
    let router = express.Router();

    router.get('/home', (req,res)=>{
        res.send("Guset Home page");
    })

    return router;
}