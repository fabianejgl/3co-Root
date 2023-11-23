var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    centeredSlides: false,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});