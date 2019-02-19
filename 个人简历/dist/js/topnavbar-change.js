"use strict";

!function () {
  var view = document.querySelector('#sitetopnavbar');
  var controller = {
    view: null,
    init: function init(view) {
      this.view = view;
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      var _this = this;

      window.addEventListener('scroll', function (x) {
        if (window.scrollY > 0) {
          _this.active();
        } else {
          _this.remove();
        }
      });
    },
    active: function active() {
      this.view.classList.add('active');
    },
    remove: function remove() {
      this.view.classList.remove('active');
    }
  };
  controller.init(view);
}.call();