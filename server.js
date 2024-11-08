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

// Rota de registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Verificar se o nome de usuário já existe
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send('Nome de usuário já está em uso!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).send('Usuário registrado com sucesso!');
});

// Rota de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, 'secreta', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Usuário ou senha incorretos!');
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});