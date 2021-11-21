


const axios = require('axios');
//const mysql = require('mysql2/promise');
const db = require('../models/Database');
module.exports={
    async procurarUsuario(request,response){
        
        const email=request.params.email;
        const senha=request.params.senha;
        const con = await db.conecta();
        const sql = "SELECT * FROM usuarios WHERE usu_email LIKE ? AND usu_senha LIKE ? "+
                    "ORDER BY usu_nome";
        const valores = [email , senha ];
        const users = await db.consulta(sql,valores);

        return response.json(users.data);
    },
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM usuarios";
        const users = await db.consulta(sql);
        return response.json(users.data);
    },
    async procurarCPF(request,response){
        const {cpf} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM usuarios WHERE usu_cpf=?";
        
        const valor = [cpf];
        const result = await db.consulta(sql,valor);
        console.log(result);
        return response.json(result.data);
    },
    async procurarEmail(request,response){
        const {email} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM usuarios WHERE usu_email=?";
        
        const valor = [email];
        const result = await db.consulta(sql,valor);
        return response.json(result.data);
    },
    async procurarCod(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "SELECT * FROM usuarios WHERE usu_codigo=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        console.log(result);
        return response.json(result.data);
    },
    async excluir(request,response){//definimos route para excluir pelo cpf
        const {cpf} = request.params;
        const con = await db.conecta();
        const sql = "DELETE FROM usuarios WHERE usu_cpf=?";
        
        const valor = [cpf];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async alterar(request,response){
        const {usu_cpf,usu_nome, usu_email,usu_dtNasc, usu_fone, usu_sexo, usu_peso,usu_altura, usu_senha,uni_codigo} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE usuarios SET usu_nome = ?, usu_email = ?, "+
                    "usu_dtNasc = ?, usu_fone = ?, usu_sexo = ?, "+
                    "usu_peso = ?, usu_altura = ?, usu_senha = ? , uni_codigo = ? "+
                    "WHERE usu_cpf = ?";
        
                    const valor = [usu_nome, usu_email,usu_dtNasc, usu_fone, usu_sexo, usu_peso,usu_altura, usu_senha,uni_codigo,usu_cpf];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async alterarSenha(request,response){
        const {usu_cpf,usu_senha} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE usuarios SET usu_senha = ? "+
                    "WHERE usu_cpf = ?";
        
        const valor = [usu_senha,usu_cpf];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async gravar(request,response) {
 
        const {usu_cpf,usu_nome, usu_email,usu_dtNasc, usu_fone, usu_sexo, usu_peso,usu_altura, usu_senha,uni_codigo} = request.body;
       
        //verificar se o professor ja esta cadastrado
        const con = await db.conecta();
        const sql = "INSERT INTO usuarios (usu_cpf,usu_nome, usu_email,usu_dtNasc, usu_fone, usu_sexo, usu_peso, "+
                    "usu_altura, usu_senha, usu_nivel, uni_codigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";
        
        const valor = [usu_cpf,usu_nome, usu_email,usu_dtNasc, usu_fone, usu_sexo, usu_peso,usu_altura, usu_senha,"C",uni_codigo];
        const result = await db.manipula(sql,valor);
        if(!result.status)
            console.log("Ja cadastrado");
        
        return response.json(result);
    }//fim fo gravar
   
        
    
}
