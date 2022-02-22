const mongoose = require('mongoose');

async function connectdb(URL) {
  const db = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Connected to MongoDB: ${db.connection.host}`);
}
module.exports = connectdb;
