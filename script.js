document.addEventListener('DOMContentLoaded', function() {
  // Verificar se o usuário já está logado ao carregar a página
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = 'dashboard.html';
  }

  // Aplicar preferência de modo escuro
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    document.querySelector('.container').classList.add('dark-mode');
    document.getElementById('mode-toggle-button').textContent = 'Light Mode';
  }

  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Recuperar usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('token', 'fake-jwt-token'); // Armazenar um token falso
      localStorage.setItem('username', username); // Armazenar o nome de usuário
      alert('Login realizado com sucesso!');
      window.location.href = 'dashboard.html'; // Redirecionar para a dashboard
    } else {
      alert('Usuário ou senha incorretos!');
    }
  });

  document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('new-username').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();

    // Recuperar usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.username === newUsername);

    if (existingUser) {
      alert('Nome de usuário já está em uso!');
    } else {
      users.push({ username: newUsername, password: newPassword });
      localStorage.setItem('users', JSON.stringify(users)); // Salvar usuários no localStorage
      alert('Usuário registrado com sucesso!');
      document.getElementById('register-container').classList.add('hidden');
      document.getElementById('login-container').classList.remove('hidden');
    }
  });

  document.getElementById('show-register').addEventListener('click', function() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('register-container').classList.remove('hidden');
  });

  document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('register-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
  });

  document.getElementById('show-password').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
  });

  document.getElementById('show-new-password').addEventListener('change', function() {
    const newPasswordField = document.getElementById('new-password');
    newPasswordField.type = this.checked ? 'text' : 'password';
  });

  const modeToggleButton = document.getElementById('mode-toggle-button');

  modeToggleButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    modeToggleButton.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('darkMode', isDarkMode);
  });

  // Exibir o nome do usuário
  const username = localStorage.getItem('username');
  if (username) {
    document.getElementById('user-name').innerText = username;
  }

  // Função de logout
  document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('token'); // Remover o token de autenticação
    localStorage.removeItem('username'); // Remover o nome de usuário
    window.location.href = 'index.html'; // Redireciona para a página de login
  });
});