const axios = require('axios');
//const mysql = require('mysql2/promise');
const db = require('../models/Database');
module.exports={
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM unidades";
        const unis = await db.consulta(sql);
        return response.json(unis.data);
    }

   
        
    
}
