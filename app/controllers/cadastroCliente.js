var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var firebase = require("firebase");

firebase.initializeApp({

    databaseURL: "https://desafio-4-devs-teste.firebaseio.com",
    serviceAccount: './projeto-4logic-firebase-adminsdk-pw00g-b6023c2ddf.json',

});

module.exports.cadastroCliente = function (app, req, res) {
    res.render('cadastro-cliente', { alerta: false, msg: "" });
}

module.exports.cadastroClienteBanco = function (app, req, res) {


    getClientes(res, req.body);

    

}

var getClientes = function (res, body) {

    var ajax = new XMLHttpRequest();

    ajax.open("GET", "https://projeto-4logic.firebaseio.com/clientes.json", true);

    ajax.send();

    ajax.onreadystatechange = function () {

        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.responseText;
         
            var clientes = JSON.parse(data);
            if(select(clientes,body)){
                res.render('cadastro-cliente', { alerta: true, msg: "Nome ou nome do contado ja existe" });
            }else{
                res.render('cadastro-cliente', { alerta: true, msg: "Cadastrado com sucesso" });
                postClient(body);
            }
        }
    }    
    
}

var select = function(clientes, body){
    for (var propt in clientes) {

        if (clientes[propt].nome == body.nome || clientes[propt].contato == body.contato) {
           return true;
        }
    }
    return false;
}

var postClient = function (body) {

    var ajax = new XMLHttpRequest();

    ajax.open("POST", "https://projeto-4logic.firebaseio.com/clientes.json", true);
    ajax.setRequestHeader("Content-type", "application/json");

    ajax.send(JSON.stringify(body));

}
