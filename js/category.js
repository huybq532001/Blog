const elArticles = document.getElementById('articles');
const elPagination = document.getElementById('pagination');

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));

let currentPage = 1;
let PAGE_RANGE = 5;
let start = 1;
let end = PAGE_RANGE;

fetchArticles();

elPagination.addEventListener('click', (e) => {
  e.preventDefault();
  const el = e.target;

  if (el.classList.contains('zvn-page-item')) {
    currentPage = parseInt(el.innerText);
    fetchArticles(currentPage);
    window.scrollTo(0, 0);
  }

  if (el.classList.contains('btn-next')) {
    currentPage++;

    // if(currentPage = end ){
    //   start++;
    //   end++;
    // }

    if (currentPage % PAGE_RANGE === 1) {
      start = currentPage
      end += PAGE_RANGE;
    }

    fetchArticles(currentPage);
    window.scrollTo(0, 0);
  }

  if (el.classList.contains('btn-prev')) {
    currentPage--;

    // if(currentPage = start){
    //   start--;
    //   end--;
    // }

    if(currentPage % PAGE_RANGE === 0){
      end = currentPage;
      start = end - PAGE_RANGE + 1;
    }

    fetchArticles(currentPage);
    window.scrollTo(0, 0);
  }
});

function fetchArticles(page = 1) {
  API.get(`categories_news/${id}/articles?limit=6&page=${page}`).then((res) => {
    const data = res.data.data;
    const totalPage = res.data.meta.last_page;
    renderPagination(totalPage);
    renderArticles(data);
  });
}

function renderPagination(totalPage) {
  let html = '';
  const disabledBtnNext = currentPage === totalPage ? 'disabled' : '';
  const disabledBtnPrev = currentPage === 1 ? 'disabled' : '';

  if (end > totalPage) end = totalPage;

  for (let i = start; i <= end; i++) {
    const active = currentPage === i ? 'active' : '';
    html += /*html */ `<li class="page-item ${active}"><a class="page-link zvn-page-item" href="#">${i}</a></li>`;
  }
  elPagination.innerHTML =
    /*html */
    `<li class="page-item ${disabledBtnPrev}">
      <a class="page-link btn-prev" href="#" aria-label="Previous">
        <span aria-hidden="true" class="btn-prev"><i class="uil uil-arrow-left btn-prev"></i></span>
      </a>
    </li>` +
    html +
    /*html */ `<li class="page-item ${disabledBtnNext}">
                <a class="page-link btn-next" href="#" aria-label="Next">
                  <span aria-hidden="true" class="btn-next"><i class="uil uil-arrow-right btn-next"></i></span>
                </a>
              </li>`;
}

function renderArticles(list) {
  let html = '';
  list.forEach((item) => {
    html += renderArticleItem(item);
  });

  elArticles.innerHTML = html;
}

function renderArticleItem(data) {
  const publishDateFormatted = dayjs(data.publish_date).fromNow();

  return /*html */ `
  <article class="item post col-md-6 col-lg-4">
    <div class="card">
      <figure class="card-img-top overlay overlay-1 hover-scale">
        <a href="#">
          <img src="${data.thumb}" alt="${data.title}" />
        </a>
        <figcaption>
          <h5 class="from-top mb-0">Read More</h5>
        </figcaption>
      </figure>
      <div class="card-body">
        <div class="post-header">
          <h2 class="post-title h3 mt-1 mb-3"><a class="link-dark" href="./blog-post.html">${data.title}</a></h2>
        </div>
        <div class="post-content">
          <p>${data.description}</p>
        </div>
      </div>
      <div class="card-footer">
        <ul class="post-meta d-flex mb-0">
          <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${publishDateFormatted}</span></li>
          <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>4</a></li>
          <li class="post-likes ms-auto"><a href="#"><i class="uil uil-heart-alt"></i>5</a></li>
        </ul>
      </div>
    </div>
  </article>`;
}
