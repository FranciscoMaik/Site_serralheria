var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
var firebase = require('firebase')

/*Configuração do Firebase*/
var firebaseConfig = {
  apiKey: "AIzaSyCmZZz3Nx4NAzzyOsDuWb_UwLrsBjnN4h4",
  authDomain: "site-empresa-8ba65.firebaseapp.com",
  databaseURL: "https://site-empresa-8ba65.firebaseio.com",
  projectId: "site-empresa-8ba65",
  storageBucket: "site-empresa-8ba65.appspot.com",
  messagingSenderId: "170153145004",
  appId: "1:170153145004:web:a91586749bcc5414092509",
  measurementId: "G-GSY251S49F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

router.use(bodyParser.urlencoded({ extended: true}))

/* GET home page. */
router.get('/', function(req, res, next) {
  getNoticias().then(noticia =>{
    res.render('index', {noticia});
  });
});

router.get('/galeria', function(req, res, next){
  res.render('galeria');
});

router.get('/faleConosco', function(req, res){
  getFaleConosco().then(reclamacoes =>{
    res.render('faleConosco',{reclamacoes});
  });
});

router.get('/login', function(req, res){
  res.render('login');
});

router.get('/funcionarios', function(req, res){
  res.render('funcionarios');
});

router.get('/diretorias', function(req, res){
  getDiretoria().then(diretorias =>{
    res.render('diretorias',{diretorias});
  });
});

router.get('/cadastrarNewConta' , function(req, res){
  res.render('cadastrarNewConta')
});

router.get('/logOut', function(req, res){
  res.render('logOut')
});

router.get('/cadastrarNoticia', function(req, res, next){
  res.render('cadastrarNoticia')
});

router.get('/cadastrarDiretoria', function(req,res){
  res.render('cadastrarDiretoria')
})

/*Salvando dados no firebase*/
router.post('/cadastrarNoticia', function(req, res,next){
  var getBody = req.body;
  var noticia = {
    titulo : getBody.titulo,
    corpo : getBody.corpoDaNoticia
  };
  firebase.database()
  .ref()
  .child('noticia').push(noticia)
  .then(function(firebaseDatabase){
    res.redirect('cadastrarNoticia');
  })
  .catch(function(error){
    alert("Não foi possivel cadastrar a notícia!")
  });
});

router.post('/cadastrarDiretoria', function(req, res,next){
  var getBody = req.body;
  var diretorias = {
    diretoria : getBody.tituloDiretoria,
    descricao : getBody.explicacaoDiretoria
  };
  firebase.database()
  .ref()
  .child('diretorias').push(diretorias)
  .then(function(firebaseDatabase){
    res.redirect('cadastrarDiretoria');
  })
  .catch(function(error){
    alert("Não foi possivel cadastrar a diretoria!")
  });
});

router.post('/faleConosco', function(req, res,next){
  var getBody = req.body;
  var reclamacoes = {
    nickname : getBody.nickname,
    email : getBody.email,
    comentario : getBody.comentario
  };
  firebase.database()
  .ref()
  .child('reclamacoes').push(reclamacoes)
  .then(function(firebaseDatabase){
    res.redirect('faleConosco');
  })
  .catch(function(error){
    alert("Não foi possivel cadastrar a diretoria!")
  });
});

/*Criação de um novo usuario com email e senha*/
router.post('/cadastrarNewConta', function(req, res, next){
  firebase.auth()
  .createUserWithEmailAndPassword(req.body.useradm, req.body.password)
  .then(function(firebaseUser){
    res.redirect('login');
  })
  .catch(function(erros){
    res.redirect('cadastrarNewConta');
  });
});


/*Funções de execução*/
function getNoticias(){
  const ref =   firebase.database().ref('noticia');
  return ref.once('value').then(snap => snap.val());
}

function getDiretoria(){
  const ref = firebase.database().ref('diretorias');
  return ref.once('value').then(snap => snap.val());
}

function getFaleConosco(){
  const ref = firebase.database().ref('reclamacoes');
  return ref.once('value').then(snap => snap.val());
}

module.exports = router;
