module.exports = function(app){
    app.get('/avaliar', function(req, res){
        app.app.controllers.avaliar.avaliar(app, req, res);
    })
}