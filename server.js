// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

// Conectar ao MongoDB Atlas usando a variável de ambiente
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Conectado ao MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro ao conectar ao MongoDB Atlas:', err);
});

// Definir o modelo de usuário
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

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

  try {
    // Verificar se o nome de usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Nome de usuário já está em uso!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    newRegistrations++; // Incrementar novos registros
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, 'secreta', { expiresIn: '1h' });
    activeUsers++; // Incrementar usuários ativos
    res.json({ token });
  } else {
    res.status(401).send('Usuário ou senha incorretos!');
  }
});

// Rota de logout
app.post('/logout', (req, res) => {
  activeUsers = Math.max(0, activeUsers - 1); // Decrementar usuários ativos, garantindo que não fique negativo
  res.status(200).send('Logout realizado com sucesso!');
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});