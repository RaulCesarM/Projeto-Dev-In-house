


//cabeçalho de constates e variveis

const Produto = document.querySelector("input#Listar1");
const Tamanho = document.querySelector("input#Listar2");
const Preco = document.querySelector("input#Listar3");
const Botao_Adicionar = document.querySelector("form button#BTN_adicionar");
const Botao_Listar = document.querySelector("form button#BTN_listar");
const UL_lista = document.querySelector("ul1");



// cabeçalho botões

//botaõ de adição

Botao_Adicionar.onclick = (evento) => {
  evento.preventDefault();

  if (Produto.value) {
    salvarProduto();
   

    Produto.value = "";
    Tamanho.value = "";
    Preco.value = "";
  }
};

//botão listar

Botao_Listar.onclick = (evento) => {
  evento.preventDefault();
  carregarProdutos();
};


// cabeçalho de funções
// função de adição

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

// função de carregar produtos

function carregarProdutos() {
  var produtos = [];

  if (localStorage.getItem("produtos")) {//verificase tem 
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }
  UL_lista.innerHTML = "";
  
  produtos.forEach((produto) => {
    const Valor = document.createElement("span");
    const Botao_excluir = document.createElement(`button`);
    const checkbox = document.createElement("input");
    const LI_lista = document.createElement("li"); 
     

    Valor.innerHTML ="  "+ produto.nome + "  | R$ " + produto.preco;
    Botao_excluir.innerHTML = ` <button  class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg></button>`;
    checkbox.type = "checkbox";


    LI_lista.appendChild(Valor);
    LI_lista.appendChild(Botao_excluir);
    LI_lista.appendChild(checkbox);



    let nomedefora = produto.nome;

    
    checkbox.onclick = () => {
      if (checkbox.checked) {        
        (LI_lista).style.textDecoration = "line-through";         
      } else {       
        (LI_lista).style.textDecoration = "none";
      }
    };

    LI_lista.appendChild(Valor);
    UL_lista.appendChild(LI_lista);



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



// função de remover produto

function removerProdutopornome(nome) {
  var produtos = [];
  if (localStorage.getItem("produtos")) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }

  let prodtosfiltrados = produtos.filter((nomeProd) => nomeProd.nome !== nome);

  localStorage.setItem("produtos", JSON.stringify(prodtosfiltrados));
  somarPrecos()
}


// função de somar preços

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


// função de exibir soma

function exibirsoma() {
  var soma = somarPrecos(); 
  const mostrar = document.createElement("p");
  
  document.getElementById("totalapagar").appendChild(mostrar);
  document.getElementById("totalapagar").replaceChild(mostrar, document.getElementById("totalapagar").childNodes[0]);
  mostrar.innerHTML = `<p>total a pagar ${soma} </p>`;

  
}

