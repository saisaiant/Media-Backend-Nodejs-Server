require('dotenv').config();
let express = require('express'),
    app = express();
/*
const cat = require('./database/cat');

let catObj = {
    id : 2,
    name : 'Computer',
    image : 'computer.png',
    since : Date.now()
}

cat.save(catObj)
.then(res => console.log(res))
.catch(err => console.log(err));

cat.all()
.then(res => console.log(res))
.catch(err => console.log(err));

let obj = {
    id : '5d68dc0c2622743d3ac5f470',
    name : 'Car'
}

const seeder = require('./database/seeder');
seeder.seedCat();

cat.all().then(res => console.log(res)).catch(err => console.log(err));
*/


app.listen(process.env.PORT,()=>{
    console.log('Server is running at', process.env.PORT);
})
