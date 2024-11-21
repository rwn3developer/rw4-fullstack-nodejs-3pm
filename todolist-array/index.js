import express from 'express';

const port = 9000;

const app = express();

app.set('view engine', 'ejs');

let record = []

app.use(express.urlencoded());

app.get('/', (req, res) => {
    return res.render('index', {
        data: record,
    })
})

app.get('/add', (req, res) => {
    return res.render('add')
})

app.post('/insertrecord', (req, res) => {

    const { username, userphone } = req.body;
    let obj = {
        id: Date.now(),
        name: username,
        phone: userphone
    }
    record.push(obj);
    console.log("successfully add");

    return res.redirect('/')

})
app.get('/deleteuser', (req, res) => {
    let id = req.query.deleteId;
    let d = record.filter(val => val.id != id);
    record = d;
    console.log("record delete");
    return res.redirect('/')


})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);

})