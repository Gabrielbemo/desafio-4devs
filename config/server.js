/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var  consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* iniciar o objeto express */
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

/* setar as variaveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* efetua o autoload das rotas e dos controllers para o objeto app */
consign()
    .include('app/routes')
    .then('app/controllers')
    .into(app);

/* exportar o objeto app*/
module.exports = app;