describe('Főoldal tesztelés', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
  });
  it('Ellenőrzi az URL-t', () => {
    cy.visit('http://localhost:8000/')
  });
  it('Ellenőrzi a CSS fájlok betöltését', () => {
    const cssFiles = [
      '../css/mainPage_CSS/responsive.css',
      '../css/mainPage_CSS/navbar.css',
      '../css/mainPage_CSS/dropdowndesszert.css',
      '../css/mainPage_CSS/dropdownkategoriak.css',
      '../css/mainPage_CSS/dropdownfoetel.css',
      '../css/mainPage_CSS/style.css',
      '../css/mainPage_CSS/vars.css',
      '../css/mainPage_CSS/scrollbar.css',
      '../css/mainPage_CSS/loadingscreen.css',
      '../css/mainPage_CSS/websidecookies.css',
      '../css/mainPage_CSS/footer.css',
      '../css/mainPage_CSS/ajanlatainkSlider.css'
    ];

    cssFiles.forEach(cssFile => {
      cy.request(cssFile).then(response => {
        expect(response.status).to.eq(200);
      });
    });
  });
  it('Ellenőrzi a navigációs szakasz betöltését', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('Ellenőrzi a háttérkép betöltését', () => {
    cy.get('.background_image').should('be.visible')
    cy.get('.background_image').should('have.attr', 'src')
      .and('include', '../images/mainPage_Image/backgorund-image0.png');
  });
  it('Ellenőrzi a cím szakasz szerkezetét', () => {
    cy.get('.title').should('be.visible').within(() => {
      cy.get('.title_foodhub').should('contain', 'FoodHub');
      cy.get('.title_slogen').should('contain', 'Egy harapásra vagy a boldogságtól!');
    });
  });
  it('Ellenőrzi a "Ajanlataink" szakasz szerkezetét', () => {
    cy.get('.ajanlataink').should('be.visible').within(() => {
      cy.get('.ajanlat_title').should('contain', 'Legfelkeresetebb receptjeink');
      cy.get('.slideshow-container').should('exist');
      cy.get('.ajanlat_container').should('exist');
      cy.get('.ajanlat_container_div').should('have.length.greaterThan', 0);
    });
  });
  it('Ellenőrzi a "Új Receptjeink" szakasz szerkezetét', () => {
    cy.get('.uj_recpetjeink_etel_galeria').should('be.visible').within(() => {
      cy.get('.uj_recpetjeink_title').should('contain', 'Új Recepjeink');
      cy.get('.uj_recpetjeink_div_container').should('exist');
      cy.get('.uj_recpetjeink_div').should('have.length.greaterThan', 0);
      cy.get('.uj_recpetjeink_div_picture_img').should('have.length.greaterThan', 0);
      cy.get('.uj_recpetjeink_div_title').should('have.length.greaterThan', 0);
      cy.get('.uj_recpetjeink_div_button').should('have.length.greaterThan', 0);
    });
  });
  it('Ellenőrzi a "Hónap Legjobb" szakasz szerkezetét', () => {
    cy.get('.honap_legjobb_div').should('be.visible').within(() => {
      cy.get('.honap_legjobb_backgroundimage').should('exist');
      cy.get('.honap_legjobb_title_text').should('contain', 'A hónap legjobbnak értékelt receptje!');
      cy.get('.honap_legjobb_button_text').should('contain', 'Megnézem');
      cy.get('.honap_legjobb_description_title').should('contain', 'Kóstold meg a Taco varázsát!');
      cy.get('.honap_legjobb_description_div').should('contain', 'Fedezze fel az igazi mexikói ízeket');
    });
  });
  it('Ellenőrzi a "Kategória Keresés" szakasz szerkezetét', () => {
    cy.get('.kategoria_search').should('be.visible').within(() => {
      cy.get('.kategoria_search_title_text').should('contain', 'Keressen kategóriánként!');
      cy.get('.kategoria_search_div').should('exist');

      cy.get('.carousel-control-prev').should('exist');
      cy.get('.carousel-control-next').should('exist');

      cy.get('.carousel-item').should('have.length', 4);

      cy.get('.carousel-item').each(($item, index) => {
        cy.wrap($item).find('.kategoria_search_div_inner').should('exist');
        cy.wrap($item).find('.kategoria_search_div_categorydiv').should('exist');
        cy.wrap($item).find('.categorydiv_eclipselayout_title').should('exist');
      });
    });
  });
  it('Ellenőrzi a "Sign up for Newsletter" szakasz szerkezetét', () => {
    cy.get('.signup_newspaper_container').should('be.visible').within(() => {
      cy.get('.signup_newspaper_div_title_text').should('contain', 'Iratkozzon fel hírlevelünkre, hogy nem maradjon le a legújjabb,');
      cy.get('.signup_newspaper_div_title_text2').should('contain', 'legbefutóbb receptekről!');

      cy.get('.signup_newspaper_div_input_button_text').should('contain', 'Feliratkozás');
      cy.get('.signup_newspaper_div_input_email').should('be.visible').and('have.attr', 'placeholder', 'Email cím:');

      cy.get('.signup_newspaper_div_input_button').should('be.visible').and('have.attr', 'type', 'button');
    });
  });
  it(' Ellenőrzi a "Customer Favorite Recept" szakasz szerkezetét', () => {
    cy.get('.customersfavorite_etel_galeria').should('be.visible').within(() => {
      cy.get('.customersfavorite_etel_galeria_title_text').should('contain', 'Látogatóink által kedvelt receptek');
      cy.get('.customersfavorite_etel_galeria_div_container').should('exist');
      cy.get('.customersfavorite_etel_galeria_div').should('have.length.greaterThan', 0);
      cy.get('.customersfavorite_etel_galeria_div_image_container').should('exist');
      cy.get('.customersfavorite_etel_galeria_div_image').should('have.length.greaterThan', 0);
      cy.get('.customersfavorite_etel_galeria_div_title').should('have.length.greaterThan', 0);
      cy.get('.customersfavorite_etel_galeria_div_button_div').should('have.length.greaterThan', 0);
    });
  });
  it(' Ellenőrzi a "Feedback" szakasz szerkezetét', () => {
    cy.get('.feedback_footer').should('be.visible').within(() => {
      cy.get('.feedback_container').should('exist');
      cy.get('.feedback_stye_background').should('exist');
      cy.get('.feedback_hearders').should('exist');
      cy.get('.feedback_title').should('contain', 'Lépjen velünk kapcsolatba !');
      cy.get('.feeback_description').should('contain', 'Az alábbi mezők kitöltésével kapcsolatba tud lépni velünk.');
      cy.get('.feedback_main_div').should('exist');
      cy.get('.feedback_name_input').should('be.visible').and('have.attr', 'placeholder', 'Pl.: FoodHub');
      cy.get('.feedback_email_input').should('be.visible').and('have.attr', 'placeholder', 'Pl.: foodhub@gmail.com');
      cy.get('.feedback_message_input').should('be.visible').and('have.attr', 'placeholder', 'Írja ide üzenetét...');
      cy.get('.feedback_sendbutton').should('be.visible').and('have.attr', 'type', 'button');
      cy.get('.feedback_error').should('contain', 'Kérjük töltse ki az adatokat!');
    });
  });
  it('Ellenőrzi a "Footer" szakasz szerkezetét', () => {
    cy.get('.footer_container').should('be.visible').within(() => {
      cy.get('.footer_main_div').should('exist');
      cy.get('.footer_column_1').should('exist');
      cy.get('.footer_foodhub').should('contain', 'FoodHub');
      cy.get('.footer_termsofuse').should('contain', 'Felhasználási feltételek');
      cy.get('.footer_email').should('contain', 'foodhub@gmail.com');
      cy.get('.footer_logo_pic').should('exist');
      cy.get('.footer_facebook')
        .should('have.attr', 'src')
        .and('include', '../images/mainPage_Image/facebook.svg');
      cy.get('.footer_twitter')
        .should('have.attr', 'src')
        .and('include', '../images/mainPage_Image/twitter.svg');
      cy.get('.footer_intagram')
        .should('have.attr', 'src')
        .and('include', '../images/mainPage_Image/instagram.svg');
    });
  });
});

