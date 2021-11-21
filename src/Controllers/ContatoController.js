const axios=require('axios');
//const mysql=require('mysql2/promise');
const db=require('../models/Database');

module.exports={
    async listarPorId(request,response){
        const codigo = request.params.cod;
        console.log("cod:"+codigo);
		const con= await db.conecta();
        const sql="select * from contatos WHERE usu_codigo=? ORDER BY 2 ASC";
        
		const valor=[codigo];
		const conts= await db.consulta (sql,valor);
		return response.json(conts.data);
	},
    async gravar(request,response){
        const con=await db.conecta();
        const {usu_codigo,con_codigo,con_nome,con_celular,con_relacao} = request.body;
       
        const sql="INSERT INTO contatos (usu_codigo,con_codigo,con_nome,con_celular,con_relacao)"+
                " VALUES (?,?,?,?,?)";
        const valor=[usu_codigo,con_codigo,con_nome,con_celular,con_relacao];
		const conts= await db.manipula(sql,valor);
		console.log(conts);
		return response.json(conts);
    },
    async excluir(request,response){//definimos route para excluir pelo cpf
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "DELETE FROM contatos WHERE con_codigo=?";
        
        const valor = [cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    }
}