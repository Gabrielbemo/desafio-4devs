module.exports = function(app){
    
    app.post('/cadastro-avaliacao', function(req, res){
        app.app.controllers.cadastroAvaliacao.efetuarCadastro(app, req, res);
    }) 

    app.get('/cadastro-avaliacao-um', function(req, res){
        app.app.controllers.cadastroAvaliacao.cadastroAvaliacaoUm(app, req, res);
    }) 

    app.post('/cadastro-avaliacao-dois', function(req, res){
        app.app.controllers.cadastroAvaliacao.cadastroAvaliacaoDois(app, req, res);
    })
}