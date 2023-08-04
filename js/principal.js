/* CRIANDO FUNÇAO PARA LIMPAR FORMULARIO */
const limparFormulario = (endereco) => {
    /* USANDO FUNÇOES DO DOM(DOCUMENT OBJET MODERATION) */
    document.getElementById('endereco').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('numero').value = '';
}

/* POPULAR O FORMULÁRIO */
const preencherFomulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('estado').value = endereco.uf;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('bairro').value = endereco.bairro;
}

/* validando o cep "pesquisa REGEX"*/
const eNumero = (numero) => /^[0-9]+$/;

/* validando cep se tem 8 caracteres */
const cepValido = (cep) => 
    cep.lenght == 8 && eNumero(numero);

/* Fazendo uma requisição para a API viacep */
const pesquisaCep = async () => {
    limparFormulario();

    const cep = document.getElementById('cep').value.replace("-", "");
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    /* Verificando se o cep é valido */
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado!!!';
        } else{
            preencherFomulario('endereco');
        }
    }else {
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
}

document.getElementById('endereco')
.addEventListener('focusout',pesquisaCep);
