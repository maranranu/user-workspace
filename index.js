require('./env');
/** NPM package **/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');

const port = config.port;
const app = express();
// express middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors())
app.use(bodyParser.json());

/**
 * Routing
 */
const graph = require('./routes/graph');
const efs = require('./routes/efs');

app.use('/workspace/graph', graph);
app.use('/workspace/efs', efs);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
