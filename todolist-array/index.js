import express from 'express';

const port = 9000;

const app = express();

app.set('view engine', 'ejs');

const record = [
    { id: 1, name: 'John', phone: 25 },
    { id: 2, name: 'Jane', phone: 30 },
    { id: 3, name: 'Bob', phone: 35 },
]
app.get('/', (req, res) => {
    return res.render('index', {
        data: record,
    })
})


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);

})