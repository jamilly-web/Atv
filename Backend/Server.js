server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Armazena tarefas em memória
let tarefas = [];

// Rota GET /tarefas
app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

// Rota POST /tarefas
app.post('/tarefas', (req, res) => {
  const { texto } = req.body;
  if (!texto) return res.status(400).json({ erro: "Texto da tarefa é obrigatório" });

  tarefas.push(texto);
  res.json({ mensagem: "Tarefa adicionada", tarefas });
});

// Rota DELETE /tarefas/:index
app.delete('/tarefas/:index', (req, res) => {
  const index = Number(req.params.index);
  if (index < 0 || index >= tarefas.length) return res.status(404).json({ erro: "Tarefa não encontrada" });

  tarefas.splice(index, 1);
  res.json({ mensagem: "Tarefa removida", tarefas });
});

// Inicia servidor
app.listen(3001, () => console.log("Servidor rodando em http://localhost:3001"));
