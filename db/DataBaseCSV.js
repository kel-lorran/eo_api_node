//modulos de manipulação de arquivos e CSV
var jsonexport = require('jsonexport')
const csv = require('csv-parser')
const fs = require('fs')

class DataBaseCSV{
    constructor( caminhoArquivoCSV_,){
        this.data = []
        this.inicialiazacaoTerminada = false
        this.caminhoArquivoCSV = caminhoArquivoCSV_
        this.inicializaData()
    }

    inicializaData(){
        fs.createReadStream(this.caminhoArquivoCSV)
        .pipe( csv())
        .on('data', (row) => {
            this.data.push( row)
        })
        .on( 'end', () => {
            this.inicialiazacaoTerminada = true
        })
    }
    getProdutos(){
        return this.data
    }
    getProduto(id){
        let trueId = --id
        if( trueId < this.data.length){
            return this.data[ trueId]
        }
        return {}
    }
    salvarProduto( produto){
        produto.id = this.data.length + 1
        this.data.push( produto)
        this.persisitir()
        return produto
    }
    atualizarProduto( produto){
        if(! produto.id) return null            //se não tem id não pode ser uma atualização
        let produtoASerAtualizado = this.data[ --produto.id]
        if(! produtoASerAtualizado) return null      //se está indefinido não se trata de uma atualização
        //rotina que permite só serem passados os campos alterados
        for( let atributoProduto in produto){
            produtoASerAtualizado[atributoProduto] = produto[ atributoProduto]
        }
        this.data[ --produto.id] = produtoASerAtualizado
        this.persisitir()
        return produtoASerAtualizado
    }
    persisitir(){
        jsonexport( this.getProdutos, ( err, csv) => {
            if( err) return console.log(err)
            fs.writeFile(__dirname+'/../db/products.csv', csv, err => console.log( err || 'Arquivo salvo'))
        })
    }
}

module.exports = DataBaseCSV;