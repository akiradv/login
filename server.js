// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Importar o middleware CORS

const app = express();
app.use(cors()); // Usar o middleware CORS
app.use(bodyParser.json());

// Armazenar usuários em memória
let users = [];
let activeUsers = 0; // Contador de usuários ativos
let newRegistrations = 0; // Contador de novos registros

// Rota para obter estatísticas
app.get('/stats', (req, res) => {
  res.json({
    activeUsers,
    newRegistrations
  });
});

// Rota de registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('Tentativa de registro:', username);

  try {
    // Verificar se o nome de usuário já existe
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      console.log('Nome de usuário já está em uso:', username);
      return res.status(400).json({ message: 'Nome de usuário já está em uso!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    newRegistrations++;
    console.log('Usuário registrado com sucesso:', username);
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = users.find(user => user.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username }, 'secreta', { expiresIn: '1h' });
      activeUsers++;
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Usuário ou senha incorretos!' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota de logout
app.post('/logout', (req, res) => {
  activeUsers = Math.max(0, activeUsers - 1);
  res.status(200).send('Logout realizado com sucesso!');
});

// Iniciar o servidor
app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});