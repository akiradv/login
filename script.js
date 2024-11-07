document.addEventListener('DOMContentLoaded', function() {
  // Verificar se o usuário já está logado ao carregar a página
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = 'dashboard.html';
  }

  document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const success = await login(username, password);
    if (success) {
      window.location.href = 'dashboard.html';
    } else {
      alert('Usuário ou senha incorretos!');
    }
  });

  document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('new-username').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();

    const success = await register(newUsername, newPassword);
    if (success) {
      alert(`Usuário ${newUsername} registrado com sucesso!`);
      document.getElementById('register-container').classList.add('hidden');
      document.getElementById('login-container').classList.remove('hidden');
    } else {
      alert('Erro ao registrar. Tente novamente.');
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

  const modeToggleButton = document.getElementById('mode-toggle-button');
  let isDarkMode = false;

  modeToggleButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    modeToggleButton.classList.toggle('dark-mode');
    modeToggleButton.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
  });
});