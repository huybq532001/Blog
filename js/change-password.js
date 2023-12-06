API.get('auth/me', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => {})
  .catch((err) => {
    window.location.href = 'index.html';
  });

const inputOldPassword = document.getElementById('oldPassword');
const inputNewPassword = document.getElementById('newPassword');
const inputPasswordConfirmation = document.getElementById('passwordConfirmation');
const inputAddress = document.getElementById('address');
const updateData = document.getElementById('my-form');
const elMessage = document.getElementById('message');


API.get('auth/me', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => {
  const useInfo = res.data.data;
  inputName.value = useInfo.name;
  inputEmail.value = useInfo.email;
  inputPhone.value = useInfo.phone;
  inputAddress.value = useInfo.address;
});


updateData.addEventListener('submit', (e)=> {
  e.preventDefault();
  let message ='';
  API.put('/auth/change-password', {
    password_current: inputOldPassword.value.trim(),
    password: inputNewPassword.value.trim(),
    password_confirmation: inputPasswordConfirmation.value.trim()
  },{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then((res) => {
    elMessage.innerHTML += `<div class="alert alert-success alert-icon alert-dismissible fade show" role="alert">
    <i class="uil uil-times-circle"></i> Update thành công
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
  window.location.href = 'index.html';
  }).catch((err) => {
    const errors = err.response.data.errors;
    for (const key in errors) {
    message += `<div id="message">${errors[key][0]}</div>`
    }
    elMessage.innerHTML = /*html */ `
      <div class="alert alert-danger alert-icon alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    inputOldPassword.value = '';
    inputNewPassword.value = '';
    inputPasswordConfirmation.value = '';

  })
})