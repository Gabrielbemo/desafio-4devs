module.exports.cadastroCliente = function (app, req, res) {
    res.render('cadastro-cliente');
}

module.exports.cadastroClienteBanco = function (app, req, res) {
    var data = req.body;
    
    app.app.models.clienteDAO.usersRef.push(data, function (err) {

        if (err) {

            res.send(err)

        } else {

            res.send('deu bom');

        }

    });
}