const db = require('./server/db/database.js');
// and our server that we already created and used as the previous entry point is 'server.js'
const app = require('./server/index.js');
const port = process.env.PORT || 3999;

db.sync({force: true})  // sync our database
  .then(function(){
    app.listen(port); // then start listening with our express server once we have synced
  });
