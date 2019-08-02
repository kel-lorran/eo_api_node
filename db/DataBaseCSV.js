//modulos de manipulação de arquivos e CSV
var jsonexport = require('jsonexport')
const csv = require('csv-parser')
const fs = require('fs')

class DataBaseCSV{
    constructor( caminhoArquivoCSV_,){
        this.data = []
        this.inicialiazacaoTerminada = false
        this.caminhoArquivoCSV = caminhoArquivoCSV_
        this.idCorrente = 0
        this.inicializaData()
    }

    inicializaData(){
        fs.createReadStream(this.caminhoArquivoCSV)
        .pipe( csv())
        .on('data', (row) => {
            this.data.push( row)
        })
        .on( 'end', () => {
            this.idCorrente = +this.data.map( e => e.ID).reduce( (a, e) => a > e ? a : e,0)
            this.inicialiazacaoTerminada = true
        })
    }
    getProdutos(){
        return this.data
    }
    getProduto(id){
        let trueId = id - 1
        if( trueId < this.data.length){
            return this.data[ trueId]
        }
        return null
    }
    salvarProduto( produto){
        produto.ID = (this.idCorrente += 1)
        if(Object.values( produto).filter( e => !e).length) return null
        this.data.push( produto)
        this.persisitir()
        return produto
    }
    atualizarProduto( produto){
        if(! produto.ID) return null            //se não tem id não pode ser uma atualização
        let produtoASerAtualizado = this.data[ produto.ID - 1]
        if(! produtoASerAtualizado) return null      //se está indefinido não se trata de uma atualização
        //rotina que permite só serem passados os campos alterados
        for( let atributoProduto in produto){
            produtoASerAtualizado[atributoProduto] = produto[ atributoProduto]
        }
        this.data[ produto.ID - 1] = produtoASerAtualizado
        this.persisitir()
        return produtoASerAtualizado
    }
    deletarProduto( id){
        let trueId = id - 1
        let listaProdutoASerManipulada = this.data
        let produtoExcluido = this.data[ trueId]
        if( ! produtoExcluido) return null
        listaProdutoASerManipulada.splice( trueId, 1)
        this.data = listaProdutoASerManipulada
        this.persisitir()
        return produtoExcluido
    }
    persisitir(){
        jsonexport( this.getProdutos(), ( err, csv) => {
            if( err) return console.log(err)
            fs.writeFile(__dirname+'/../db/products.csv', csv, err => console.log( err || 'Arquivo salvo'))
        })
    }
}

module.exports = DataBaseCSV;