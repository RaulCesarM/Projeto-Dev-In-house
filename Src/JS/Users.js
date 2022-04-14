const Nome = document.querySelector("input#validationCustom01");
const Sobrenome = document.querySelector("input#validationCustom02");
const Apelido = document.querySelector("input#validationCustom03");
const Cidade = document.querySelector("input#validationCustom04");
const Estado = document.querySelector("input#validationCustom05");
const CEP = document.querySelector("input#validationCustom06");
const Mostrar_NomeUsuario = document.querySelector("small1");

const Botao_Adicionar_Usuario = document.querySelector(
  "#Botao_Adicionar_Usuario"
);



Botao_Adicionar_Usuario.onclick = (evento) => {
  evento.preventDefault();

  salvarUsuario();

  Nome.value = "";
  Sobrenome.value = "";
  Apelido.value = "";
  Cidade.value = "";
  Estado.value = "";
  CEP.value = "";

  
};

function salvarUsuario() {
  if(Nome.value =="" || Sobrenome.value =="" || Apelido.value =="" || Cidade.value =="" || Estado.value =="" || CEP.value ==""){

  alert("Preencha todos os campos!");
}else{
  var Usuario = {
    Nome: Nome.value,
    Sobrenome: Sobrenome.value,
    Apelido: Apelido.value,
    Cidade: Cidade.value,
    Estado: Estado.value,
    CEP: CEP.value,
  };
  var Usuarios = [];
  if (localStorage.getItem("Usuarios")) {
    Usuarios = JSON.parse(localStorage.getItem("Usuarios"));
  }
  Usuarios = Usuario;
  localStorage.setItem("Usuarios", JSON.stringify(Usuarios));

  alert("Usuário adicionado com sucesso!");

  carregarUsuario();
}
}

function carregarUsuario() {
  var Usuarios = [];
  const smalll = document.createElement("small");
  const valor = document.createElement("span");



  if (localStorage.getItem("Usuarios")) {
    Usuarios = JSON.parse(localStorage.getItem("Usuarios"));
  }
  
  
  if(Usuarios.length == 0){
    valor.innerHTML = "Usuario ";

   
    smalll.appendChild(valor);

    Mostrar_NomeUsuario.appendChild(smalll);
  }else{
    valor.innerHTML = Usuarios.Nome;
    smalll.appendChild(valor);
    Mostrar_NomeUsuario.appendChild(smalll);
  }

  
 
}
