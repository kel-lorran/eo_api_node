const porta = 3003
const express = require('express')
const bodyParser = require( 'body-parser')
const app = express()
const DataBaseCSV = require(__dirname+'/../db/DataBaseCSV')


const strPathDataBase = __dirname+'/../db/products.csv'
var dataBase = new DataBaseCSV( strPathDataBase)


app.use( bodyParser.urlencoded({ extended: true}))

app.get('/produtos', (req, res, next) => {
    res.send( dataBase.getProdutos())
})
app.get('/produto/:id',( req, res, next) => {
    let idDoProduto = req.params.id
    res.send( dataBase.getProduto( idDoProduto))
})
app.post('/produto', (req, res, next) => {
    let produtoASerRetornado = dataBase.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send( produtoASerRetornado)
})
app.put('/produto/:id', (req, res, next) => {
    let produtoASerRetornado = dataBase.atualizarProduto({
        id: req.body.id,
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send( produtoASerRetornado)
})

app.listen( porta, () => { console.log( `servidor executando na porta ${porta}`)})