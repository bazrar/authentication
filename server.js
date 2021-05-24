const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./index');

const db_url = process.env.DB_URL.replace('<password>', process.env.DB_PASS);

mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to the db!'));

const port = process.env.PORT;

app.listen(port, () => console.log(`Server up and running at port ${port}`));
