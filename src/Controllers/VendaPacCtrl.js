const axios = require('axios');

const db = require('../models/Database');
module.exports={
    
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM vendapacotes";
        const users = await db.consulta(sql);
        return response.json(users.data);
    },
    async listarUserCodigo(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM vendapacotes where usu_codigo=?";
        const valor = [cod];
        const vendas = await db.consulta(sql,valor);
        return response.json(vendas.data);
    },
    async listarVendaCodigo(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM vendapacotes where ven_codigo=?";
        const valor = [cod];
        const vendas = await db.consulta(sql,valor);
        return response.json(vendas.data);
    },
    async listarVendaValidos(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM vendapacotes where usu_codigo=? AND ven_status='P'";
        const valor = [cod];
        const vendas = await db.consulta(sql,valor);
        return response.json(vendas.data);
    },
    async listarVendaPeriodo(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM vendapacotes WHERE datediff(ven_dtVenda,CURRENT_DATE())<30 AND usu_codigo=?";
        const valor = [cod];
        const vendas = await db.consulta(sql,valor);
        return response.json(vendas.data);
    },
    async excluir(request,response){//definimos route para excluir pelo cpf
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "DELETE FROM vendapacotes WHERE ven_codigo=?";
        
        const valor = [cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async alterar(request,response) {
 
        const {ven_qtde,ven_totalCreditos,ven_saldo,ven_valorTotal,ven_qtdeParcelas,ven_formaPgto,ven_codigo} = request.body;

      
        const con = await db.conecta();
        /*
        const sql = "UPDATE vendapacotes SET ven_dtVenda = ?,ven_qtde =?,ven_totalCreditos =?,ven_saldo=?,ven_valorTotal=?,ven_status=?,ven_dtExpira=?,"+
                    "ven_qtdeParcelas=?,ven_formaPgto=?,usu_codigo=?,pac_codigo=? where ven_codigo = ?";
        
        */
       const sql = "UPDATE vendapacotes SET ven_qtde =?,ven_totalCreditos =?,ven_saldo=?,ven_valorTotal=?,ven_status=?,"+
                    "ven_qtdeParcelas=?,ven_formaPgto=? where ven_codigo = ?";
   
        const valor = [ven_qtde,ven_totalCreditos,ven_saldo,ven_valorTotal,'A',ven_qtdeParcelas,ven_formaPgto,ven_codigo];
        //const valor = [new Date(),ven_qtde,ven_totalCreditos,ven_saldo,ven_valorTotal,'A',date,ven_qtdeParcelas,ven_formaPgto,usu_codigo,pac_codigo];
        const result = await db.manipula(sql,valor);

        
        return response.json(result);
    },
    async alterarCreditos(request,response) {
 
        const {ven_codigo,ven_totalCreditos} = request.body;

      
        const con = await db.conecta();
        const sql = "UPDATE vendapacotes SET ven_totalCreditos =? where ven_codigo = ?";
   
        const valor = [ven_totalCreditos,ven_codigo];
        const result = await db.manipula(sql,valor);
 
        return response.json(result);
    },
    async gravar(request,response) {
 
        const {ven_qtde,ven_totalCreditos,ven_saldo,ven_valorTotal,ven_qtdeParcelas,ven_formaPgto,dias,usu_codigo,pac_codigo} = request.body;

     
        const con = await db.conecta();
        const sql = "insert into vendapacotes (ven_dtVenda,ven_qtde,ven_totalCreditos,ven_saldo,ven_valorTotal,ven_status,ven_dtExpira,"+
                    "ven_qtdeParcelas,ven_formaPgto,usu_codigo,pac_codigo) "+
                       " values(?,?,?,?,?,?,?,?,?,?,?)";
        var date = new Date(); 
        date.setDate(date.getDate() + dias); 
        const valor = [new Date(),ven_qtde,ven_totalCreditos,ven_saldo,ven_valorTotal,'R',date,ven_qtdeParcelas,ven_formaPgto,usu_codigo,pac_codigo];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    }//fim fo gravar
   
        
    
}