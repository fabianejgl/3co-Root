if(window.screen.width <= 640 ) {
    var swiper2 = new Swiper(".mySwiperSM", {
      slidesPerView: 1,
      centeredSlides: false,
      spaceBetween: 50,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }else{
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      centeredSlides: false,
      spaceBetween: 30,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }