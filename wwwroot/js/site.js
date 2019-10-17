﻿function AjaxModal() {
    $(document).ready(function() {
        $(function() {
            $.ajaxSetup({ cache: false });

            $("a[data-modal]").on("click",
                function(e) {
                    $('#myModalContent').load(this.href,
                        function() {
                            $('#myModal').modal({
                                    keyboard: true
                                },
                                'show');
                            bindForm(this);
                        });
                    return false;
                });
        });

        function bindForm(dialog) {
            $('form', dialog).submit(function() {
                $.ajax({
                    url: this.action,
                    type: this.method,
                    data: $(this).serialize(),
                    success: function(result) {
                        if (result.success) {
                            $('#myModal').modal('hide');
                            $('#EnderecoTarget').load(result.url); // Carrega o resultado HTML para a div demarcada
                        } else {
                            $('#myModalContent').html(result);
                            bindForm(dialog);
                        }
                    }
                });

                return false;
            });
        }
    });
}

function BuscaCep() {
    $(document).ready(function() {
        function limpa_formulario_cep() {
            // Limpa valores do formulário de cep.
            $("#Endereco_Logradouro").val("");
            $("#Endereco_Bairro").val("");
            $("#Endereco_Cidade").val("");
            $("#Endereco_Estado").val("");
        }

        //Quando o campo cep perde o foco.
        $("#Endereco_Cep").blur(function() {

            //Nova variável "cep" somente com digitos.
            var cep = $(this).val().replace(/\D/g, '');

            //Verifica se o campo possui o valor informado.

            if (cep != "") {

                //Expressão regular para validar o CEP
                var validacep = /^[0-9]{8}$/;

                //Valida o formato do CEP.
                if (validacep.test(cep)) {
                    //Preenche os campos com "..." enquanto consulta o webservice.
                    $("#Endereco_Logradouro").val("...");
                    $("#Endereco_Bairro").val("...");
                    $("#Endereco_Cidade").val("...");
                    $("#Endereco_Estado").val("...");

                    //Consulta o webservice viacep.com.br
                    $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?",
                        function(dados) {
                            if (!("erro" in dados)) {
                                //Atualiza os campos com os valores da consulta.
                                $("#Endereco_Logradouro").val(dados.logradouro);
                                $("#Endereco_Bairro").val(dados.bairro);
                                $("#Endereco_Cidade").val(dados.localidade);
                                $("#Endereco_Estado").val(dados.uf);
                            } //end if.
                            else {
                                //CEP pesquisado não foi encontrado.
                                limpa_formulario_cep();
                                alert("CEP não foi encontrado.");
                            }
                        });
                } // endif
                else {
                    //cep inválido
                    limpa_formulario_cep();
                    alert("Formato de CEP inválido.");
                }
            } // end if
            else {
                //cep sem valor, limpa formulário
                limpa_formulario_cep();

            }
        });
    });
}

$(document).ready(function() {
    $("msg_box").fadeOut(2500);
})