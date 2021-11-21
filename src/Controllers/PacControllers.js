//importar a entidade profs

const axios=require('axios');
//const mysql=require('mysql2/promise');
const db=require('../models/Database');

module.exports={
    async listarPorNome(request,response){
		const {descricao} = request.params;
		const con= await db.conecta();
		const sql="SELECT * FROM pacotes WHERE pac_descricao like ?"+
                    " ORDER BY pac_descricao";
		const valor=["%"+descricao+"%"];
		const pacs= await db.consulta (sql,valor);
		
		return response.json(pacs.data);
	},
	async procurarCodigo(request,response){
		const {cod} = request.params;
		const con= await db.conecta();
		const sql="SELECT * FROM pacotes WHERE pac_codigo like ?";
		const valor=[cod];
		const pacs= await db.consulta (sql,valor);
		
		return response.json(pacs.data);
	},
    async listar(request,response){
		const con=await db.conecta();
		const sql="SELECT * FROM pacotes";
		const pacs= await db.consulta(sql);
		
		return response.json(pacs.data);
    }
    
}
