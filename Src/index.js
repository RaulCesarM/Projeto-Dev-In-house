const Produto = document.querySelector("input#Listar1");
const Tamanho = document.querySelector("input#Listar2");
const Preco = document.querySelector("input#Listar3");
const Botao_Adicionar = document.querySelector("form button#BTN_adicionar");
const Botao_Listar = document.querySelector("form button#BTN_listar");
const UL_lista = document.querySelector("ul1");



Botao_Adicionar.onclick = (evento) => {
  evento.preventDefault();

  if (Produto.value) {
    salvarProduto();
   

    Produto.value = "";
    Tamanho.value = "";
    Preco.value = "";
  }
};

Botao_Listar.onclick = (evento) => {
  evento.preventDefault();
  carregarProdutos();
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

  if (localStorage.getItem("produtos")) {//verificase tem 
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }
  UL_lista.innerHTML = "";
  
  produtos.forEach((produto) => {
    const Valor = document.createElement("span");
    const Botao_excluir = document.createElement("button");
    const checkbox = document.createElement("input");
    const LI_lista = document.createElement("li"); 

    Valor.innerHTML = produto.nome + "| R$ " + produto.preco;
    Botao_excluir.innerHTML = "remover";
    checkbox.type = "checkbox";

    LI_lista.appendChild(Valor);
    LI_lista.appendChild(Botao_excluir);
    LI_lista.appendChild(checkbox);



    let nomedefora = produto.nome;

    Botao_excluir.onclick = () => {
      if (confirm("Deseja remover o produto?")) {
        removerProdutopornome(nomedefora);
        UL_lista.removeChild(LI_lista); 
        exibirsoma()      
        alert("Produto removido com sucesso!");
      } else {
        alert("Produto não removido");
       
      }
    };

    LI_lista.appendChild(Valor);
    UL_lista.appendChild(LI_lista);
    
  });
  
  exibirsoma()
}

function removerProdutopornome(nome) {
  var produtos = [];
  if (localStorage.getItem("produtos")) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }

  let prodtosfiltrados = produtos.filter((nomeProd) => nomeProd.nome !== nome);

  localStorage.setItem("produtos", JSON.stringify(prodtosfiltrados));
  somarPrecos()
}

function somarPrecos() {
  var soma =0;
  var produtos = [];
  if (localStorage.getItem("produtos")) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }
  produtos.forEach((produto) => {
    soma += parseFloat(produto.preco);
  });
  return soma;
}

///removeChild()

function exibirsoma() {
  var soma = somarPrecos(); 
  const mostrar = document.createElement("p");
  mostrar.innerHTML = `<p>total a pagar ${soma} </p>`;
  document.getElementById("totalapagar").replaceChild(mostrar, document.getElementById("totalapagar").childNodes[0]);
  //document.getElementById("totalapagar").appendChild(mostrar);
  
}

