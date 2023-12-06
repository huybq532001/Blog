API.get('auth/me', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => {
  window.location.href = 'index.html';
});

const elForm = document.getElementById('login-form');
const inputEmail = document.getElementById('loginEmail');
const inputPassword = document.getElementById('loginPassword');
const elMessage = document.getElementById('message');

elForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  // axios.post(url, data);

  API.post('auth/login', {
    email: email,
    password: password,
  })
    .then((res) => {
      localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
      window.location.href = 'index.html';
    })
    .catch((err) => {
      elMessage.innerHTML = /*html */ `
      <div class="alert alert-danger alert-icon alert-dismissible fade show" role="alert">
        <i class="uil uil-times-circle"></i> Thông tin đăng nhập không đúng
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    });
});
