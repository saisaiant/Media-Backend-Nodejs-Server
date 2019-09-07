let Gallery = require('../database/gallery');
let Product = require('../database/product');
let Cat = require('../database/cat');

module.exports = (express) => {
    let router = express.Router();

    router.get('/cats', (req, res) => {
        Cat.all()
            .then(result => res.json({
                con: true,
                msg: result
            }))
            .catch(err => res.json({
                con: false,
                msg: err
            }));
    });

    router.get('/galleries', (req, res) => {
        Gallery.all()
            .then(result => res.json({
                con: true,
                msg: result
            }))
            .catch(err => res.json({
                con: false,
                msg: err
            }));
    });

    router.get('/product/:start/:count', (req, res) => {
        let start = req.param("start");
        let count = req.param("count");
        //res.send(`Start ${start} count ${count}`);
        Product.paginate(Number(start), Number(count))
            .then(result => res.json({
                con: true,
                msg: result
            }))
            .catch(err => res.json({
                con: false,
                msg: err
            }));
    });

    return router;
}