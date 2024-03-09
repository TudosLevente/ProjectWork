<script>
import NavbarLogo from './mainPage/Navbar/NavbarLogo.vue'
import NavbarMenu from './mainPage/Navbar/NavbarMiddle.vue'
import NavbarUser from './mainPage/Navbar/NavbarUser.vue'

export default {
  components: {
    NavbarLogo,
    NavbarMenu,
    NavbarUser
  }
}
</script>

<style scoped>
@import url('@/assets/css/mainPage_CSS/navbar.css');
@import url('@/assets/css/mainPage_CSS/style.css');
/* @import "~bootstrap/dist/css/bootstrap.min.css"; */
</style>


<template>
  <div class="navbar_div">
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container-fluid">
        <div class="row col-12">
          <div class="col-lg-4 d-flex align-items-center justify-content-start">
            <NavbarLogo />
          </div>
          <div class="navbar_middle col-lg-4 d-flex align-items-center justify-content-center">
            <NavbarMenu />
          </div>
          <NavbarUser />
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@import url('@/assets/css/mainPage_CSS/navbar.css');
@import url('@/assets/css/mainPage_CSS/style.css');
</style>
