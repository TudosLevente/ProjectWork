<template>
  <div class="navbar_middle col-lg-4 d-flex align-items-center justify-content-center">
    <div class="input-group">
      <input type="text" class="navbar_searchbar" placeholder="Keressen receptjeink között ..." aria-label="Search"
        aria-describedby="basic-addon2" id="search-input" />
    </div>
    <div id="search-results-container" class="mt-2 fixed-top"></div>
    <div class="menuitems_row row justify-content-center ">
      <div class="navmenuitems">
        <ul class="navbarmenulist navbar-nav">
          <li class="divider"></li>
          <li class="dropdown_foetel nav-item dropdown" onmouseover="showFoetelekDropdown()"
            onmouseout="hideFoetelekDropdown()">
            <a class="nav-link dropdown dropdown_content_foetel" id="dropdownfoetel">
              Főételek
            </a>
            <ul class="dropdown_content_foetel dropdown-content" aria-labelledby="dropdownfoetel">
              <li><a class="dropdown-item" href="#">Burgerek</a></li>
              <li><a class="dropdown-item" href="#">Pizzák</a></li>
              <li><a class="dropdown-item" href="#">Saláták</a></li>
              <li><a class="dropdown-item" href="#">Levesek</a></li>
              <li><a class="dropdown-item" href="#">Tészták</a></li>
              <li><a class="dropdown-item" href="#">Tenger gyümölcsei</a></li>
              <li><a class="dropdown-item" href="#">Köretek</a></li>
            </ul>
          </li>
          <li class="divider"></li>
          <li class="dropdown_desszert nav-item dropdown" onmouseover="showDesszertekDropdown()"
            onmouseout="hideDesszertekDropdown()">
            <a class="nav-link dropdown dropdown_content_desszert" id="dropdowndesszert" href="#">
              Desszertek
            </a>
            <ul class="dropdown_content_desszert dropdown-content" aria-labelledby="dropdowndesszert">
              <li><a class="dropdown-item" href="#">Jégkrémek és Fagylaltok</a></li>
              <li><a class="dropdown-item" href="#">Snackek</a></li>
              <li><a class="dropdown-item" href="#">Muffinok és Pogácsák</a></li>
              <li><a class="dropdown-item" href="#">Palacsinták</a></li>
              <li><a class="dropdown-item" href="#">Piték</a></li>
              <li><a class="dropdown-item" href="#">Kekszek és Sütemények</a></li>
            </ul>
          </li>
          <li class="divider"></li>
          <li class="nav-item">
            <a class="nav-link" href="#">Levesek</a>
          </li>
          <li class="divider"></li>
          <li class="nav-item">
            <a class="nav-link" href="#">Saláták</a>
          </li>
          <li class="divider"></li>
          <li class="nav-item">
            <a class="nav-link" href="#">Tészták</a>
          </li>
          <li class="divider"></li>
          <li class="dropdown_kategoriak nav-item dropdown" onmouseover="showKategoriakDropdown()"
            onmouseout="hideKategoriakDropdown()">
            <a class="nav-link dropdown dropdown_content_kategoriak" id="dropdownkategoriak" href="#">
              Kategóriák
            </a>
            <ul class="dropdown_content_kategoriak dropdown-content" aria-labelledby="dropdownkategoriak"
              id="dropdown_content_kategoriak">
              <li><a class="dropdown-item" href="#">Burgerek</a></li>
              <li><a class="dropdown-item" href="#">Szendvicsek és Wrappok</a></li>
              <li><a class="dropdown-item" href="#">Pizzák</a></li>
              <li><a class="dropdown-item" href="#">Saláták</a></li>
              <li><a class="dropdown-item" href="#">Levesek</a></li>
              <li><a class="dropdown-item" href="#">Tészták</a></li>
              <li><a class="dropdown-item" href="#">Tenger gyümölcsei</a></li>
              <li><a class="dropdown-item" href="#">Köretek</a></li>
              <li><a class="dropdown-item" href="#">Szószok</a></li>
              <li><a class="dropdown-item" href="#">Torták</a></li>
              <li><a class="dropdown-item" href="#">Italok és Koktélok</a></li>
              <li><a class="dropdown-item" href="#">Jégkrémek és Fagylaltok</a></li>
              <li><a class="dropdown-item" href="#">Snackek</a></li>
              <li><a class="dropdown-item" href="#">Muffinok és Pogácsák</a></li>
              <li><a class="dropdown-item" href="#">Kenyerek</a></li>
              <li><a class="dropdown-item" href="#">Palacsinták</a></li>
              <li><a class="dropdown-item" href="#">Piték</a></li>
              <li><a class="dropdown-item" href="#">Kekszek és Sütemények</a></li>
              <li><a class="dropdown-item" href="#">Turmixok és Shakek</a></li>
              <li><a class="dropdown-item" href="#">Vegetárianus</a></li>
            </ul>
          </li>
          <li class="divider"></li>
          <li class="nav-item">
            <a class="nav-link" href="#">Ajánlatunk</a>
          </li>
          <li class="divider"></li>
          <li class="nav-item">
            <a class="nav-link" href="#">Rólunk</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/mainPage_CSS/navbar.css');
@import url('@/assets/css/mainPage_CSS/style.css');
/* @import "~bootstrap/dist/css/bootstrap.min.css"; */
</style>