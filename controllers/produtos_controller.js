const mysql = require('../mysql');

exports.getProduto = async (req,res,next) => {
    try {
        const response = {
            produto:"produto 1"
        }
        return res.status(200).send(response);
        
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getIdProduto = async (req, res, next) => {
    
    try {
        console.log("oi");

        const query = "SELECT * FROM produtos WHERE id_produto = ?;";
        const result = await mysql.execute(query,[req.params.id_produto]);
        console.log(result.length);
        if (result.length === 0) {
            return res.status(404).send({
                mensagem: "Não foi encontrado nenhum produto com este ID"
            });
        }
        const response = {
            produto: {
                id_produto: result[0].id_produto,
                nome: result[0].nome,
                preco: result[0].preco,
                imagem_produto: process.env.URL_IMAGE_PROD+result[0].imagem_produto,
                request: {
                    tipo: 'GET',
                    description: 'Retorna um produto',
                    url: process.env.URL_API + 'produtos'
                }
            }
        }

        return res.status(200).send(response);

        
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

// *********************************************************************************************

// INSERE PRODUTO - USANDO ASYNC / AWAIT - FUNCTION SÓ PARA ACESSAR MYSQL
exports.insereProduto = async (req, res, next) => {
    try {
        const query = "INSERT INTO produtos (nome, preco,imagem_produto) VALUES (?,?,?);";
        const result = await mysql.execute(query, [
            req.body.nome,
            req.body.preco,
            req.file.path
        ]);
        console.log(result);

        const response = {
            mensagem: 'Produto inserido com sucesso!',
            produtoCriado: {
                id_produto: result.insertId,
                nome: req.body.nome,
                preco: req.body.preco,
                imagem_produto: process.env.URL_IMAGE_PROD+req.file.path,
                request: {
                    tipo: 'POST',
                    description: 'Insere um produto',
                    url: process.env.URL_API + 'produtos'
                }
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({error:error});
    }
}

