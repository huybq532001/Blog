API.get('auth/me', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => { })
  .catch((err) => {
    window.location.href = 'index.html';
  });

const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputPhone = document.getElementById('phone');
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


updateData.addEventListener('submit', (e) => {
  e.preventDefault();
  let message = '';
  API.put('/auth/update', {
    name: inputName.value.trim(),
    phone: inputPhone.value.trim(),
    address: inputAddress.value.trim()
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then((res) => {
    elMessage.innerHTML += `<div class="alert alert-success alert-icon alert-dismissible fade show" role="alert">
    <i class="uil uil-times-circle"></i> Update thành công
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
  }).catch((err) => {
    const errors = err.response.data.errors;
    let message = '';
    for (const key in errors) {
      message += `<div id="message">${errors[key][0]}</div>`
    }
    elMessage.innerHTML = /*html */ `
      <div class="alert alert-danger alert-icon alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
  })
})