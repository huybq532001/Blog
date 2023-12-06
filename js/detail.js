const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));

const categoryName = document.getElementById('categoryName');
const title = document.getElementById('title');
const publishDate = document.getElementById('publishDate');
const thumb = document.getElementById('thumb');
const content = document.getElementById('content');

API.get(`articles/${id}`).then((res) => {
  const item = res.data.data;
  categoryName.innerHTML = item.category;
});
