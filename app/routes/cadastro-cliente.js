module.exports = function(app){
    app.get('/cadastro-cliente', function(req, res){
        app.app.controllers.cadastroCliente.cadastroCliente(app, req, res);
    })

    app.post('/cadastro-cliente', function(req, res){
        app.app.controllers.cadastroCliente.cadastroClienteBanco(app, req, res);
    })    
}