const Produto = document.querySelector("input#Listar1");
const Tamanho = document.querySelector("input#Listar2");
const Preco = document.querySelector("input#Listar3");
const Botao_Adicionar = document.querySelector("#BTN_adicionar");
const Botao_Listar = document.querySelector("#BTN_listar");
const UL_lista = document.querySelector("ul1");

/////////////////////////////////////////////////////////////////////////////////

Botao_Adicionar.onclick = (evento) => {
  evento.preventDefault();

  if (Produto.value) {
    Preencher_Campos_Produto();
    Limpar_Campos_Produto();
    Carregar_Na_tela();
  }
};

function Limpar_Campos_Produto() {
  Produto.value = "";
  Tamanho.value = "";
  Preco.value = "";
}

function Preencher_Campos_Produto() {
  var produto = {
    Check: false,
    Id: Math.random() * 10000,
    nome: Produto.value,
    tamanho: Tamanho.value,
    preco: Preco.value,
  };

  Adicionar_Produto_no_LS(produto);
}

function Adicionar_Produto_no_LS(produto) {
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

/////////////////////////////////////////////////////////////////////////////////

function Carregar_Na_tela() {
  var produtos = [];
  

  if (localStorage.getItem("produtos")) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }
  UL_lista.innerHTML = "";

  produtos.forEach((produto) => {
    
    const Botao_excluir = document.createElement(`button`);
    const Valor = document.createElement("span");
    const checkbox = document.createElement("input");
    const LI_lista = document.createElement("li");

   

   

     //Valor.innerHTML = "  " + produto.nome + "  | R$ " + produto.preco;

    Botao_excluir.innerHTML = ` <button  class="btn btn-danger">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg></button>`;
    
    checkbox.type = "checkbox";
    Valor.innerHTML = ` <input id="dinheiro"  value="R$ ${produto.preco}" disabled> ${produto.nome} `;
    // LI_lista.appendChild(Botao_excluir);
     LI_lista.appendChild(checkbox);
    LI_lista.appendChild( Botao_excluir,Valor);
    
   
   

    
    

    let nomedefora = produto.nome;
    let id_produto = produto.ID;

    checkbox.checked = produto.Check;

    if (checkbox.checked) {
      LI_lista.style.textDecoration = "line-through";
      
      check_isso(id_produto, true);
    } else {
      LI_lista.style.textDecoration = "none";
      check_isso(id_produto, false);
    }

    checkbox.onclick = () => {
      if (checkbox.checked) {
        LI_lista.style.textDecoration = "line-through";
        check_isso(id_produto, true);
      } else {
        LI_lista.style.textDecoration = "none";
        check_isso(id_produto, false);
      }
    };

    LI_lista.appendChild(Valor);
    UL_lista.appendChild(LI_lista);

    Botao_excluir.onclick = () => {
      if (confirm("Deseja remover o produto?")) {
        Remover_Produto_Por_id(produto.ID);
        UL_lista.removeChild(LI_lista);
        Exibir_Soma_dos_produtos();
        alert("Produto " + nomedefora + " removido com sucesso!");
      } else {
        alert("Produto não removido");
      }
    };

    LI_lista.appendChild(Valor);
    UL_lista.appendChild(LI_lista);
  });

  Exibir_Soma_dos_produtos();
}
/////////////////////////////////////////////////////////////////////////////////
function Remover_Produto_Por_id(id_produto) {
  var produtos = [];
  if (localStorage.getItem("produtos")) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }

  let produtosfiltrados = produtos.filter((produto) => {
    return produto.ID != id_produto;
  });

  localStorage.setItem("produtos", JSON.stringify(produtosfiltrados));
  Somar_Preco_dos_Produtos();
}

function check_isso(id_produto, check) {
  var produtos = [];
  if (localStorage.getItem("produtos")) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }

  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].ID === id_produto) {
      produtos[i].Check = check;
    }
  }

  localStorage.setItem("produtos", JSON.stringify(produtos));
  
  Somar_Preco_dos_Produtos();
  
}

function Somar_Preco_dos_Produtos() {
  var soma = 0;
  var produtos = [];
  if (localStorage.getItem("produtos")) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }
  produtos.forEach((produto) => {
    soma += parseFloat(produto.preco);
  });
  return soma.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

function Exibir_Soma_dos_produtos() {
  var soma = Somar_Preco_dos_Produtos();
  const mostrar = document.createElement("p");

  document.getElementById("totalapagar").appendChild(mostrar);
  document
    .getElementById("totalapagar")
    .replaceChild(
      mostrar,
      document.getElementById("totalapagar").childNodes[0]
    );
  mostrar.innerHTML = `<br><p>Total a pagar ${soma} </p>
   <p><small>Voçe pode checkar os produtos comprados na vitrine !!! </small></p>
   `;

   
}
