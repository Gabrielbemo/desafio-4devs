module.exports = function(app){
    app.get('/cadastro-avaliacao', function(req, res){
        app.app.controllers.cadastroAvaliacao.cadastroAvaliacao(app, req, res);
    })
}