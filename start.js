const db = require('./server/db/database.js');
// and our server that we already created and used as the previous entry point is 'server.js'
const app = require('./server/index.js');
const port = process.env.PORT || 3999;

require('./localSecrets');
require('./mainApp');

if (process.env.NODE_ENV === 'development') {
  require('./localSecrets'); // this will mutate the process.env object with your secrets.
}

require('./mainApp');

db.sync({force: true})  // sync our database
  .then(function(){
    app.listen(port); // then start listening with our express server once we have synced
  });
