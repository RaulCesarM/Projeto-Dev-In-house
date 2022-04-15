const Botao_Adicionar_prod1 = document.querySelector("#BTN_adicionar1");
const Botao_Adicionar_prod2 = document.querySelector("#BTN_adicionar2");
const Botao_Adicionar_prod3 = document.querySelector("#BTN_adicionar3");
const Botao_Adicionar_prod4 = document.querySelector("#BTN_adicionar4");

var form1 = document.querySelector("#sizes1");
var form2 = document.querySelector("#sizes2");
var form3 = document.querySelector("#sizes3");
var form4 = document.querySelector("#sizes4");

Botao_Adicionar_prod1.addEventListener("click", function (evento) {
  evento.preventDefault();

  const ID = Math.random() * 10000;
  const Tamanho = form1.fb1.value;
  const Produto = "Calça Veneza ";
  const Preco = "89,90";

  var produto = {
    Check: false,
    ID: ID,
    nome: Produto,
    tamanho: Tamanho,
    preco: Preco,
  };

  adicionarProduto(produto);
});

Botao_Adicionar_prod2.addEventListener("click", function (evento) {
  evento.preventDefault();

  const ID = Math.random() * 10000;
  const Tamanho = form2.fb2.value;
  const Produto = "Camisa  Slim";
  const Preco = "80,99";

  var produto = {
    Check: false,
    ID: ID,
    nome: Produto,
    tamanho: Tamanho,
    preco: Preco,
  };

  adicionarProduto(produto);
});

Botao_Adicionar_prod3.addEventListener("click", function (evento) {
  evento.preventDefault();

  const ID = Math.random() * 10000;
  const Tamanho = form3.fb3.value;
  const Produto = "Camisa  Confidence";
  const Preco = "145,70";

  var produto = {
    Check: false,
    ID: ID,
    nome: Produto,
    tamanho: Tamanho,
    preco: Preco,
  };

  adicionarProduto(produto);
});

Botao_Adicionar_prod4.addEventListener("click", function (evento) {
  evento.preventDefault();

  const ID = Math.random() * 10000;
  const Tamanho = form4.fb4.value;
  const Produto = "Terno  Business";
  const Preco = "970,90";

  var produto = {
    Check: false,
    ID: ID,
    nome: Produto,
    tamanho: Tamanho,
    preco: Preco,
  };

  adicionarProduto(produto);
});

/////////////////////////////////////////////////////////////////

function adicionarProduto(produto) {
  var Usuarios = [];
  var produtos = [];

  if (localStorage.getItem("Usuarios")) {
    Usuarios = JSON.parse(localStorage.getItem("Usuarios"));
    if (localStorage.getItem("produtos")) {
      produtos = JSON.parse(localStorage.getItem("produtos"));
    }
    produtos.push(produto);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    alert("Produto adicionado com sucesso!");
  } else {
    alert("Faça o cadastro para adicionar um produto!");
  }
}
