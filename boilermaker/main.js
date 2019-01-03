const app = require('./server');
const PORT = 3999;

app.listen(PORT, () => {
    console.log('YEII, listening on port' `${PORT}`);
});
