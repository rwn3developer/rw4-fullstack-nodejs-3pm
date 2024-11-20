const http = require('http');

const app = http.createServer((req, res) => {
    res.write("<h1>Har har mahadev</h1>")
    res.write("<h1>Har har mahadev shanbhu</h1>")
    res.write("<h1>kem chho tum</h1>");
    res.write("<h1>have tu gyo bhagat</h1>");
    res.write("<h1>have tu gyo bhagat</h1>");
    res.write("<h1>have tu gyo bhagat</h1>");
    res.write("<h1>have tu gyo bhagat</h1>");
    res.write("<h1>have tu gyo bhagat</h1>");
    res.end();
})

app.listen(8080)

