# Saúde Express API - MVP

#### Descrição

A Saúde Express API é uma solução inovadora para melhorar o acesso à saúde, reduzir filas, melhorar a triagem de pacientes e otimizar os atendimentos. Integrando um bot de WhatsApp e tokens de autoatendimento, a API oferece uma triagem inicial dos sintomas e sinais vitais, encaminhamento adequado e estimativa de tempo de espera.

### Funcionalidades

- Triagem de Sintomas: A API realiza a triagem dos sintomas e sinais vitais informados, retornando o encaminhamento adequado e a estimativa de tempo de espera.
- Consulta de Escala de Médicos: Permite consultar a escala de médicos disponíveis em uma unidade de saúde específica.
- Histórico de Pacientes: Oferece acesso ao histórico de triagens e encaminhamentos de um paciente com base no CPF.
- Integração com tokens de Autoatendimento: Recebe dados de sintomas e sinais vitais de tokens de autoatendimento.
- Integração com Bot de WhatsApp: Processa mensagens recebidas de um bot de atendimento no WhatsApp para triagem inicial e orientações.

## Endpoints

### POST /triagem

Realiza a triagem dos sintomas e sinais vitais informados, retornando o encaminhamento adequado e a estimativa de tempo de espera. 

**Exemplo de Requisição:**

```
  {
    "cpf": "12345678900",
    "sintomas": ["febre", "tosse"],
    "sinaisVitais": {
        "temperatura": 38.5,
        "pressao": "130/85",
        "oxigenacao": 95
    },
    "escalaDor": 7,
    "escalaGlasgow": 15
}
```

**Exemplo de Resposta:**
```
{
    "encaminhamento": "Urgência",
    "tempoEspera": 30
}
```
### GET /medicos/escala

Retorna a escala de médicos para uma unidade de saúde específica.Podendo ser conectado com os dados da unidade.

**Exemplo de Resposta:**

```
[
    { "nome": "Dr. João", "presente": true },
    { "nome": "Dra. Maria", "presente": false }
]
```

### GET /paciente/historico

Retorna o histórico de triagens e encaminhamentos de um paciente baseado no CPF.

**Parâmetro de Consulta:**

``
cpf: CPF do paciente.
``

**Exemplo de Resposta:**

```
[
    {
        "data": "2023-06-19T12:00:00Z",
        "sintomas": ["febre", "tosse"],
        "sinaisVitais": {
            "temperatura": 38.5,
            "pressao": "130/85",
            "oxigenacao": 95
        },
        "encaminhamento": "Urgência",
        "tempoEspera": 30
    }
]
```

### POST /integracao/autoatendimento

Integra dados recebidos de um token de autoatendimento.

**Exemplo de Requisição:**

```
{
    "token": "some_token",
    "dados": {
        "sintomas": ["febre", "tosse"],
        "sinaisVitais": {
            "temperatura": 38.5,
            "pressao": "130/85",
            "oxigenacao": 95
        },
        "escalaDor": 7,
        "escalaGlasgow": 15
    }
}
```

**Exemplo de Resposta:**

```
{
    "status": "Dados recebidos com sucesso",
    "triagem": {
        "encaminhamento": "Urgência",
        "tempoEspera": 30
    }
}
```

### POST /integracao/bot-atendimento

Integra mensagens recebidas de um bot de atendimento no WhatsApp.

**Exemplo de Requisição:**

```
{
    "mensagem": "Paciente reporta dor de cabeça e náusea",
    "cpf": "12345678900"
}
```
**Exemplo de Resposta:**

```
{
    "resposta": "Paciente reportou dor de cabeça e náusea"
}
```
## Instalação e Configuração

### Pré-requisitos

- Node.js
- NPM
- MongoDB Atlas ou outro servidor MongoDB

### Passos para Instalação
1. Clone o repositório:

```
git clone https://github.com/First-Health-Hack/Saude-Express.git
cd saude-express-api
``` 
2. Instale as dependências:

```
npm install
```

3. Configure a conexão com o MongoDB Atlas no arquivo server.js

4. Inicie o servidor:

```
node server.js
```
O servidor estará rodando na porta 3000. Você pode acessar a API através de http://localhost:3000.

## Documentação Detalhada

Para a documentação completa da API, incluindo todos os detalhes de endpoints, parâmetros e exemplos de requisição/resposta, acesse [![Documentação.](https://github.com/First-Health-Hack/Saude-Express/tree/main/api-geral)](https://github.com/First-Health-Hack/Saude-Express/tree/main/api-geral)

## Token
O token de autoatendimento é construído com entradas de dados das medições e sintomas fornecidos pelo paciente. Além disso, possui uma conexão com a API.
Os dados, após serem processados pela API, retornam informando o tempo de espera até o atendimento médico e a cor da pulseira de acordo com a Triagem de Manchester, que será entregue ao paciente.

<p align="center">
<img src=./imgs/circuito.png width="50%"></br>
(*Prototipação do circuito do token, apenas os pinos de energia foram levados em consideração, outros pinos foram assumidos que são GPO)
</p>

O token de autoatendimento possui os equipamentos para conferência de sinais vitais. Na tela do token, o paciente será instruído a inserir o dedo no sensor para medir a oxigenação, e os dados de temperatura, pressão e oxigenação serão capturados automaticamente pelos dispositivos integrados ao token (balança, termômetro, oxímetro e medidor de pressão). O paciente também inserirá manualmente os sintomas e os dados de identificação.

## Prototipação
[![Figma da tela do token.](https://www.figma.com/proto/41ZfMthdro3y2IVgwlsJHr/Sa%C3%BAde-Express?node-id=0-1&t=AGg0nrf3GKDzk54X-1)](https://www.figma.com/proto/41ZfMthdro3y2IVgwlsJHr/Sa%C3%BAde-Express?node-id=0-1&t=AGg0nrf3GKDzk54X-1)


[![Slide deck.](https://www.canva.com/design/DAGIaxe-o2E/QggD0avpkliIKTQAYGU-jQ/view?utm_content=DAGIaxe-o2E&utm_campaign=designshare&utm_medium=link&utm_source=editor)](https://www.canva.com/design/DAGIaxe-o2E/QggD0avpkliIKTQAYGU-jQ/view?utm_content=DAGIaxe-o2E&utm_campaign=designshare&utm_medium=link&utm_source=editor)


<p align="center">
<img src=./imgs/proto.png width="50%"></br>
(*imagem da documentação do repositório oficial)
</p>


## Considerações Finais

A Saúde Express API foi desenvolvida para demonstrar o potencial de integração de tecnologias modernas para melhorar a triagem e o atendimento em unidades de saúde. Durante o hackathon, nos concentramos em criar um MVP funcional, com foco nos endpoints mais críticos para a triagem de pacientes e integração com sistemas de atendimento automatizado.

### Slogan

"Seu atendimento rápido e seguro!"

### Equipe

- Sonia Janara S Barros
- Erick M.S.
- kaique persch
- Venelouis t.s. Palhano
- evellyn de oliveira


**Alguns links para referência:**

- <a href="https://github.com/First-Health-Hack/Saude-Express/tree/main/Documentacao"> Documentação (slides, resumo, detalhes, etc)</a>
- <a href="https://indicadores.igesdf.org.br/filasupa/"> https://indicadores.igesdf.org.br/filasupa</a>
- <a href="https://www.blackbox.ai/agent/SaudeExpressLue9hny">https://www.blackbox.ai/agent/SaudeExpressLue9hny</a>
