<script>
import Navbar from "@/components/NavbarMainPage.vue";

export default {
  components: {
    Navbar
  },
}
</script>

<template>
  <div class="fooldal">
    <Navbar />
    <img class="background_image" src="../assets/images/mainPage_Image/backgorund-image0.png" />
    <div class="title">
      <div class="title_foodhub">FoodHub</div>
      <div class="title_slogen">Egy harapásra vagy a boldogságtól!</div>
    </div>
    <div class="fooldal_layout">
      <div class="ajanlataink">
        <div class="ajanlat_title">
          <div class="ajanlat_text">
            Legfelkeresetebb recepjeink
          </div>
        </div>
        <div class="slideshow-container" id="slideshow-container">
          <div class="ajanlat_container" id="ajanlat-container">
            <div class="ajanlat_container_div">
              <a href="link-to-food-1">
                <img class="ajanlat_container_div_image"
                  src="https://th.bing.com/th/id/OIG4.ns5u_mjAJetMx27dxRVT?pid=ImgGn" />
              </a>
            </div>
            <div class="ajanlat_container_div">
              <a href="link-to-food-1">
                <img class="ajanlat_container_div_image"
                  src="https://tse1.mm.bing.net/th/id/OIG2.gR_gFPNyfBC4huf4fb5l?w=270&h=270&c=6&r=0&o=5&dpr=1.1&pid=ImgGn" />
              </a>
            </div>
            <div class="ajanlat_container_div">
              <a href="link-to-food-1">
                <img class="ajanlat_container_div_image"
                  src="https://tse1.mm.bing.net/th/id/OIG2.7WFOY73Sv0gq8KERThX4?w=270&h=270&c=6&r=0&o=5&dpr=1.1&pid=ImgGn" />
              </a>
            </div>
            <div class="ajanlat_container_div">
              <a href="link-to-food-1">
                <img class="ajanlat_container_div_image"
                  src="https://tse4.mm.bing.net/th/id/OIG2.35MUmPF0XGRuDcmyploO?w=270&h=270&c=6&r=0&o=5&dpr=1.1&pid=ImgGn" />
              </a>
            </div>
            <div class="ajanlat_container_div">
              <a href="link-to-food-1">
                <img class="ajanlat_container_div_image"
                  src="https://tse3.mm.bing.net/th/id/OIG2.08ar58pbcG1tEv0P1s83?w=270&h=270&c=6&r=0&o=5&dpr=1.1&pid=ImgGn" />
              </a>
            </div>
            <div class="ajanlat_container_div">
              <a href="link-to-food-1">
                <img class="ajanlat_container_div_image" />
              </a>
            </div>
            <div class="ajanlat_container_div">
              <a href="link-to-food-1">
                <img class="ajanlat_container_div_image" src="../images/mainPage_Image/food-20.png" />
              </a>
            </div>
            <div class="ajanlat_container_div">
              <a href="link-to-food-1">
                <img class="ajanlat_container_div_image" />
              </a>
            </div>
            <div class="ajanlat_container_div">
              <a href="link-to-food-1">
                <img class="ajanlat_container_div_image" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="uj_recpetjeink_etel_galeria">
        <div class="uj_recpetjeink_title">
          <div class="uj_recpetjeink_text">Új Recepjeink</div>
        </div>
        <div class="uj_recpetjeink_div_container">
          <div class="uj_recpetjeink_div">
            <div class="uj_recpetjeink_div_picture">
              <img class="uj_recpetjeink_div_picture_img" id="r1c1" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="uj_recpetjeink_div_title" id="name_r1c1">Példa kaja</div>
            <button class="uj_recpetjeink_div_button">
              <div class="uj_recpetjeink_div_button_text">Megnézem</div>
            </button>
          </div>
          <div class="uj_recpetjeink_div">
            <div class="uj_recpetjeink_div_picture">
              <img class="uj_recpetjeink_div_picture_img" id="r1c2" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="uj_recpetjeink_div_title" id="name_r1c2">Példa kaja</div>
            <button class="uj_recpetjeink_div_button">
              <div class="uj_recpetjeink_div_button_text">Megnézem</div>
            </button>
          </div>
          <div class="uj_recpetjeink_div">
            <div class="uj_recpetjeink_div_picture">
              <img class="uj_recpetjeink_div_picture_img" id="r1c3" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="uj_recpetjeink_div_title" id="name_r1c3">Példa kaja</div>
            <button class="uj_recpetjeink_div_button">
              <div class="uj_recpetjeink_div_button_text">Megnézem</div>
            </button>
          </div>
          <div class="uj_recpetjeink_div">
            <div class="uj_recpetjeink_div_picture">
              <img class="uj_recpetjeink_div_picture_img" id="r1c4" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="uj_recpetjeink_div_title" id="name_r1c4">Példa kaja</div>
            <button class="uj_recpetjeink_div_button">
              <div class="uj_recpetjeink_div_button_text">Megnézem</div>
            </button>
          </div>
          <div class="uj_recpetjeink_div">
            <div class="uj_recpetjeink_div_picture">
              <img class="uj_recpetjeink_div_picture_img" id="r2c1" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="uj_recpetjeink_div_title" id="name_r2c1">Példa kaja</div>
            <button class="uj_recpetjeink_div_button">
              <div class="uj_recpetjeink_div_button_text">Megnézem</div>
            </button>
          </div>
          <div class="uj_recpetjeink_div">
            <div class="uj_recpetjeink_div_picture">
              <img class="uj_recpetjeink_div_picture_img" id="r2c2" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="uj_recpetjeink_div_title" id="name_r2c2">Példa kaja</div>
            <button class="uj_recpetjeink_div_button">
              <div class="uj_recpetjeink_div_button_text">Megnézem</div>
            </button>
          </div>
          <div class="uj_recpetjeink_div">
            <div class="uj_recpetjeink_div_picture">
              <img class="uj_recpetjeink_div_picture_img" id="r2c3" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="uj_recpetjeink_div_title" id="name_r2c3">Példa kaja</div>
            <button class="uj_recpetjeink_div_button">
              <div class="uj_recpetjeink_div_button_text">Megnézem</div>
            </button>
          </div>
          <div class="uj_recpetjeink_div">
            <div class="uj_recpetjeink_div_picture">
              <img class="uj_recpetjeink_div_picture_img" id="r2c4" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="uj_recpetjeink_div_title" id="name_r2c4">Példa kaja</div>
            <button class="uj_recpetjeink_div_button">
              <div class="uj_recpetjeink_div_button_text">Megnézem</div>
            </button>
          </div>
        </div>
      </div>
      <div class="honap_legjobb_div">
        <img class="honap_legjobb_backgroundimage" src="../images/mainPage_Image/honap-legjobb-backgroundimage0.png" />
        <div class="honap_legjobb_title">
          <div class="honap_legjobb_title_text">
            A hónap legjobbnak értékelt receptje!
          </div>
        </div>
        <button class="honap_legjobb_button_div">
          <div class="honap_legjobb_button_text">Megnézem</div>
        </button>
        <div class="honap_legjobb_description">
          <div class="honap_legjobb_description_title">Kóstold meg a Taco varázsát!</div>
          <div class="honap_legjobb_description_div">
            Fedezze fel az igazi mexikói ízeket a taco varázslatos világában!
            Friss, ropogós tortillalapok, ínycsiklandó húsok és friss zöldségek
            várnak arra, hogy megtöltse őket az Ön kedvenc összetevőivel.
            Készüljön fel egy kulináris utazásra, amely garantáltan felkelti
            mindenki figyelmét és étvágyát!
          </div>
        </div>
      </div>
      <div class="kategoria_search">
        <div class=".kategoria_search_title">
          <div class="kategoria_search_title_text">Keressen kategóriánként!</div>
        </div>
        <div class="kategoria_search_div">
          <button><img src="../images/mainPage_Image/buttonleft.svg" class="buttonleft"></button>
          <div class="kategoria_search_div_inner">
            <div class="kategoria_search_div_categorydiv">
              <img class="categorydiv_eclipselayout" src="../images/mainPage_Image/ellipse-30.png" />
              <div class="categorydiv_eclipselayout_title">Burgerek</div>
            </div>
            <div class="kategoria_search_div_categorydiv">
              <img class="categorydiv_eclipselayout" src="../images/mainPage_Image/ellipse-30.png" />
              <div class="categorydiv_eclipselayout_title">Burgerek</div>
            </div>
            <div class="kategoria_search_div_categorydiv">
              <img class="categorydiv_eclipselayout" src="../images/mainPage_Image/ellipse-30.png" />
              <div class="categorydiv_eclipselayout_title">Burgerek</div>
            </div>
            <div class="kategoria_search_div_categorydiv">
              <img class="categorydiv_eclipselayout" src="../images/mainPage_Image/ellipse-30.png" />
              <div class="categorydiv_eclipselayout_title">Burgerek</div>
            </div>
            <div class="kategoria_search_div_categorydiv">
              <img class="categorydiv_eclipselayout" src="../images/mainPage_Image/ellipse-30.png" />
              <div class="categorydiv_eclipselayout_title">Burgerek</div>
            </div>
            <div class="kategoria_search_div_categorydiv">
              <img class="categorydiv_eclipselayout" src="../images/mainPage_Image/ellipse-30.png" />
              <div class="categorydiv_eclipselayout_title">Burgerek</div>
            </div>
          </div>
          <button><img src="../images/mainPage_Image/buttonright.svg" class="buttonright"></button>
        </div>
      </div>
      <div class="signup_newspaper_container">
        <div class="signup_newspaper_container_background"></div>
        <div class="signup_newspaper_div">
          <div class="signup_newspaper_div_title">
            <div class="signup_newspaper_div_title_text">
              Iratkozzon fel hírlevelünkre, hogy nem maradjon le a legújjabb,
            </div>
            <div class="signup_newspaper_div_title_text2">legbefutóbb receptekről!</div>
          </div>
          <div class="signup_newspaper_div_input">
            <form id="newspapersignup_form" action="post">
              <div class="signup_newspaper_div_input_background">
                <button type="button" class="signup_newspaper_div_input_button" onclick="signUpnewspaper()">
                  <div class="signup_newspaper_div_input_button_text">Feliratkozás</div>
                </button>
                <input type="email" class="signup_newspaper_div_input_email" id="newspapersignup_form_email_input"
                  placeholder="Email cím:" required>
              </div>
            </form>
            <div class="thanksmessage_div">
              <div class="thanksmessage">Köszönjük a feliratkozását!</div>
            </div>
          </div>
        </div>
      </div>
      <div class="customersfavorite_etel_galeria">
        <div class="customersfavorite_etel_galeria_title">
          <div class="customersfavorite_etel_galeria_title_text">
            Látogatóink által kedvelt receptek
          </div>
        </div>
        <div class="customersfavorite_etel_galeria_div_container">
          <div class="customersfavorite_etel_galeria_div">
            <div class="customersfavorite_etel_galeria_div_image_container">
              <img class="customersfavorite_etel_galeria_div_image" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="customersfavorite_etel_galeria_div_title">Példa kaja</div>
            <button class="customersfavorite_etel_galeria_div_button_div">
              <div class="customersfavorite_etel_galeria_div_button_text">
                Megnézem
              </div>
            </button>
          </div>
          <div class="customersfavorite_etel_galeria_div">
            <div class="customersfavorite_etel_galeria_div_image_container">
              <img class="customersfavorite_etel_galeria_div_image" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="customersfavorite_etel_galeria_div_title">Példa kaja</div>
            <button class="customersfavorite_etel_galeria_div_button_div">
              <div class="customersfavorite_etel_galeria_div_button_text">
                Megnézem
              </div>
            </button>
          </div>
          <div class="customersfavorite_etel_galeria_div">
            <div class="customersfavorite_etel_galeria_div_image_container">
              <img class="customersfavorite_etel_galeria_div_image" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="customersfavorite_etel_galeria_div_title">Példa kaja</div>
            <button class="customersfavorite_etel_galeria_div_button_div">
              <div class="customersfavorite_etel_galeria_div_button_text">
                Megnézem
              </div>
            </button>
          </div>
          <div class="customersfavorite_etel_galeria_div">
            <div class="customersfavorite_etel_galeria_div_image_container">
              <img class="customersfavorite_etel_galeria_div_image" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="customersfavorite_etel_galeria_div_title">Példa kaja</div>
            <button class="customersfavorite_etel_galeria_div_button_div">
              <div class="customersfavorite_etel_galeria_div_button_text">
                Megnézem
              </div>
            </button>
          </div>
          <div class="customersfavorite_etel_galeria_div">
            <div class="customersfavorite_etel_galeria_div_image_container">
              <img class="customersfavorite_etel_galeria_div_image" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="customersfavorite_etel_galeria_div_title">Példa kaja</div>
            <button class="customersfavorite_etel_galeria_div_button_div">
              <div class="customersfavorite_etel_galeria_div_button_text">
                Megnézem
              </div>
            </button>
          </div>
          <div class="customersfavorite_etel_galeria_div">
            <div class="customersfavorite_etel_galeria_div_image_container">
              <img class="customersfavorite_etel_galeria_div_image" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="customersfavorite_etel_galeria_div_title">Példa kaja</div>
            <button class="customersfavorite_etel_galeria_div_button_div">
              <div class="customersfavorite_etel_galeria_div_button_text">
                Megnézem
              </div>
            </button>
          </div>
          <div class="customersfavorite_etel_galeria_div">
            <div class="customersfavorite_etel_galeria_div_image_container">
              <img class="customersfavorite_etel_galeria_div_image" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="customersfavorite_etel_galeria_div_title">Példa kaja</div>
            <button class="customersfavorite_etel_galeria_div_button_div">
              <div class="customersfavorite_etel_galeria_div_button_text">
                Megnézem
              </div>
            </button>
          </div>
          <div class="customersfavorite_etel_galeria_div">
            <div class="customersfavorite_etel_galeria_div_image_container">
              <img class="customersfavorite_etel_galeria_div_image" src="../images/mainPage_Image/food-10.png" />
            </div>
            <div class="customersfavorite_etel_galeria_div_title">Példa kaja</div>
            <button class="customersfavorite_etel_galeria_div_button_div">
              <div class="customersfavorite_etel_galeria_div_button_text">
                Megnézem
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="feedback_footer">
        <div class="feedback_container">
          <div class="feedback_stye_background">
            <div class="feedback_hearders">
              <span class="feedback_title">Lépjen velünk kapcsolatba !</span>
              <span class="feeback_description">
                Az alábbi mezők kitöltésével kapcsolatba tud lépni velünk.
                <br />
                Bármilyen kérdés merül fel Önben, mi szívesen megválaszoljuk.
              </span>
            </div>
            <form id="mainpage_feedback" action="POST">
              <div class="feedback_main_div">
                <div class="feedback_name">
                  <h1 class="feedback_name_title">Név:</h1>
                  <div class="feedback_name_input_div">
                    <input type="text" class="feedback_name_input" placeholder="Pl.: Példa Tamás" required />
                  </div>
                </div>
                <div class="feedback_email">
                  <h1 class="feedback_email_title">E-mail cím:</h1>
                  <div class="feedback_email_input_div">
                    <input type="email" class="feedback_email_input" placeholder="Pl.: peldatamas@gmail.com" required />
                  </div>
                </div>
                <div class="feedback_message">
                  <h1 class="feedback_message_title">Üzenet:</h1>
                  <div class="feedback_message_input_div">
                    <textarea class="feedback_message_input" placeholder="Írja ide üzenetét..."></textarea>
                  </div>
                </div>
                <div class="feedback_error">Kérjük töltse ki az adatokat!</div>
                <button type="submit" class="feedback_sendbutton">
                  <span class="feedback_sendbutton_text">Küldés</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="footer_container">
          <div class="footer_main_div">
            <div class="footer_column_1">
              <button class="footer_foodhub">FoodHub</button>
              <a class="footer_termsofuse">Felhasználási feltételek</a>
            </div>
            <div class="footer_column_2">
              <button class="footer_email">foodhub@gmail.com</button>
            </div>
            <div class="footer_column_3">
              <img class="footer_logo_pic" src="../images/mainPage_Image/logo-removebg-preview.png" />
            </div>
            <div class="footer_column_4">
              <a href="#"><img class="footer_facebook" src="../images/mainPage_Image/facebook.svg" /></a>
              <a href="#"><img class="footer_twitter" src="../images/mainPage_Image/twitter.svg" /></a>
              <a href="#"><img class="footer_intagram" src="../images/mainPage_Image/instagram.svg" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/mainPage_CSS/style.css');
</style>
