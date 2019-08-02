# API NODE COM PERSISTENCIA EM .CSV

## Instalação

### Requisitos:
[node](https://nodejs.org/en/download/)

### Instruções:
Após clonar o repositório, use o npm, com os seguintes comandos:
#### instala dependencias listadas no package.json
```
npm install
```
## Utilização

#### starta serve na porta 3003
```
npm start
```

apos isso seu servidor estará respondendo em http://localhost:3003

#### NOTA: verifique as autorizações de leitura e escrita de pastas no ambiente que está sendo rodado, isso para permitir a persistencia de dados no /db/products.csv

<br><br>
-----------------------------[DOCUMENTAÇÃO DA API COMPLETA](https://kel-lorran.github.io/eo_api_node/)-----------------------------
<br><br>

## ROTAS

### GET /produtos
#### Listar todos produtos
#### Response:
```
[
  { 
    nome: string ,
    reco: number
  }
]
```

### GET /produtos/:id
#### Recuperar Produto
#### Request
##### URI Parameters:
id: numer (required)
#### Response:
```
[
  { 
    ID: number ,
    nome: string ,
    reco: number
  }
]
```

### POST /produto
#### Criar produto
#### Request:
```
{
  nome: string (required) ,
  reco: number (required)
}
```
#### Response:
```
{
  ID: number ,
  nome: string ,
  reco: number
}
```

### PUT /produtos/:id
#### Atualiza Produto
#### Request
##### URI Parameters:
id: numer (required)
#### Response:
```
[
  { 
    ID: number ,
    nome: string ,
    reco: number
  }
]
```

### DELETE /produtos/:id
#### Deleta Produto
#### Request
##### URI Parameters:
id: numer (required)
#### Response:
```
[
  { 
    ID: number ,
    nome: string ,
    reco: number
  }
]
```

