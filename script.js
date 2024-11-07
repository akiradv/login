document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Simulação de autenticação
  if (username === 'admin' && password === '1234') {
    document.getElementById('user-name').innerText = username;
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('user-info').classList.remove('hidden');

    // Redirecionar para a dashboard
    window.location.href = '/dashboard.html'; // Ajuste o caminho conforme necessário
  } else {
    alert('Usuário ou senha incorretos!');
  }
});

document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const newUsername = document.getElementById('new-username').value;
  const newPassword = document.getElementById('new-password').value;

  // Simulação de registro
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

const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
  document.getElementById('login-container').classList.remove('hidden');
  document.getElementById('user-info').classList.add('hidden');
});

// Mostrar Senha
document.getElementById('show-password').addEventListener('change', function() {
  const passwordField = document.getElementById('password');
  if (this.checked) {
    passwordField.type = 'text';
  } else {
    passwordField.type = 'password';
  }
});

// Dark Mode Toggle
const modeToggleButton = document.getElementById('mode-toggle-button');
let isDarkMode = false;

modeToggleButton.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode');
  document.querySelector('.container').classList.toggle('dark-mode');
  modeToggleButton.classList.toggle('dark-mode');

  // Update button text
  modeToggleButton.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
});