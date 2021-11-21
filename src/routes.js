const {Router}=require('express');
const routes=Router();
//ou
/*
const express=require('express');
const rota=express.Router();*/

const pacController=require('./Controllers/PacControllers');
const UserCtrl = require("./Controllers/UserCtrl");
const UnidadeCtrl = require("./Controllers/UnidadeCtrl");
const ContatoCtrl = require("./Controllers/ContatoController");
const VendaPacCtrl = require("./Controllers/VendaPacCtrl");
const AgendaCtrl=require('./Controllers/AgendaCtrl');
const ReservaCtrl=require('./Controllers/ReservaCtrl');
/* USUÁRIOS */
routes.post('/users', UserCtrl.gravar);
routes.get('/users',UserCtrl.listar);
routes.delete('/users/:cpf',UserCtrl.excluir);
routes.get('/users/:cpf',UserCtrl.procurarCPF);
routes.get('/usersEmail/:email',UserCtrl.procurarEmail);
routes.put('/userAlt',UserCtrl.alterar);
routes.put('/userSenha',UserCtrl.alterarSenha);
routes.get('/users/:email/:senha',UserCtrl.procurarUsuario);
routes.get('/usersprocuraCod/:cod',UserCtrl.procurarCod);

/* UNIDADES*/ 
routes.get('/unidades',UnidadeCtrl.listar);

/* DESCRIÇÃO*/
//procurar pela descrição
routes.get('/pacs/:descricao',pacController.listarPorNome);
//listar todos os pacotes
routes.get('/pacs',pacController.listar);
routes.get('/pacscod/:cod',pacController.procurarCodigo);

/* CONTATOS DO USUÁRIO */
routes.get('/contatos/:cod',ContatoCtrl.listarPorId);
routes.post('/contatos',ContatoCtrl.gravar);
routes.delete('/contatos/:cod',ContatoCtrl.excluir);

routes.post('/venda',VendaPacCtrl.gravar);
routes.put('/venda',VendaPacCtrl.alterar);
routes.put('/vendaCredito',VendaPacCtrl.alterarCreditos);
routes.get('/venda',VendaPacCtrl.listar);
routes.delete('/venda/:cod',VendaPacCtrl.excluir);
routes.get('/vendausercodigo/:cod',VendaPacCtrl.listarUserCodigo);
routes.get('/vendacodigo/:cod',VendaPacCtrl.listarVendaCodigo);
routes.get('/vendavalido/:cod',VendaPacCtrl.listarVendaValidos);
routes.get('/vendaperiodo/:cod',VendaPacCtrl.listarVendaPeriodo);

routes.get('/agenda/:cod',AgendaCtrl.procurarAgendaCod);
routes.get('/agenda',AgendaCtrl.listar);
routes.put('/agenda',AgendaCtrl.alterarReservas);

routes.post('/reserva',ReservaCtrl.reservar);
routes.delete('/reserva/:Vcod/:Acod',ReservaCtrl.cancelarReserva);
routes.get('/reservavend/:cod',ReservaCtrl.reservasVend);
routes.get('/reserva/:Vcod/:Acod',ReservaCtrl.procurarReserva);

module.exports=routes;
