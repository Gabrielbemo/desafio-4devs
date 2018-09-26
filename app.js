/* importar as configurações do oservidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(8080, function () {
    console.log('Servidor ON');
})
