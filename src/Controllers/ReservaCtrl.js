const axios=require('axios');
//const mysql=require('mysql2/promise');
const db=require('../models/Database');

module.exports={
    async reservar(request,response){
        const con=await db.conecta();
        const {Vcod,Acod,obs} = request.body;
        console.log(" "+Vcod+ " "+Acod);
        const sql="INSERT INTO reservas (res_dtReserva,res_obs,ven_codigo,age_codigo)"+
                " VALUES (?,?,?,?)";
        
        const valor=[new Date(),obs,Vcod,Acod];
        const conts= await db.manipula(sql,valor);
        console.log("entreu");
        return response.json(conts.data);
    },
    async cancelarReserva(request,response)
    {
        const con = await db.conecta();
        const Vcod=request.params.Vcod;
        const Acod=request.params.Acod;

        const sql = "DELETE FROM reservas WHERE ven_codigo=? and age_codigo=?";
        const valor = [Vcod,Acod];
        const result = await db.manipula(sql,valor);
        return response.json(result.data);
    },
    async reservasVend(request,response)
    {
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM reservas WHERE ven_codigo = ? order by res_dtReserva";
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        return response.json(result.data);
    },
    async procurarReserva(request,response)
    {
        const con=await db.conecta();
        const Vcod=request.params.Vcod;
        const Acod=request.params.Acod;
        const sql = "SELECT * FROM reservas WHERE ven_codigo = ? and age_codigo = ?";
        const valor=[Vcod,Acod];
        console.log("Vcod: "+Vcod+" Acod: "+Acod);
        const result = await db.consulta(sql,valor);
        return response.json(result.data);
    }
}