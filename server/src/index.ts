import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
});

const port = 3000;
app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`);
});
