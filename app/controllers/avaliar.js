var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports.avaliar = function (app, req, res) {
    obterAvaliacoes(res, req.body);  
}

module.exports.efetuaravaliacao = function(app,req,res){
    postAvaliacao(req.body,res);
}

var postAvaliacao = function (body,res) {

    var ajax = new XMLHttpRequest();

    ajax.open("POST", "https://projeto-4logic.firebaseio.com/avaliacoes-finalizadas.json", true);
    ajax.setRequestHeader("Content-type", "application/json");

    ajax.send(JSON.stringify(body));
    obterAvaliacoesDois(res);
}

var obterAvaliacoesDois = function (res) {

    var ajax = new XMLHttpRequest();

    ajax.open("GET", "https://projeto-4logic.firebaseio.com/avaliacoes.json", true);

    ajax.send();

    ajax.onreadystatechange = function () {

        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.responseText;

            var avaliacoes = JSON.parse(data);

            res.render('index',{dados: avaliacoes});
        }
    }
}

var obterAvaliacoes = function (res, req) {

    var ajax = new XMLHttpRequest();

    ajax.open("GET", "https://projeto-4logic.firebaseio.com/avaliacoes.json", true);

    ajax.send();

    ajax.onreadystatechange = function () {

        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.responseText;

            var avaliacoes = JSON.parse(data);
            
            obterAvaliacoesFeitas(obterClientesAvaliacao(avaliacoes, req), req,res);
        }
    }
}

var obterAvaliacoesFeitas = function (clientes, req,res) {

    var ajax = new XMLHttpRequest();

    ajax.open("GET", "https://projeto-4logic.firebaseio.com/avaliacoes-finalizadas.json", true);

    ajax.send();

    ajax.onreadystatechange = function () {

        if (ajax.readyState == 4 && ajax.status == 200) {
            var dado = ajax.responseText;
            var data = JSON.parse(dado);
            res.render('avaliar',{ dataDaAvaliacao : JSON.stringify(req).charAt(10) + JSON.stringify(req).charAt(11) + JSON.stringify(req).charAt(12) + JSON.stringify(req).charAt(13) + JSON.stringify(req).charAt(14) + JSON.stringify(req).charAt(15) + JSON.stringify(req).charAt(16)        ,dados : verificaClientesDaAvaliacoes(clientes, req, data) });
            
        }
    }
}

var verificaClientesDaAvaliacoes = function (clientes, req, data) {
    var clientesDisponiveis = [];
    for (var propt in clientes) {
        if(verificaAvaliacoesFeitas(clientes[propt],req,data)){
            clientesDisponiveis.push(clientes[propt]);
        }   
    }
    return clientesDisponiveis;
}

var verificaAvaliacoesFeitas = function(nome,req,data){
    for (var propt in data) {
        if(data[propt].cliente == nome && parseInt(data[propt].data.charAt(5) + data[propt].data.charAt(6) + data[propt].data.charAt(7)) == obterAnoDaRequest(req) && parseInt(data[propt].data.charAt(1) + data[propt].data.charAt(2) + data[propt].data.charAt(3)) == obterMesDataAPartirNumero(req)){
            return false;
        }
    }
    return true;
}

var obterClientesAvaliacao = function (avaliacoes, req) {
    for (var propt in avaliacoes) {
        var dataAvaliacaoAtual = avaliacoes[propt].data;
        if (obterMesDataAPartirNumero(req) == obterMesData(dataAvaliacaoAtual)) {
            if (obterAnoDoBanco(dataAvaliacaoAtual) == obterAnoDaRequest(req)) {
                return avaliacoes[propt].clientes;
            }
        }
    }
    return false;
}

var obterAnoDoBanco = function (data) {
    return "" + parseInt(data.charAt(12) + data.charAt(13));
}

var obterAnoDaRequest = function (data) {
    return "" + parseInt(JSON.stringify(data).charAt(14) + JSON.stringify(data).charAt(15) + JSON.stringify(data).charAt(16));
}

var obterMesDataAPartirNumero = function (data) {
    return "" + parseInt(JSON.stringify(data).charAt(10) + JSON.stringify(data).charAt(11));
}

var obterMesData = function (data) {
    return "" + parseInt(data.charAt(15) + data.charAt(16));
}