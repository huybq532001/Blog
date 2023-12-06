const inputName = document.getElementById('name');
API.get('auth/me', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => {
  window.location.href = 'index.html';
});

const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputPhone = document.getElementById('phone');
const inputAddress = document.getElementById('address');
const elForm = document.getElementById('my-form');
const elMessage = document.getElementById('message');

elForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = inputName.value.trim();
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();
  const phone = inputPhone.value.trim();
  const address = inputAddress.value.trim();

  API.post('users/register', {
    name,
    email,
    password,
    phone,
    address,
  })
    .then((res) => {
      API.post('auth/login', {
        email,
        password,
      }).then((resLogin) => {
        localStorage.setItem(ACCESS_TOKEN, resLogin.data.access_token);
        window.location.href = 'index.html';
      });
    })
    .catch((err) => {
      const errors = err.response.data.errors;
      let message = '';

      for (const key in errors) {
        message += `<p class="mb-0">${errors[key][0]}</p>`;
      }

      elMessage.innerHTML = /*html */ `
      <div class="alert alert-danger alert-icon alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    });
});
