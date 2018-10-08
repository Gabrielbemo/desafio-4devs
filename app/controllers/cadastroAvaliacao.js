var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports.cadastroAvaliacaoUm = function (app, req, res) {
    res.render('cadastro-avaliacao-um', { alerta: false, msg: "" });
}

module.exports.cadastroAvaliacaoDois = function (app, req, res) {
    obterClientes(res, req);
}

module.exports.efetuarCadastro = function (app, req, res) {
    postAvaliacao(req.body);
    obterAvaliacoesRequest(res);
}

var postAvaliacao = function (body) {

    var ajax = new XMLHttpRequest();

    ajax.open("POST", "https://projeto-4logic.firebaseio.com/avaliacoes.json", true);
    ajax.setRequestHeader("Content-type", "application/json");

    ajax.send(JSON.stringify(body));

}

var obterClientes = function (res, req) {

    var ajax = new XMLHttpRequest();

    ajax.open("GET", "https://projeto-4logic.firebaseio.com/clientes.json", true);

    ajax.send();

    ajax.onreadystatechange = function () {

        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.responseText;

            var clientes = JSON.parse(data);
            obterAvaliacoes(clientes, res, req);
        }
    }
}

var obterAvaliacoes = function (clientes, res, req) {

    var ajax = new XMLHttpRequest();

    ajax.open("GET", "https://projeto-4logic.firebaseio.com/avaliacoes.json", true);

    ajax.send();

    ajax.onreadystatechange = function () {

        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.responseText;

            var avaliacoes = JSON.parse(data);

            obterAvaliacoesDoisMesesAnteriores(clientes, avaliacoes, res, req)
        }
    }
}

var obterAvaliacoesRequest = function (res) {

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

var obterAvaliacoesDoisMesesAnteriores = function (clientes, avaliacoes, res, req) {
    var ajax = new XMLHttpRequest();

    ajax.open("GET", "https://projeto-4logic.firebaseio.com/avaliacoes.json", true);

    ajax.send();

    ajax.onreadystatechange = function () {

        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.responseText;

            var avaliacoes = JSON.parse(data);

            if (verificaAvaliacoes(avaliacoes, req)) {
                res.render('cadastro-avaliacao-um', { alerta: true, msg: "Ja existe uma avaliação nessa data" });
            } else {

                res.render('cadastro-avaliacao-dois', { clientes: obterClientesArray(clientes, obterClientesIndisponiveis1(avaliacoes, req.body), obterClientesIndisponiveis2(avaliacoes, req.body)), data: JSON.stringify(req.body) });
            }
        }
    }
}

var obterClientesArray = function (clientes, clientesIndisponiveis1, clientesIndisponiveis2) {
    var clientesDisponiveis = [];
    for (var propt in clientes) {
        if (clientePertence(clientes[propt].nome, clientesIndisponiveis1) || clientePertence(clientes[propt].nome, clientesIndisponiveis2)) {

        } else {
            clientesDisponiveis.push(clientes[propt].nome);
        }
    }
    return clientesDisponiveis;
}

var clientePertence = function (clienteNome, listaClientes) {
    if (listaClientes == null) {
        return false;
    }
    for (var i = 0; i < listaClientes.length; i++) {
        if (listaClientes[i] == clienteNome) {
            return true;
        }
    }
    return false;
}

var obterClientesIndisponiveis1 = function (avaliacoes, valor) {
    for (var propt in avaliacoes) {
        var dataAvaliacaoAtual = avaliacoes[propt].data;
        if (obterMesDataAPartirNumero(valor) == "1") {
            if (obterAnoDoBanco(dataAvaliacaoAtual) == obterAnoDaRequestAnterior1(valor)) {
                if ("12" == obterMesData(dataAvaliacaoAtual)) {
                    return avaliacoes[propt].clientes;
                }
            }
        } else {
            if (obterAnoDoBanco(dataAvaliacaoAtual) == obterAnoDaRequest(valor)) {
                if (obterMesAnteriorDaData(valor) == obterMesData(dataAvaliacaoAtual)) {
                    return avaliacoes[propt].clientes;
                }
            }
        }

    }
    return null;
}

var obterClientesIndisponiveis2 = function (avaliacoes, valor) {
    for (var propt in avaliacoes) {
        var dataAvaliacaoAtual = avaliacoes[propt].data;
        if (obterMesDataAPartirNumero(valor) == "2") {
            if (obterAnoDoBanco(dataAvaliacaoAtual) == obterAnoDaRequestAnterior1(valor)) {
                if ("12" == obterMesData(dataAvaliacaoAtual)) {
                    return avaliacoes[propt].clientes;
                }
            }
        } else  if (obterMesDataAPartirNumero(valor) == "1") {
            if (obterAnoDoBanco(dataAvaliacaoAtual) == obterAnoDaRequestAnterior1(valor)) {
                if ("11" == obterMesData(dataAvaliacaoAtual)) {
                    return avaliacoes[propt].clientes;
                }
            }
        } else {
            if (obterAnoDoBanco(dataAvaliacaoAtual) == obterAnoDaRequest(valor)) {
                if (obterMesAnterior2DaData(valor) == obterMesData(dataAvaliacaoAtual)) {
                    return avaliacoes[propt].clientes;
                }
            }
        }

    }
    return null;
}

var verificaAvaliacoes = function (avaliacoes, req) {
    for (var propt in avaliacoes) {

        var dataAvaliacaoAtual = avaliacoes[propt].data;

        if (obterAnoDoBanco(dataAvaliacaoAtual) == obterAnoDaRequest(req.body)) {
            if (obterMesDataAPartirNumero(req.body) == obterMesData(dataAvaliacaoAtual)) {
                return true;
            }
        }
    }
    return false;
}

// Obter Ano \/

var obterAnoDoBanco = function (data) {
    return "" + parseInt(data.charAt(10) + data.charAt(11) + data.charAt(12) + data.charAt(13));
}

var obterAnoDaRequest = function (data) {
    return "" + parseInt(JSON.stringify(data).charAt(9) + JSON.stringify(data).charAt(10) + JSON.stringify(data).charAt(11) + JSON.stringify(data).charAt(12));
}

var obterAnoDaRequestAnterior1 = function (data) {
    return "" + parseInt(JSON.stringify(data).charAt(9) + JSON.stringify(data).charAt(10) + JSON.stringify(data).charAt(11) + JSON.stringify(data).charAt(12) - 1);
}

// Obter Mes \/

var obterMesDataAPartirNumero = function (data) {
    return "" + parseInt(JSON.stringify(data).charAt(14) + JSON.stringify(data).charAt(15));
}

var obterMesData = function (data) {
    return "" + parseInt(data.charAt(15) + data.charAt(16));
}

var obterMesAnteriorDaData = function (data) {
    return "" + (parseInt(JSON.stringify(data).charAt(14) + JSON.stringify(data).charAt(15)) - 1);
}
var obterMesAnterior2DaData = function (data) {
    return "" + (parseInt(JSON.stringify(data).charAt(14) + JSON.stringify(data).charAt(15)) - 2);
}
