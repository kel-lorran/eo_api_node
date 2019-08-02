const porta = 3003
const express = require('express')
const bodyParser = require( 'body-parser')
const app = express()
const DataBaseCSV = require(__dirname+'/../db/DataBaseCSV')


const strPathDataBase = __dirname+'/../db/products.csv'
var dataBase = new DataBaseCSV( strPathDataBase)


app.use( bodyParser.json())
app.use( bodyParser.urlencoded({ extended: true}))

app.get('/produtos', (req, res, next) => {
    res.send( dataBase.getProdutos())
})
app.get('/produto/:id',( req, res, next) => {
    let idDoProduto = req.params.id
    let result = dataBase.getProduto( idDoProduto)
    if( result){
        res.status(200).send( result)
    } else {
        res.status(404).send({ message: 'Produto não econtrado'})
    }
})
app.post('/produto', (req, res, next) => {
    let produtoASerRetornado = dataBase.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    })
    if( produtoASerRetornado){
        res.status(200).send( produtoASerRetornado)
    } else {
        res.status(404).send({ message: 'Parametros inconsistentes'})
    }
})
app.put('/produto/:id', (req, res, next) => {
    let produtoASerRetornado = dataBase.atualizarProduto({
        ID: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    })
    if( produtoASerRetornado){
        res.status(200).send( produtoASerRetornado)
    } else {
        res.status(404).send({ message: 'Produto não econtrado'})
    }
})
app.delete('/produto/:id', (req,  res, net) => {
    let produtoExcluido = dataBase.deletarProduto( req.params.id)
    if( produtoExcluido){
        res.status(200).send( produtoExcluido)
    } else {
        res.status(404).send({ message: 'Produto não econtrado'})
    }
})

app.listen( porta, () => { console.log( `servidor executando na porta ${porta}`)})