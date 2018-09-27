module.exports = function(app){
    app.get('/resultado', function(req, res){
        app.app.controllers.resultado.resultado(app, req, res);
    })
}
