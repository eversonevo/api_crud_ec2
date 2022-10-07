const express = require('express');
const app = express();
const rotaProdutos = require('./routes/produtos');

app.use('/produtos',rotaProdutos);

app.use((req,res,next)=>{
    const erro = new Error('NÃO ENCONTRADO!');
    erro.status = 404;
    next(erro);
});

// achou erro vai para próxima função
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem:'eee'+error.message
        }
    });
});

module.exports = app;


