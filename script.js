// Replace these with your actual Google Client ID and Secret
const clientId = "YOUR_GOOGLE_CLIENT_ID";
const clientSecret = "YOUR_GOOGLE_CLIENT_SECRET";

// Redirect URI after Google Authentication
const redirectUri = "http://localhost:8080/callback"; // Adjust this

// Initialize Google Sign-in
const googleSignIn = new google.accounts.id.Client({
  client_id: clientId,
  callback_url: redirectUri
});

// Handle Sign-in
const googleLoginButton = document.getElementById('google-login-button');
googleLoginButton.addEventListener('click', () => {
  googleSignIn.signIn().then((response) => {
    // Get user profile information
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': 'Bearer ' + response.credential
      }
    })
    .then(response => response.json())
    .then(user => {
      // Update UI with user information
      document.getElementById('user-name').innerText = user.given_name;
      document.getElementById('user-email').innerText = user.email;
      // Hide login, show user info
      document.getElementById('login-container').classList.add('hidden');
      document.getElementById('user-info').classList.remove('hidden');
    })
    .catch(error => console.error('Error fetching user info:', error));
  });
});

// Handle Logout
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
  // Clear the user's session (not directly possible here)
  // You'd typically handle this server-side
  console.log('Logout triggered. (Not implemented)');
  // For demonstration purposes, hide user info and show login
  document.getElementById('login-container').classList.remove('hidden');
  document.getElementById('user-info').classList.add('hidden');
});

// Dark Mode Toggle
const modeToggleButton = document.getElementById('mode-toggle-button');
let isDarkMode = false; // Track the current mode

modeToggleButton.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode');
  document.querySelector('.container').classList.toggle('dark-mode');
  document.getElementById('google-login-button').classList.toggle('dark-mode');
  document.getElementById('logout-button').classList.toggle('dark-mode');
  modeToggleButton.classList.toggle('dark-mode');

  // Update button text
  modeToggleButton.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
});