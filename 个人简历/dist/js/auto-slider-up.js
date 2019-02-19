"use strict";

!function () {
  var spacialTasgs = document.querySelectorAll('[data-x]');

  for (var i = 0; i < spacialTasgs.length; i++) {
    spacialTasgs[i].classList.add('offset');
  }

  yyy();
  window.addEventListener('scroll', function (x) {
    yyy();
  }); //**************** */

  function yyy() {
    var spacialTasgs = document.querySelectorAll('[data-x]');
    var minIndex = 0;

    for (var _i = 1; _i < spacialTasgs.length; _i++) {
      if (Math.abs(spacialTasgs[_i].offsetTop - window.scrollY) < Math.abs(spacialTasgs[minIndex].offsetTop - window.scrollY)) {
        minIndex = _i;
      }
    }

    spacialTasgs[minIndex].classList.remove('offset');
    var id = spacialTasgs[minIndex].id;
    var a = document.querySelector('a[href="#' + id + '"]');
    var li = a.parentNode;
    var brother = li.parentNode.children;

    for (var _i2 = 0; _i2 < brother.length; _i2++) {
      brother[_i2].classList.remove('hlight');
    }

    li.classList.add('hlight');
  }
}.call();