const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const uri = "mongodb+srv://admin:qMRkdR2LdMZsCD1p@firsthealthhack.rafk9kw.mongodb.net/?retryWrites=true&w=majority&appName=FirstHealthHack";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado ao MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao MongoDB Atlas:', error);
    });

// Modelos de Dados
const Triagem = mongoose.model('Triagem', new mongoose.Schema({
    sintomas: [String],
    sinaisVitais: {
        temperatura: Number,
        pressao: String,
        oxigenacao: Number,
    },
    escalaDor: Number,
    escalaGlasgow: Number,
    encaminhamento: String,
    tempoEspera: Number,
}));

// Função para classificar risco
const classificarRisco = (sintomas, sinaisVitais, escalaDor, escalaGlasgow) => {
    let encaminhamento = 'Consulta Ambulatorial';
    let tempoEspera = 30; // minutos

    // Prioridade Zero (Vermelha)
    if (sintomas.includes('parada cardiorrespiratória') || sintomas.includes('infarto') ||
        sintomas.includes('politrauma') || sintomas.includes('choque hipovolêmico') ||
        sinaisVitais.pressao < '90/60' || sinaisVitais.oxigenacao < 90 || escalaGlasgow <= 8) {
        encaminhamento = 'Emergência Imediata';
        tempoEspera = 15;
    }
    // Prioridade I (Amarela)
    else if (sintomas.includes('trauma moderado ou leve') || sintomas.includes('TCE sem perda da consciência') ||
        sintomas.includes('queimaduras menores') || sintomas.includes('dispnéia leve a moderada') ||
        sintomas.includes('dor abdominal intensa') || sintomas.includes('convulsão') ||
        sintomas.includes('cefaleia intensa') || escalaDor >= 8 || escalaGlasgow <= 13) {
        encaminhamento = 'Urgência';
        tempoEspera = 30;
    }
    // Prioridade II (Verde)
    else if (sintomas.includes('ferimento craniano menor') || sintomas.includes('dor abdominal difusa') ||
        sintomas.includes('cefaleia leve') || sintomas.includes('doença psiquiátrica menor') ||
        sintomas.includes('diarréia') || sintomas.includes('idosos assintomáticos') ||
        sintomas.includes('grávidas assintomáticas')) {
        encaminhamento = 'Urgência Menor';
        tempoEspera = 60;
    }

    return { encaminhamento, tempoEspera };
}

// Endpoints
app.post('/triagem', async (req, res) => {
    try {
        const { sintomas, sinaisVitais, escalaDor, escalaGlasgow } = req.body;
        const { encaminhamento, tempoEspera } = classificarRisco(sintomas, sinaisVitais, escalaDor, escalaGlasgow);

        const novaTriagem = new Triagem({
            sintomas, sinaisVitais, escalaDor, escalaGlasgow, encaminhamento, tempoEspera
        });

        await novaTriagem.save();
        res.json({ encaminhamento, tempoEspera });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/medicos/escala', (req, res) => {
    // Lógica para obter a escala de médicos
    const escala = [
        { nome: "Dr. João", presente: true },
        { nome: "Dra. Maria", presente: false }
    ];
    res.json(escala);
});

app.get('/paciente/historico', async (req, res) => {
    try {
        const { cpf } = req.query;
        const historico = await Triagem.find({ 'dados.cpf': cpf });
        res.json(historico);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/integracao/autoatendimento', async (req, res) => {
    try {
        const { token, dados } = req.body;
        const novaEntrada = new AutoAtendimento({ token, dados });
        await novaEntrada.save();

        const { sintomas, sinaisVitais, escalaDor, escalaGlasgow } = dados;
        const { encaminhamento, tempoEspera } = classificarRisco(sintomas, sinaisVitais, escalaDor, escalaGlasgow);

        res.json({ status: "Dados recebidos com sucesso", triagem: { encaminhamento, tempoEspera } });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/integracao/bot-atendimento', async (req, res) => {
    try {
        const { mensagem, cpf } = req.body;
        const novaMensagem = new BotAtendimento({ mensagem, cpf });
        await novaMensagem.save();

        // Resposta mockada para o exemplo
        const resposta = "Paciente reportou dor de cabeça e náusea";
        res.json({ resposta });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.listen(3000, () => console.log('API rodando na porta 3000'));