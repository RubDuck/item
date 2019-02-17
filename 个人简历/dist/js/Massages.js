"use strict";

!function () {
  var model = {
    //获取数据
    init: function init() {
      var APP_ID = 'cNmI5zJxkods8GT3YBh6efP4-gzGzoHsz';
      var APP_KEY = 'mA7yocdIUunS2MjJCBq5NNv8';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
    fetch: function fetch() {
      var query = new AV.Query('Massages');
      return query.find();
    },
    //保存数据
    save: function save(name, massage) {
      var TestObject = AV.Object.extend('Massages');
      var testObject = new TestObject();
      var test = testObject.save({
        'name': name,
        'words': massage
      });
      return test;
    }
  };
  var view = document.querySelector('.Massages');
  var controller = {
    view: null,
    model: null,
    massagesList: null,
    init: function init(view, model) {
      this.view = view;
      this.model = model;
      this.Form = view.querySelector('#postMassages');
      this.massagesList = view.querySelector('#messageList');
      this.model.init();
      this.loadMassages();
      this.saveMassages();
    },
    loadMassages: function loadMassages() {
      var _this = this;

      this.model.fetch().then(function (massages) {
        array = massages.map(function (item) {
          return item.attributes;
        });
        array.forEach(function (item) {
          var li = document.createElement('li');
          li.innerText = item.name + ' : ' + item.words;
          var massagesList = _this.massagesList;
          massagesList.append(li);
        });
      }, function (error) {// 异常处理
      });
    },
    saveMassages: function saveMassages() {
      var _this2 = this;

      var Form = this.Form;
      Form.addEventListener('submit', function (e) {
        e.preventDefault();
        var massage = Form.querySelector('input[name=massage]').value;
        var name = Form.querySelector('input[name=name]').value;

        _this2.model.save(name, massage).then(function (object) {
          var li = document.createElement('li');
          li.innerText = object.attributes.name + ' : ' + object.attributes.words;
          var massagesList = document.querySelector('#messageList');
          massagesList.append(li);
        });
      });
    }
  };
  controller.init(view, model);
}.call();