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

    // Recuperar credenciais armazenadas
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Verificar credenciais
    if (storedUsername && storedPassword && username === storedUsername && password === storedPassword) {
      // Simular um token de autenticação
      localStorage.setItem('token', 'dummy-token');
      window.location.href = 'dashboard.html';
    } else {
      alert('Usuário ou senha incorretos!');
    }
  });

  document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('new-username').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();

    // Armazenar credenciais
    localStorage.setItem('username', newUsername);
    localStorage.setItem('password', newPassword);

    alert(`Usuário ${newUsername} registrado com sucesso!`);
    document.getElementById('register-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
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
});