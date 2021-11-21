const mysql=require('mysql2/promise');

module.exports = new
  class Database{
    constructor(){
        this.err="";
    }
    async conecta(){
        const config = {
            host: "den1.mysql1.gear.host",
            user: "projacademialp",
            password: "academia*123",
            database:"projacademialp"
        }
        try{
            this.connection = await new mysql.createConnection(config);
            return true;
        }
        catch(ex){
            return false;
        }
    }
    async consulta(sql,values){
        try{
            const [rows,fields]= await this.connection.execute(sql,values);
            return {
                status: true,
                data: rows
            }
        }
        catch(ex){
            return {
                status:false,
                err: ex.code,
                message: ex.message,
                data: []
            }
        }
    }
    async manipula(sql,values){
        try{
            const [rows,fields]= await this.connection.execute(sql,values);
            if(rows.affectedRows > 0)//quantidade de linhas afetadas
            return {
                status: true,
                lastId:rows.insertId,
                //    ou
                //data: rows
            }
            else
            return {
                status:false,
                err:"NOT_ROWS"
            }
        }
        catch(ex){
            return {
                status: false,
                err: ex.code,
                message:ex.message
            }
        }
    }
  }