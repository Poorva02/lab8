const express = require('express');
const app = express();
app.use(express.json());

const port = 3002;

let counter = 0;


app.post('/service2/*', (req, res) => {
    counter++;
    console.log('count', counter);
    console.log(req.body);
    let valid = false;
    if(req.body.username === 'abc' && req.body.password === '202cb962ac59075b964b07152d234b70'){
        valid = true;
    }
    console.log(valid);
    res.send({
        valid,
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))