const mongoose = require('mongoose');

const username = process.env.DB_USER || '';
const password = process.env.DB_PASSWORD || '';
const cluster = process.env.DB_CLUSTER || '';
const database = process.env.DB_NAME || '';

const connection = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;

mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(err));
