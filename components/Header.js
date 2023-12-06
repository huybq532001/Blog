class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html */`
    <header class="wrapper bg-gray">
      <nav class="navbar navbar-expand-lg center-nav navbar-light navbar-bg-light">
        <div class="container flex-lg-row flex-nowrap align-items-center">
          <div class="navbar-brand w-100">
            <a href="./index.html">
              <!-- <img src="./assets/img/logo-dark.png" alt="" /> -->
              <img src="https://zendvn.com/upload/1/log-zendvn-detail.png" alt="" />
            </a>
          </div>
          <div class="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
            <div class="offcanvas-header d-lg-none">
              <h3 class="text-white fs-30 mb-0">ZendVN News</h3>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div class="offcanvas-body ms-lg-auto d-flex flex-column h-100">
              <ul class="navbar-nav main-menu">
                
              </ul>
            </div>
          </div>
          <div class="navbar-other w-100 d-flex ms-auto">
            <ul class="navbar-nav flex-row align-items-center ms-auto">
              <li class="nav-item">
                <form action="search.html" class="search-form">
                  <input type="text" name="keyword" class="form-control"
                    placeholder="Type something to search ..." required="">
                </form>
              </li>
              <li class="nav-item d-lg-none">
                <button class="hamburger offcanvas-nav-btn"><span></span></button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>`
  }
}

customElements.define("zvn-header", Header);