describe('Reszponzivitás tesztelés', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
  });

  it('Ellenőrzi a reszponzivitás betöltését (1200 x 800)', () => {
    cy.viewport(1200, 800);
    cy.get('.websidecookies').should('have.css', 'zoom', '0.9');
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-left').then(paddingLeft => {
      const paddingLeftNumber = parseFloat(paddingLeft);
      expect(paddingLeftNumber).to.be.within(130, 140);
    });
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-right').then(paddingRight => {
      const paddingRightNumber = parseFloat(paddingRight);
      expect(paddingRightNumber).to.be.within(220, 225);
    });
    cy.get('.hamburgermenudropdown_content').should('not.be.visible');
    cy.get('#hamburgermenudropdownicon').should('have.css', 'pointer-events', 'none');
  });

  it(' Ellenőrzi a reszponzivitás betöltését (992 x 800)', () => {
    cy.viewport(992, 800);
    cy.get('.carousel-inner').should('have.css', 'width').then(width => {
      const widthNumber = parseFloat(width);
      expect(widthNumber).to.be.within(1600, 1700);
    });;
    cy.get('.carousel-inner').should('have.css', 'margin-left', '30px');
    cy.get('.carousel-inner').should('have.css', 'margin-right', '30px');
    cy.get('.buttonleft, .buttonright').should('have.css', 'bottom', '45px');
    cy.get('.websidecookies').should('have.css', 'zoom', '0.7');
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-left').then(paddingLeft => {
      const paddingLeftNumber = parseFloat(paddingLeft);
      expect(paddingLeftNumber).to.be.within(40, 50);
    });
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-right').then(paddingRight => {
      const paddingRightNumber = parseFloat(paddingRight);
      expect(paddingRightNumber).to.be.within(60, 70);
    });
    cy.get('.uj_recpetjeink_etel_galeria, .customersfavorite_etel_galeria, .signup_newspaper_container, .ajanlataink, .honap_legjobb_div, .feedback_footer').should('have.css', 'zoom', '0.6');
    cy.get('.title').should('have.css', 'top', '500px');
    cy.get('.hamburgermenudropdown_content').should('not.be.visible');
    cy.get('#hamburgermenudropdownicon').click({ force: true });
    cy.get('.rotate-icon').should('have.css', 'transform', 'matrix(0, 1, -1, 0, 0, 0)');
    cy.get('#hamburgermenudropdownicon').should('have.css', 'pointer-events', 'auto');
  });

  it('Ellenőrzi a reszponzivitás betöltését (800 x 800)', () => {
    cy.viewport(800, 800);
    cy.get('.kategoria_search_div_inner').should('have.css', 'gap', '30px');
    cy.get('.carousel-inner').should('have.css', 'width').then(width => {
      const widthNumber = parseFloat(width);
      expect(widthNumber).to.be.within(1600, 1700);
    });;
    cy.get('.carousel-inner').should('have.css', 'margin-left', '30px');
    cy.get('.carousel-inner').should('have.css', 'margin-right', '30px');
    cy.get('.buttonleft, .buttonright').should('have.css', 'bottom', '45px');
    cy.get('.websidecookies').should('have.css', 'zoom', '0.7');
    cy.get('.websidecookies').should('have.css', 'background-position', '-170px 50%');
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-left').then(paddingLeft => {
      const paddingLeftNumber = parseFloat(paddingLeft);
      expect(paddingLeftNumber).to.be.within(33, 34);
    });
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-right').then(paddingRight => {
      const paddingRightNumber = parseFloat(paddingRight);
      expect(paddingRightNumber).to.be.within(50, 60);
    });
    cy.get('.websidecookies__websidecookies-description-text').should('have.css', 'left', '0px');
    cy.get('.uj_recpetjeink_etel_galeria, .customersfavorite_etel_galeria, .signup_newspaper_container, .ajanlataink, .honap_legjobb_div, .feedback_footer, .kategoria_search').should('have.css', 'zoom', '0.6');
    cy.get('.title').should('have.css', 'zoom', '0.6');
    cy.get('.title').should('have.css', 'top', '500px');
    cy.get('.login-div').should('not.be.visible');
    cy.get('.hamburgermenudropdown .usersvg').invoke('width').should('be.gte', 68).and('be.lte', 72);
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'left', '50px');
    cy.get('.hamburgermenudropdown .usersvg').invoke('width').then(width => {
      const widthNumber = parseFloat(width);
      expect(widthNumber).to.be.within(65, 75);
    });
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'filter', 'brightness(0) invert(1)');
    cy.get('.hamburgermenudropdown .dropdown_content_profil_hamburgermenu').should('not.be.visible');
    cy.get('.hamburgermenudropdown .dropdown_content_foetel_hamburgermenu').should('not.be.visible');
    cy.get('.hamburgermenudropdown .dropdown_content_desszertek_hamburgermenu').should('not.be.visible');
    cy.get('.navbarlogo').invoke('width').then(width => {
      const widthNumber = parseFloat(width);
      expect(widthNumber).to.be.within(180, 320);
    }); 
    cy.get('.navbar_foobhub_logo_text').should('not.be.visible');
    cy.get('.navbar-nav').should('have.css', 'flex-direction', 'row');
    cy.get('.navbar-nav').should('have.css', 'display', 'flex');
    cy.get('.navbar-nav').should('have.css', 'gap', '10px');
  });

  it('Ellenőrzi a reszponzivitás betöltését (750 x 800)', () => {
    cy.viewport(750, 800);
    cy.get('body').should('have.css', 'overflow-x', 'hidden');
    cy.get('.kategoria_search_div_inner').should('have.css', 'gap', '30px');
    cy.get('.carousel-inner').should('have.css', 'width').then(width => {
      const widthNumber = parseFloat(width);
      expect(widthNumber).to.be.within(1600, 1700);
    });;
    cy.get('.carousel-inner').should('have.css', 'margin-left', '30px');
    cy.get('.carousel-inner').should('have.css', 'margin-right', '30px');
    cy.get('.buttonleft, .buttonright').should('have.css', 'bottom', '45px');
    cy.get('.websidecookies').should('have.css', 'zoom', '0.7');
    cy.get('.websidecookies').should('have.css', 'background-position', '-120px 50%');
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-left').then(paddingLeft => {
      const paddingLeftNumber = parseFloat(paddingLeft);
      expect(paddingLeftNumber).to.be.within(83, 84);
    });
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-right').then(paddingRight => {
      const paddingRightNumber = parseFloat(paddingRight);
      expect(paddingRightNumber).to.be.within(52, 53);
    });
    cy.get('.websidecookies__websidecookies-description-text').should('have.css', 'left', '0px');
    cy.get('.websidecookies__websidecookies-description-text').should('have.css', 'justify-content', 'flex-start');
    cy.get('.uj_recpetjeink_etel_galeria, .customersfavorite_etel_galeria, .signup_newspaper_container, .ajanlataink, .honap_legjobb_div, .feedback_footer, .kategoria_search').should('have.css', 'zoom', '0.7');
    cy.get('.title').should('have.css', 'top', '400px');
    cy.get('.title').should('have.css', 'zoom', '0.7');
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'left', '50px');
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'width').then(width => {
      const widthNumber = parseFloat(width);
      expect(widthNumber).to.be.within(65, 75);
    });
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'filter', 'brightness(0) invert(1)');
    cy.get('.dropdown_content_profil_hamburgermenu').should('not.be.visible');
    cy.get('.dropdown_content_foetel_hamburgermenu').should('not.be.visible');
    cy.get('.dropdown_content_desszertek_hamburgermenu').should('not.be.visible');
    cy.get('.dropdown_content_kategoriak').should('have.css', 'display', 'none');
    cy.get('.navbar_layout').should('have.css', 'flex-direction', 'row');
    cy.get('.navbar_layout').should('have.css', 'display', 'flex');
    cy.get('.navbar_layout').should('have.css', 'justify-content', 'space-between');
    cy.get('.navbar_layout').should('have.css', 'align-content', 'center');
    cy.get('.navbar_layout').should('have.css', 'align-items', 'center');
    cy.get('.navbar_profil_login').should('have.css', 'width').then(width => {
      const widthNumber = parseFloat(width);
      expect(widthNumber).to.be.within(40, 50);
    });
    cy.get('.justify-content-end').should('have.css', 'justify-content', 'flex-end');
    cy.get('.navbar_middle').should('have.css', 'width').then(width => {
      const widthNumber = parseFloat(width);
      expect(widthNumber).to.be.within(600, 700);
    });
    cy.get('.navbarlogo').should('have.css', 'width').then(width => {
      const widthNumber = parseFloat(width);
      expect(widthNumber).to.be.within(100, 200);
    });
    cy.get('.navbar_foobhub_logo_text').should('not.be.visible');
    cy.get('.navbar-nav').should('have.css', 'flex-direction', 'row');
    cy.get('.navbar-nav').should('have.css', 'display', 'flex');
    cy.get('.navbar-nav').should('have.css', 'gap', '10px');
  });

  it('ellenőrzi a reszponzivitás betöltését (500 x 800)', () => {
    cy.viewport(500, 800);
    cy.get('body').should('have.css', 'overflow-x', 'hidden');
    cy.get('.kategoria_search').should('have.css', 'display', 'none');
    cy.get('.honap_legjobb_div .honap_legjobb_title').should('have.css', 'zoom', '0.7');
    cy.get('.honap_legjobb_div .honap_legjobb_description').should('have.css', 'zoom', '0.9');
    cy.get('.honap_legjobb_div .honap_legjobb_button_div').should('have.css', 'zoom', '0.8');
    cy.get('.honap_legjobb_div .honap_legjobb_button_div').should('have.css', 'left', '1640px');
    cy.get('.honap_legjobb_div .honap_legjobb_button_div').should('have.css', 'top', '1060px');
    cy.get('.fooldal').should('have.css', 'gap', '50px');
    cy.get('.kategoria_search_div_inner').should('have.css', 'gap', '30px');
    cy.get('.carousel-inner').should('have.css', 'width', '1700px');
    cy.get('.carousel-inner').should('have.css', 'margin-left', '30px');
    cy.get('.carousel-inner').should('have.css', 'margin-right', '30px');
    cy.get('.buttonleft, .buttonright').should('have.css', 'bottom', '45px');
    cy.get('.uj_recpetjeink_etel_galeria, .customersfavorite_etel_galeria, .signup_newspaper_container, .ajanlataink, .honap_legjobb_div, .feedback_footer, .kategoria_search').should('have.css', 'zoom', '0.5');
    cy.get('.title').should('have.css', 'top', '400px');
    cy.get('.title').should('have.css', 'zoom', '0.5');
    cy.get('.websidecookies').should('have.css', 'zoom', '0.7');
    cy.get('.websidecookies').should('have.css', 'background-position', '-150px 50%');
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-left').then(paddingLeft => {
      const paddingLeftNumber = parseFloat(paddingLeft);
      expect(paddingLeftNumber).to.be.within(50, 60);
    });
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-right').then(paddingRight => {
      const paddingRightNumber = parseFloat(paddingRight);
      expect(paddingRightNumber).to.be.within(34, 35);
    });
    cy.get('.websidecookies__websidecookies-description-text').should('have.css', 'left', '0px');
    cy.get('.websidecookies__websidecookies-description-text').should('have.css', 'justify-content', 'flex-start');
    cy.get('.login_div').should('have.css', 'display', 'none');
    cy.get('.navbar_searchbar').should('have.css', 'font-size', '20px');
    cy.get('.menuitems_row').should('have.css', 'font-size', '25px');
    cy.get('.dropdown_foetel, .dropdown_desszert, .dropdown_kategoriak, #navRecipeLink_navbar5_navitem, #navRecipeLink_navbar4_navitem, #navRecipeLink_navbar6_navitem, #navRecipeLink_ajánlatunk').should('have.css', 'display', 'none');
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'left', '50px');
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'width').then(width => {
      const widthNumber = parseFloat(width);
      expect(widthNumber).to.be.within(65, 75);
    });
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'filter', 'brightness(0) invert(1)');
    cy.get('.dropdown_content_profil_hamburgermenu').should('have.css', 'display', 'none');
    cy.get('.dropdown_content_foetel_hamburgermenu').should('have.css', 'display', 'none');
    cy.get('.dropdown_content_desszertek_hamburgermenu').should('have.css', 'display', 'none');
  });

  it('Ellenőrzi a reszponzivitás betöltését (400 x 800)', () => {
    cy.viewport(400, 800);
    cy.get('body').should('have.css', 'overflow-x', 'hidden');
    cy.get('.kategoria_search').should('have.css', 'display', 'none');
    cy.get('.honap_legjobb_div .honap_legjobb_title').should('have.css', 'zoom', '0.9');
    cy.get('.honap_legjobb_div .honap_legjobb_description').should('have.css', 'zoom', '0.9');
    cy.get('.honap_legjobb_div .honap_legjobb_button_div').should('have.css', 'left', '1360px');
    cy.get('.honap_legjobb_div .honap_legjobb_button_div').should('have.css', 'top', '860px');
    cy.get('.fooldal').should('have.css', 'gap', '50px');
    cy.get('.kategoria_search_div_inner').should('have.css', 'gap', '30px');
    cy.get('.carousel-inner').should('have.css', 'width', '1700px');
    cy.get('.carousel-inner').should('have.css', 'margin-left', '30px');
    cy.get('.carousel-inner').should('have.css', 'margin-right', '30px');
    cy.get('.buttonleft, .buttonright').should('have.css', 'bottom', '45px');
    cy.get('.uj_recpetjeink_etel_galeria, .customersfavorite_etel_galeria, .ajanlataink, .honap_legjobb_div, .feedback_footer, .kategoria_search').should('have.css', 'zoom', '0.4');
    cy.get('.signup_newspaper_container, .feedback_footer, .footer_container').should('have.css', 'zoom', '0.5');
    cy.get('.title').should('have.css', 'top', '500px');
    cy.get('.title').should('have.css', 'zoom', '0.4');
    cy.get('.websidecookies').should('have.css', 'zoom', '0.7');
    cy.get('.websidecookies').should('have.css', 'background-position', '-150px 50%');
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-left').then(paddingLeft => {
      const paddingLeftNumber = parseFloat(paddingLeft);
      expect(paddingLeftNumber).to.be.within(43, 44);
    });
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-right').then(paddingRight => {
      const paddingRightNumber = parseFloat(paddingRight);
      expect(paddingRightNumber).to.be.within(27, 28);
    });
    cy.get('.websidecookies__websidecookies-description-text').should('have.css', 'left', '0px');
    cy.get('.websidecookies__websidecookies-description-text').should('have.css', 'justify-content', 'flex-start');
    cy.get('.login_div').should('have.css', 'display', 'none');
    cy.get('.navbar_searchbar').should('have.css', 'font-size', '20px');
    cy.get('.menuitems_row').should('have.css', 'font-size', '25px');
    cy.get('.dropdown_foetel, .dropdown_desszert, .dropdown_kategoriak, #navRecipeLink_navbar5_navitem, #navRecipeLink_navbar4_navitem, #navRecipeLink_navbar6_navitem, #navRecipeLink_ajánlatunk').should('have.css', 'display', 'none');
    cy.get('.dropdown_content_kategoriak').should('have.css', 'display', 'none');
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'left', '50px');
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'width').then(width => {
      const widthNumber = parseFloat(width);
      expect(widthNumber).to.be.within(65, 75);
    });
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'filter', 'brightness(0) invert(1)');
    cy.get('.dropdown_content_profil_hamburgermenu').should('have.css', 'display', 'none');
    cy.get('.dropdown_content_foetel_hamburgermenu').should('have.css', 'display', 'none');
    cy.get('.dropdown_content_desszertek_hamburgermenu').should('have.css', 'display', 'none');
  });

  it(' Ellenőrzi a reszponzivitás betöltését (350 x 600)', () => {
    cy.viewport(350, 600);
    cy.get('body').should('have.css', 'overflow-x', 'hidden');
    cy.get('.kategoria_search').should('have.css', 'display', 'none');
    cy.get('.honap_legjobb_div .honap_legjobb_title').should('have.css', 'zoom', '0.9');
    cy.get('.honap_legjobb_div .honap_legjobb_description').should('have.css', 'zoom', '0.9');
    cy.get('.honap_legjobb_div .honap_legjobb_button_div').should('have.css', 'left', '1360px');
    cy.get('.honap_legjobb_div .honap_legjobb_button_div').should('have.css', 'top', '860px');
    cy.get('.fooldal').should('have.css', 'gap', '50px');
    cy.get('.kategoria_search_div_inner').should('have.css', 'gap', '30px');
    cy.get('.carousel-inner').should('have.css', 'width', '1700px');
    cy.get('.carousel-inner').should('have.css', 'margin-left', '30px');
    cy.get('.carousel-inner').should('have.css', 'margin-right', '30px');
    cy.get('.buttonleft, .buttonright').should('have.css', 'bottom', '45px');
    cy.get('.uj_recpetjeink_etel_galeria, .customersfavorite_etel_galeria, .ajanlataink, .honap_legjobb_div, .feedback_footer, .kategoria_search').should('have.css', 'zoom', '0.4');
    cy.get('.signup_newspaper_container, .feedback_footer, .footer_container').should('have.css', 'zoom', '0.5');
    cy.get('.title').should('have.css', 'top', '400px');
    cy.get('.title').should('have.css', 'zoom', '0.4');
    cy.get('.websidecookies').should('have.css', 'zoom', '0.7');
    cy.get('.websidecookies').should('have.css', 'background-position', '-150px 50%');
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-left').then(paddingLeft => {
      const paddingLeftNumber = parseFloat(paddingLeft);
      expect(paddingLeftNumber).to.be.within(35, 40);
    });
    cy.get('.websidecookies__websidecookies-layout').should('have.css', 'padding-right').then(paddingRight => {
      const paddingRightNumber = parseFloat(paddingRight);
      expect(paddingRightNumber).to.be.within(20, 25);
    });
    cy.get('.websidecookies__websidecookies-description-text').should('have.css', 'left', '0px');
    cy.get('.websidecookies__websidecookies-description-text').should('have.css', 'justify-content', 'flex-start');
    cy.get('.login_div').should('have.css', 'display', 'none');
    cy.get('#search-results-container').should('have.css', 'font-size', '25px');
    cy.get('.navbar_searchbar').should('have.css', 'font-size', '25px');
    cy.get('.menuitems_row').should('have.css', 'font-size', '25px');
    cy.get('.dropdown_foetel, .dropdown_desszert, .dropdown_kategoriak, #navRecipeLink_navbar5_navitem, #navRecipeLink_navbar4_navitem, #navRecipeLink_navbar6_navitem, #navRecipeLink_ajánlatunk').should('have.css', 'display', 'none');
    cy.get('.dropdown_content_kategoriak').should('have.css', 'display', 'none');
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'left', '50px');
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'width').then(width => {
      const widthNumber = parseFloat(width);
      expect(widthNumber).to.be.within(65, 75);
    });
    cy.get('.hamburgermenudropdown .usersvg').should('have.css', 'filter', 'brightness(0) invert(1)');
    cy.get('.dropdown_content_profil_hamburgermenu').should('have.css', 'display', 'none');
    cy.get('.dropdown_content_foetel_hamburgermenu').should('have.css', 'display', 'none');
    cy.get('.dropdown_content_desszertek_hamburgermenu').should('have.css', 'display', 'none');
  });
});