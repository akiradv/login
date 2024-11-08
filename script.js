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

    // Enviar requisição de registro para o servidor
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: newUsername, password: newPassword })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Usuário registrado com sucesso!') {
        alert(data.message);
        document.getElementById('register-container').classList.add('hidden');
        document.getElementById('login-container').classList.remove('hidden');
      } else {
        alert(data.message); // Exibir mensagem de erro se o nome de usuário já estiver em uso
      }
    })
    .catch(error => {
      console.error('Erro ao registrar usuário:', error);
      alert('Erro ao registrar usuário.');
    });
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
  document.getElementById('user-name').innerText = username;

  // Função de logout
  document.getElementById('logout-button').addEventListener('click', function() {
    fetch('/logout', {
      method: 'POST'
    })
    .then(response => {
      if (response.ok) {
        localStorage.removeItem('token'); // Remover o token de autenticação
        window.location.href = 'index.html'; // Redireciona para a página de login
      } else {
        alert('Erro ao fazer logout.');
      }
    })
    .catch(error => {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao fazer logout.');
    });
  });

  // Função para enviar notificação ao Discord
  document.getElementById('notify-button').addEventListener('click', function() {
    const webhookUrl = 'https://discord.com/api/webhooks/1304256902397693993/ZIjmF-yGTQEviaZGBf01bfVH42smJG-8_lYy_Nj9NzRVHK6f1Dz7cUsKW_RDHUZDKSNu';
    const message = {
      content: `Notificação do usuário: ${username}`
    };

    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
    .then(response => {
      if (response.ok) {
        alert('Notificação enviada com sucesso!');
      } else {
        alert('Falha ao enviar notificação.');
      }
    })
    .catch(error => {
      console.error('Erro ao enviar notificação:', error);
      alert('Erro ao enviar notificação.');
    });
  });

  // Função para atualizar estatísticas
  function updateStats() {
    fetch('/stats')
      .then(response => response.json())
      .then(data => {
        document.getElementById('active-users').innerText = data.activeUsers;
        document.getElementById('new-registrations').innerText = data.newRegistrations;
      })
      .catch(error => console.error('Erro ao buscar estatísticas:', error));
  }

  // Atualizar estatísticas ao carregar a página
  updateStats();
});