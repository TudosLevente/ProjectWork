if (window.matchMedia("(min-width: 768px) and (max-width: 992px)").matches) {
    var spanElement = document.querySelector('.websidecookies__websidecookies-description-text span');
    spanElement.innerHTML = 'Ez a weboldal sütiket használ annak érdekében, hogy a legjobb élményt nyújtsa Önnek. <br> A weboldal további böngészésével Ön beleegyezik a sütik használatába🍪!';
  }
  if (window.matchMedia("(min-width: 992px)").matches) {
    var spanElement = document.querySelector('.websidecookies__websidecookies-description-text span');
    spanElement.innerHTML = '<span> Ez a weboldal sütiket használ annak érdekében, hogy a legjobb élményt nyújtsa Önnek. A weboldal további böngészésével Ön beleegyezik a sütik használatába. További információkért kattintson <a href="#">IDE</a></>🍪! </span>';
  }
  if (window.matchMedia("(min-width: 425px) and (max-width: 721px)").matches) {
    var spanElement = document.querySelector('.websidecookies__websidecookies-description-text span');
    spanElement.innerHTML = '<span> Ez a weboldal sütiket használ. <br> További információkért kattintson <a href="#">IDE</a></>🍪! </span>';
  }