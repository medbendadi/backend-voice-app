const mongoose = require('mongoose')

function DbConnect() {
   const DB_URL = process.env.DB_URL;

   mongoose.connect(DB_URL);

   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection Error:'));
   db.once('open', () => {
      console.log('DB connected...');
   })
}

module.exports = DbConnect;