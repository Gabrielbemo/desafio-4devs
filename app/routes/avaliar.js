module.exports = function(app){
    app.post('/avaliar', function(req, res){
        app.app.controllers.avaliar.avaliar(app, req, res);
    })

    app.post('/efetuaravaliacao', function(req, res){
        app.app.controllers.avaliar.efetuaravaliacao(app, req, res);
    })
}