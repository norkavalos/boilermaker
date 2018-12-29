const app = require('./server');
const PORT = 1411;

app.listen(PORT, () => {
    console.log('YEII, listening on port' `${PORT}`);
});
