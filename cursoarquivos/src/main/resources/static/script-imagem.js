var BOTAO = new Object();
$(document).ready(function () {

    BOTAO.enviarArquivo = function () {
        $.ajax({
            url:"/home/salvar",
            method:"POST",
            data:"asdasd",
            success:function () {
                
            },
            error:function () {
                
            }
        })     
    }
})