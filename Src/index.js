const Produto = document.querySelector("input#Listar1");
const Tamanho = document.querySelector("input#Listar2");
const Preco = document.querySelector("input#Listar3");
const Botao_Adicionar = document.querySelector("form button");
const UL_lista = document.querySelector("ul1");

var soma = 0;

Botao_Adicionar.onclick = (ev) => {
  ev.preventDefault();

  if (Produto.value) {
    salvarProduto();

    Produto.value = "";
    Tamanho.value = "";
    Preco.value = "";
  }
};

function salvarProduto() {
  var produto = {
    nome: Produto.value,
    tamanho: Tamanho.value,
    preco: Preco.value,
  };
  var produtos = [];
  if (localStorage.getItem("produtos")) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }
  produtos.push(produto);
  localStorage.setItem("produtos", JSON.stringify(produtos));
  carregarProdutos();
}



function carregarProdutos() {
  var produtos = [];

  if (localStorage.getItem("produtos")) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }
  UL_lista.innerHTML = "";

  produtos.forEach((produto) => {
    const Valor = document.createElement("span");
    Valor.innerHTML = produto.nome + "| R$ " + produto.preco;

    const Botao_excluir = document.createElement("button");
    //const Input_Check = document.createElement("input");
    Botao_excluir.innerHTML = "remover";
    const LI_lista = document.createElement("li");
    LI_lista.appendChild(Valor);
    LI_lista.appendChild(Botao_excluir);
  //  LI_lista.appendChild(Input_Check);

    let nomedefora = produto.nome;

    Botao_excluir.onclick = () => {
      if (confirm("Deseja remover o produto?")) {
        removerProdutopornome(nomedefora);
        UL_lista.removeChild(LI_lista);
        alert("Produto removido com sucesso!");
      } else {
        alert("Produto não removido");
      }
    };

    LI_lista.appendChild(Valor);
    UL_lista.appendChild(LI_lista);
  });

 // localStorage.setItem("produtos", JSON.stringify(produtos));
}



// const sacar = (id, valor) => {
//   let Cliente = contas.find((IdConta) => IdConta.id === id);
//   let ValorSaque = valor;
//   let SaldoAtual = Cliente.saldo;

//   if (ValorSaque <= 0) {
//     console.log(
//       "valor de R$: " +
//         ValorSaque +
//         "é inválido e não realizar nenhuma operação"
//     );
//   } else if (ValorSaque > SaldoAtual) {
//     console.log(
//       "mensagem de saldo insuficiente seu saldo é R$:" + SaldoCliente(id)
//     );
//   } else if (ValorSaque > 0 && ValorSaque <= SaldoAtual) {
//     Cliente.saldo -= ValorSaque;
//     console.log("Movimentação na conta de ID nº:" +id);
//     console.log(
//       "o saque de R$: " +
//         ValorSaque +
//         "  ocorreu com sucesso e o saldo atual da conta após o saque de R$: " +
//         SaldoCliente(id) +
//         " !"
//     );
//   } else {
//     return "";
//   }
// };


function removerProdutopornome(nome) {

  
  var produtos = [];
  if (localStorage.getItem("produtos")) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }
  var index = produtos.indexOf(nome);
  console.log("index na função" + index);
  
  let adeletar = produtos.filter((nomeProd) => nomeProd.nome === nome);
  //produtos.pop(adeletar);
  console.log(adeletar)
  console.log([{adeletar}])
  // produtos.forEach((produto) => {
  //   if (produto.nome === nome) {
  //     console.log("nome prduto" + produto.nome);
  //     console.log("nome na funcao deletar" + nome);
      
  //     produtos.pop(produto.nome);
  //   }
  // });

  localStorage.setItem("produtos", JSON.stringify(produtos));
}