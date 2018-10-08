var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports.home = function(app, req, res){
    obterAvaliacoes(res, req);
}

var obterAvaliacoes = function (res) {

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