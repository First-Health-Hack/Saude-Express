
# Saude Express API

Saude Express é uma API de gerenciamento médico que permite a triagem de pacientes, coleta de informações para atendimento emergencial e integração com sistemas de autoatendimento e bots de atendimento.

## Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Endpoints](#endpoints)
  - [POST /triagem](#post-triagem)
  - [GET /medicos/escala](#get-medicosescala)
  - [GET /paciente/historico](#get-pacientehistorico)
  - [POST /integracao/autoatendimento](#post-integracaoautoatendimento)
  - [POST /integracao/bot-atendimento](#post-integracaobotatendimento)
- [Modelo de Dados](#modelo-de-dados)
- [Contribuições](#contribuições)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/First-Health-Hack/Saude-Express.git
cd Saude-Express/api-geral
npm install
```


### Uso

Para iniciar a API, execute:

``` bash

node server.js
```

A API estará disponível em http://localhost:3000.
## Endpoints
### POST /triagem

#### Endpoint para realizar a triagem de um paciente.

URL: /triagem

Método HTTP: POST

Parâmetros de Requisição: json


```
{
  "sintomas": ["string"],
  "sinaisVitais": {
    "temperatura": "number",
    "pressao": "string",
    "oxigenacao": "number"
  },
  "escalaDor": "number",
  "escalaGlasgow": "number"
}
```

#### Exemplo de Requisição:

```
 '{
  "sintomas": ["dor abdominal intensa", "febre alta"],
  "sinaisVitais": {
    "temperatura": 39,
    "pressao": "120/80",
    "oxigenacao": 95
  },
  "escalaDor": 9,
  "escalaGlasgow": 15
}'
```

#### Resposta:

json
```
{
  "encaminhamento": "Urgência",
  "tempoEspera": 30
}
```

## GET /medicos/escala

### Endpoint para obter a escala de médicos disponíveis.

URL: /medicos/escala

Método HTTP: GET

Parâmetros de Requisição: Nenhum

Exemplo de Requisição:

sh
``` http
GET http://localhost:3000/medicos/escala
```
Resposta:

json
```
[
  { "nome": "Dr. João", "presente": true },
  { "nome": "Dra. Maria", "presente": false }
]
```

### GET /paciente/historico

Endpoint para obter o histórico de triagens de um paciente.

  URL: /paciente/historico

Método HTTP: GET

Parâmetros de Requisição:

    cpf: CPF do paciente (query string)

Exemplo de Requisição:


 GET http://localhost:3000/paciente/historico?cpf=12345678900

Resposta:

json
```
[
  {
    "sintomas": ["dor abdominal intensa", "febre alta"],
    "sinaisVitais": {
      "temperatura": 39,
      "pressao": "120/80",
      "oxigenacao": 95
    },
    "escalaDor": 9,
    "escalaGlasgow": 15,
    "encaminhamento": "Urgência",
    "tempoEspera": 30
  }
]
```

### POST /integracao/autoatendimento

  Endpoint para integração com o sistema de autoatendimento.

URL: /integracao/autoatendimento

Método HTTP: POST

Parâmetros de Requisição:

json
```
{
  "token": "string",
  "dadosPaciente": {
    "nome": "string",
    "cpf": "string",
    "sintomas": ["string"],
    "historicoMedico": "string"
  }
}
```

Exemplo de Requisição:


 POST http://localhost:3000/integracao/autoatendimento 
 ```
 {
  "token": "1234567890abcdef",
  "dadosPaciente": {
    "nome": "João Silva",
    "cpf": "12345678900",
    "sintomas": ["dor abdominal", "náusea"],
    "historicoMedico": "Paciente com histórico de gastrite."
  }
}'
```

Resposta:

json
```
{
  "status": "success",
  "mensagem": "Dados de autoatendimento integrados com sucesso."
}
```

### POST /integracao/bot-atendimento

  Endpoint para integração com o bot de atendimento.

URL: /integracao/bot-atendimento

Método HTTP: POST

Parâmetros de Requisição:

json
```
{
  "token": "string",
  "mensagem": "string",
  "dadosPaciente": {
    "nome": "string",
    "cpf": "string"
  }
}
```

Exemplo de Requisição:

sh

POST http://localhost:3000/integracao/bot-atendimento 

``` 
'{
  "token": "1234567890abcdef",
  "mensagem": "Quais são os seus sintomas?",
  "dadosPaciente": {
    "nome": "João Silva",
    "cpf": "12345678900"
  }
}'
```

Resposta:

json
```
{
  "status": "success",
  "mensagem": "Dados do bot de atendimento integrados com sucesso."
}
```

## Modelo de Dados
### Triagem

json
```
{
  "sintomas": ["string"],
  "sinaisVitais": {
    "temperatura": "number",
    "pressao": "string",
    "oxigenacao": "number"
  },
  "escalaDor": "number",
  "escalaGlasgow": "number",
  "encaminhamento": "string",
  "tempoEspera": "number"
}
```
## Medicos Escala

json
```
[
  {
    "nome": "string",
    "presente": "boolean"
  }
]
```

## Paciente Historico

json
```
[
  {
    "sintomas": ["string"],
    "sinaisVitais": {
      "temperatura": "number",
      "pressao": "string",
      "oxigenacao": "number"
    },
    "escalaDor": "number",
    "escalaGlasgow": "number",
    "encaminhamento": "string",
    "tempoEspera": "number"
  }
]
```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.


