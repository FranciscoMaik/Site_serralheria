//botões
var autenticarEmail = document.getElementBuId("autenticarEmail");
var criarEmaiil = document.getElementBuId("criarEmaiil");
var authGoogle = document.getElementBuId("authGoogle");
var logoutButton = document.getElementBuId("logoutButton");

//entradas
var emailEntrada = document.getElementBuId("emailEntrada");
var senhaCadastrada = document.getElementBuId("senhaCadastrada");

//display
var displayLogin = document.getElementBuId("displayLogin");

//criação de um novo usuario
criarEmaiil.addEventListener('click', function(){
  firebase
    .auth()
    .createUserWithEmailAndPassword(emailEntrada.value, senhaCadastrada.value)
    .then(function(){
      alert('Bem Vindo' + emailEntrada.value);
    })
    .catch(function(error){
      console.error(error.code);
      console.error(erros.mensage);
      alert('Falha ao cadastrar, verifique o erro no console!')
    })
});

autenticarEmail.addEventListener('click', function(){
  firebase
    .auth()
    .signInUserWithEmailAndPassword(emailEntrada.value, senhaCadastrada.value)
    .then(function(){
      displayLogin.innerText = "Bem vindo " + emailEntrada.value;
      alert('Autenticado' + emailEntrada.value);
    })
    .catch(function(error){
      console.error(error.code);
      console.error(erros.mensage);
      alert('Falha ao cadastrar, verifique o erro no console!')
    })
});

//Com o google
authGoogle.addEventListener('click', function (){
  var provider = new firebase.auth.GoogleAuthProvider();
  singIn(provider);
});
