"use strict";

!function () {
  var view = document.querySelector('#mySlider');
  var controller = {
    view: null,
    swiperOptions: {
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    },
    init: function init(view) {
      this.view = view, this.initswiper();
    },
    initswiper: function initswiper() {
      this.swiper = new Swiper(view.querySelector('.swiper-container'), this.swiperOptions);
    }
  };
  controller.init(view);
}.call();