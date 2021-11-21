const axios=require('axios');
//const mysql=require('mysql2/promise');
const db=require('../models/Database');

module.exports={
    async listar(request,response){
		const con=await db.conecta();
		const sql="SELECT * FROM agenda ORDER by age_dataHora";
		const agen= await db.consulta(sql);
		
		return response.json(agen.data);
    },
    async procurarAgendaCod(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM agenda WHERE age_codigo=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        console.log(result);
        return response.json(result.data);
    },
    async alterarReservas(request,response){
 
        const {cod,qtde} = request.body;
    
          
        const con = await db.conecta();
        const sql = "UPDATE agenda SET age_capacidade= ? where age_codigo = ?";
    
        const valor = [qtde,cod];
        const result = await db.manipula(sql,valor);

        return response.json(result.data);
    }
}

