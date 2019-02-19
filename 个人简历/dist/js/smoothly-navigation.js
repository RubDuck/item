"use strict";

!function () {
  var view = document.querySelector('nav.menu');
  var controller = {
    view: null,
    aTags: null,
    initAnimation: function initAnimation() {
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }

      requestAnimationFrame(animate);
    },
    init: function init(view) {
      this.view = view;
      this.bindEvents();
      this.initAnimation();
    },
    bindEvents: function bindEvents() {
      var aTags = this.view.querySelectorAll('nav.menu>ul>li');

      for (var i = 0; i < aTags.length; i++) {
        aTags[i].onmouseenter = function (x) {
          var b = x.currentTarget;
          b.classList.add('active');
        };

        aTags[i].onmouseleave = function (x) {
          var b = x.currentTarget;
          b.classList.remove('active');
        };
      }

      var aTag = this.view.querySelectorAll('nav.menu>ul>li>a');

      for (var _i = 0; _i < aTag.length; _i++) {
        aTag[_i].onclick = function (x) {
          x.preventDefault();
          var a = x.currentTarget;
          var href = a.getAttribute('href');
          var element = document.querySelector(href);
          var top = element.offsetTop;
          var currentTop = window.scrollY;
          var targetTop = top - 80;
          var coords = {
            y: currentTop
          };
          var s = targetTop - currentTop;
          var t = Math.abs(s / 100 * 300);

          if (t > 500) {
            t = 500;
          }

          var tween = new TWEEN.Tween(coords).to({
            y: targetTop
          }, t).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
            window.scrollTo(0, coords.y);
          }).start();
        };
      }
    }
  };
  controller.init(view);
}.call();