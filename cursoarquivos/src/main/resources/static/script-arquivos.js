var BOTAO = new Object();
$(document).ready(function () {

    $("#barra-progresso").hide()

    $("#form1").html('<form enctype="multipart/form-data" class="forms" id="form-um-arquivo">' +
        '<div class="mb-3">' +
        '<label id="label-inf" for="formFile" class="form-label">INSIRA UM ARQUIVO:</label>' +
        '<input class="form-control" type="file" id="file" name="file">' +
        '<div style="display:flex;"><p id="porcent-result" style="color:white; margin:0 0 5px 0; font-weight:bold;">PROGRESSO: </p><p style="color:white; margin:0 0 5px 0; font-weight:bold; margin-left:5px;" id="porcent-text"></p></div><div id="progressBar">' +
        '<div id="barra-progresso" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"><p id="porcent" style="font-size:20px; margin:0; font-weight:bold;"></p></div>'+
        '<button id="btn-enviar" class="btn-btns btn btn-primary" onclick="BOTAO.cadastrarUmArquivos2()" type="button">ENVIAR</button>' +
        '</div>' +
        '</form>')

    $("#form2").html('<form class="forms" id="form-varios-arquivo" enctype="multipart/form-data">' +
        '<div class="mb-3">' +
        '<label id="label-inf" for="formFile" class="form-label">INSIRA VÁRIOS ARQUIVO:</label>' +
        '<input class="form-control" type="file" id="files" name="files" multiple>' +
        
        
        '<div style="display:flex;"><p id="porcent-result" style="color:white; margin:0 0 5px 0; font-weight:bold;">PROGRESSO: </p><p style="color:white; margin:0 0 5px 0; font-weight:bold; margin-left:5px;" id="porcent-text2"></p></div><div id="progressBar">' +
        '<div id="barra-progresso2" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"><p id="porcent2" style="font-size:20px; margin:0; font-weight:bold;"></p></div>'+


        '<button id="btn-enviar" class="btn-btns btn btn-primary" onclick="BOTAO.cadastraVariosArquivos2()" type="button">ENVIAR</button>' +
        '</div>' +
        '</form>')

    $("#form3").html('<form style="height:350px; margin-bottom:20px;" enctype:"multipart/form-data" name="form-geral" id="form-varios-arquivo-text" class="forms">' +
        '<div class="mb-3">' +
        '<label id="label-inf" for="formFile" class="form-label">INSIRA VÁRIOS ARQUIVO:</label>' +
        '<input name="filestext" class="form-control" type="file" multiple>' +
        '<label id="label-inf" for="formFile" class="form-label">INSIRA INFORMAÇÕES:</label>' +
        '<input style="margin:0 0 10px 0;" class="form-control" type="text" name="nome" placeholder="Informe seu nome:">' +
        '<input style="margin:0 0 10px 0;" class="form-control" type="text" name="cpf" placeholder="Informe seu cpf:">' +
        
        '<div style="display:flex;"><p id="porcent-result" style="color:white; margin:0 0 5px 0; font-weight:bold;">PROGRESSO: </p><p style="color:white; margin:0 0 5px 0; font-weight:bold; margin-left:5px;" id="porcent-text3"></p></div><div id="progressBar">' +
        '<div id="barra-progresso3" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"><p id="porcent3" style="font-size:20px; margin:0; font-weight:bold;"></p></div>'+
        
        '<button id="btn-enviar" class="btn-btns btn btn-primary" type="button" onclick="BOTAO.cadastraVariasInformacoes2()">ENVIAR</button>' +
        '</div>' +
        '</form>')

    BOTAO.cadastrarUmArquivos = function () {
        var data = new FormData($('#form-um-arquivo')[0]);

        $.ajax({
            url: "/arquivo/salvar",
            method: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function () {

            },
            timeout: 30000
        })
    }

    BOTAO.cadastraVariosArquivos = function () {

        var data = new FormData($("#form-varios-arquivo")[0]);

        $.ajax({
            url: "/arquivos/salvar",
            method: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function () {

            },

        })

    }


    BOTAO.cadastraVariasInformacoes = function () {

        var data = new FormData($('#form-varios-arquivo-text')[0]);

        $.ajax({
            url: "/informacoes/arquivos/salvar",
            method: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function () {

            },
            timeout: 30000,

        })

    }

    BOTAO.cadastrarUmArquivos2 = function () {


        var data = new FormData($('#form-um-arquivo')[0]);

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        $("#barra-progresso").show()
                        $("#barra-progresso").css({ "width": percentComplete + "%" })
                        $("#porcent").html(percentComplete + "%")

                        if (percentComplete === 100) {
                            $("#barra-progresso").css({ "background": "#198754" })
                            $("#porcent-text").html("<span style='background-color:#198754; padding:3px 8px; border-radius:5px;'>UPLOAD FINALIZADO COM SUCESSO.</span>")
                            
                        } else if(percentComplete <= 100){
                            $("#barra-progresso").css({ "background-color": "orange" })
                            $("#porcent-text").html("<span style='background-color:red; padding:3px 8px; border-radius:5px;'>PROCESSANDO...</span>")
                        }
                    }
                }, false);

                return xhr;
            },
            url: "/arquivo/salvar",
            method: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function () {
                $('#form-um-arquivo')[0].reset();
            },
            error:function () {
                $("#porcent-text3").html("<span style='background-color:red; padding:3px 8px; border-radius:5px;'>ERRO AO SALVAR INFORMAÇÕES, TENTE NOVAMENTE!</span>")
                $("#barra-progresso").css({ "background": "red" })
            }
        });

    }

    BOTAO.cadastraVariosArquivos2 = function () {

        var data = new FormData($("#form-varios-arquivo")[0]);

        $.ajax({
            xhr: function () {

                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        
                        $("#barra-progresso2").css({ "width": percentComplete + "%" })
                        $("#porcent2").html(percentComplete + "%")

                        if (percentComplete === 100) {
                            $("#barra-progresso2").css({ "background": "#198754" })
                            $("#porcent-text2").html("<span style='background-color:#198754; padding:3px 8px; border-radius:5px;'>UPLOAD FINALIZADO COM SUCESSO.</span>")
                            
                        } else if(percentComplete <= 100){
                            $("#barra-progresso2").css({ "background-color": "orange" })
                            $("#porcent-text2").html("<span style='background-color:red; padding:3px 8px; border-radius:5px;'>PROCESSANDO...</span>")
                            
                        }
                    }
                }, false);

                return xhr;
            },
            url: "/arquivos/salvar",
            method: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function () {
                
                $('#form-varios-arquivo')[0].reset();
            },
            error:function () {
                $("#porcent-text2").html("<span style='background-color:red; padding:3px 8px; border-radius:5px;'>ERRO AO SALVAR INFORMAÇÕES, TENTE NOVAMENTE!</span>")
                $("#barra-progresso2").css({ "background": "red" })
            }
        });

    }

    BOTAO.cadastraVariasInformacoes2 = function () {

        var data = new FormData($("#form-varios-arquivo-text")[0]);

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", function (evt) {

                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        
                        $("#barra-progresso3").css({ "width": percentComplete + "%" })
                        $("#porcent3").html(percentComplete + "%")

                        if (percentComplete === 100) {
                            $("#barra-progresso3").css({ "background": "#198754" })
                            $("#porcent-text3").html("<span style='background-color:#198754; padding:3px 8px; border-radius:5px;'>UPLOAD FINALIZADO COM SUCESSO.</span>")
                            
                        } else if(percentComplete <= 100){
                            $("#barra-progresso3").css({ "background-color": "orange" })
                            $("#porcent-text3").html("<span style='background-color:red; padding:3px 8px; border-radius:5px;'>PROCESSANDO...</span>")
                        }
                    }
                }, false);

                return xhr;
            },
            url: "/informacoes/arquivos/salvar",
            method: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function () {
                $('#form-varios-arquivo-text')[0].reset();
            },
            error:function () {
                $("#porcent-text3").html("<span style='background-color:red; padding:3px 8px; border-radius:5px;'>ERRO AO SALVAR INFORMAÇÕES, TENTE NOVAMENTE!</span>")
                $("#barra-progresso3").css({ "background": "red" })
            }
        });

        

    }
})
