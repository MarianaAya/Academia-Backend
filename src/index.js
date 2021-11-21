const express=require('express');

//importar as rotas
const routes=require('./routes');

const cors=require('cors');
const app=express();

/*
app.get('/',(request,response)=>{
    const parametro=request.query;
    console.log(parametro);
    return response.json({
        disciplina:"LP2"
    });
});
*/
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3344);