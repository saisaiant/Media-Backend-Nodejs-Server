const fs = require('fs');
const Cat = require('./cat');

let seedCat = () => {
    
    fs.readFile('cat.json', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            let cats = JSON.parse(data);
            cats.forEach((cat) => {
                let obj = {
                    id : cat.id,
                    name : cat.name,
                    image : cat.image,
                    since : new Date()
                };
                Cat.save(obj)
                .then(res=>console.log(res))
                .catch(err => console.log(err));
            });
        }
    })
}

module.exports = {
    seedCat
}