const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const serveStatic = require('serve-static');
const router = express.Router();
const path = require('path');
const ejs = require('ejs');

const app = express();

app.set('views', path.join(__dirname + '/views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(serveStatic(path.join(__dirname + '/public')));
app.use(router);

router.get('/*', routes.index);

app.listen(4444, '0.0.0.0', function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
