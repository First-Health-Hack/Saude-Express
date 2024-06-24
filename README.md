# Saúde Express
Saúde Express é um sistema inovador de autoatendimento que combina um toten de autogestão com um avançado bot de WhatsApp. Este sistema foi desenvolvido para agilizar a triagem de pacientes em locais de atendimento, tornando o processo mais eficiente e acessível.

Nosso token é composto por dados de equipamentos de monitoramento de sinais vitais, como temperatura e oxigenação, além da inserção de sintomas.

Após essa triagem, o paciente é classificado de acordo com o Sistema de Triagem de Manchester, recebe sua pulseira, e sua ficha médica é encaminhada para o médico que realizará o atendimento.
<p align="center">
<img src=./imgs/proto.png width="50%">
</p>

## Totem
O totem de autoatendimento é construído com entradas de dados das medições e sintomas fornecidos pelo paciente. Esses dados são coletados por equipamentos de medição conectados a um microcontrolador, que envia as informações para a API através de um servidor web local.
Além disso, possui uma conexão com a API. Os dados, após serem processados pela API, retornam informando o tempo de espera até o atendimento médico e a cor da pulseira de acordo com a Triagem de Manchester, que será entregue ao paciente.

Esse sistema inovador otimiza o fluxo de atendimento, garantindo que os pacientes recebam a assistência necessária de forma eficiente e precisa. A integração da IA e da API não apenas acelera a triagem, mas também melhora a precisão do diagnóstico preliminar, permitindo que os médicos tenham acesso imediato a informações vitais. Isso resulta em um processo de atendimento mais ágil e organizado, reduzindo o tempo de espera e melhorando a experiência geral dos pacientes.

### Prototipação
<p align="center">
 <img src=./imgs/circuito.png width="50%"><br>
  Circuito Toten
</p>

#### Display Touch Toten
 <a href="https://www.figma.com/proto/41ZfMthdro3y2IVgwlsJHr/Saúde-Express?node-id=0-1&t=AGg0nrf3GKDzk54X-1">Figma</a>  

### Datashets
- <a href="https://ww1.microchip.com/downloads/en/devicedoc/41211d_.pdf">41211d</a>
 - <a href="https://ww1.microchip.com/downloads/en/devicedoc/39632e.pdf">39632e</a>
 - <a href="https://semiconductors.es/datasheet/ARM11.html">ARM11</a>


## Saúde Express API - MVP

##### Descrição

A Saúde Express API é uma solução inovadora para melhorar o acesso à saúde, reduzir filas, melhorar a triagem de pacientes e otimizar os atendimentos. Integrando um bot de WhatsApp e tokens de autoatendimento, a API oferece uma triagem inicial dos sintomas e sinais vitais, encaminhamento adequado e estimativa de tempo de espera.

#### Funcionalidades

- Triagem de Sintomas: A API realiza a triagem dos sintomas e sinais vitais informados, retornando o encaminhamento adequado e a estimativa de tempo de espera.
- Consulta de Escala de Médicos: Permite consultar a escala de médicos disponíveis em uma unidade de saúde específica.
- Histórico de Pacientes: Oferece acesso ao histórico de triagens e encaminhamentos de um paciente com base no CPF.
- Integração com Quiosques de Autoatendimento: Recebe dados de sintomas e sinais vitais de tokens de autoatendimento.
- Integração com Bot de WhatsApp: Processa mensagens recebidas de um bot de atendimento no WhatsApp para triagem inicial e orientações.

### Endpoints

#### POST /triagem

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
#### GET /medicos/escala

Retorna a escala de médicos para uma unidade de saúde específica.Podendo ser conectado com os dados da unidade.

**Exemplo de Resposta:**

```
[
    { "nome": "Dr. João", "presente": true },
    { "nome": "Dra. Maria", "presente": false }
]
```

#### GET /paciente/historico

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

#### POST /integracao/autoatendimento

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

#### POST /integracao/bot-atendimento

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
### Instalação e Configuração

#### Pré-requisitos

- Node.js
- NPM
- MongoDB Atlas ou outro servidor MongoDB

#### Passos para Instalação
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
### Protótipo 
  <a href="https://www.figma.com/proto/Wpk5EqEQKQJ5Tu94MmtFYq/Untitled?node-id=0-1&t=Dpg40eIEiu2FIVIp-1">Prototipo do Bot Whatsapp</a>

### Documentação Detalhada

Para a documentação completa da API, incluindo todos os detalhes de endpoints, parâmetros e exemplos de requisição/resposta, acesse [![Documentação.](https://github.com/First-Health-Hack/Saude-Express/tree/main/api-geral)](https://github.com/First-Health-Hack/Saude-Express/tree/main/api-geral)

### Considerações Finais

A Saúde Express API foi desenvolvida para demonstrar o potencial de integração de tecnologias modernas para melhorar a triagem e o atendimento em unidades de saúde. Durante o hackathon, nos concentramos em criar um MVP funcional, com foco nos endpoints mais críticos para a triagem de pacientes e integração com sistemas de atendimento automatizado.

#### Slogan

"Seu atendimento rápido e seguro!"

## Equipe

- Sonia Janara S Barros
- Erick M.S.
- kaique persch
- Venelouis t.s. Palhano
- evellyn de oliveira
