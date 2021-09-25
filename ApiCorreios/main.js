'use strict';

const limparFormulario = (endereco) => {
  document.getElementById('endereco').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) => {
  document.getElementById('endereco').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepInvalido = (cep) => cep.length === 8 && eNumero(cep);

const pesquisarCep = async() => {
  limparFormulario();
  const cep = document.getElementById('cep').value;
  const url =`https://viacep.com.br/ws/${cep}/json/`;
  if (cepInvalido(cep)){
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty('erro')){
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'CEP não encontrado!',
      });
    }else{
      preencherFormulario(endereco);
    }
  }else{
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'CEP Incorreto!!',
    });
  }
  
}

document.getElementById('cep').addEventListener('focusout',pesquisarCep);


// dark and light
const body = document.querySelector('body');
const toggle = document.getElementById('toggle');
toggle.onclick = function() {
  toggle.classList.toggle('active')
  body.classList.toggle('active')
}