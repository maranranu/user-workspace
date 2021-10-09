require('./env');
/** NPM package **/
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const port = config.port;
const app = express();
// express middleware
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
let cors = require('cors');

let corsOptions = {
  credentials: true,
  origin: true
};

app.use(cors(corsOptions));

/**
 * Routing
 */
const workspace = require('./routes/workspace');

app.get('/', (req, res) => {
  res.json({
    uptime: process.uptime()
  });
})

app.use('/workspace', workspace);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
