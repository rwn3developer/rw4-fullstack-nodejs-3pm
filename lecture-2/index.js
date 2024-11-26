const http = require('http');

const app = http.createServer((req, res) => {
    res.write("<h1>Hello World</h1>");
    res.write("<h2>Hello World</h2>");
    res.end();
})
app.listen(8000, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`server is running`);

})

