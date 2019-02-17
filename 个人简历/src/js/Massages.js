
!function(){
  var model={
    //获取数据
    init:function(){
      var APP_ID = 'cNmI5zJxkods8GT3YBh6efP4-gzGzoHsz';
      var APP_KEY = 'mA7yocdIUunS2MjJCBq5NNv8';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
    fetch:function(){
      var query = new AV.Query('Massages');
      return query.find()
    },
    //保存数据
    save:function(name,massage){
      var TestObject = AV.Object.extend('Massages');
      var testObject = new TestObject();
      var test=testObject.save({
        'name': name,
        'words':massage
      })
      return test
    }

  }

  var view=document.querySelector('.Massages')

  var controller={

    view:null,
    model:null,
    massagesList:null,
    init:function(view,model){

      this.view=view
      this.model=model
      this.Form=view.querySelector('#postMassages')
      this.massagesList=view.querySelector('#messageList')
      this.model.init()
      this.loadMassages()
      this.saveMassages()
    },
    loadMassages:function(){
      this.model.fetch().then((massages)=>
       {
        array=massages.map((item)=>item.attributes)
        array.forEach((item)=>
        {
          let li=document.createElement('li')
          li.innerText=item.name+ ' : '  +item.words
          let massagesList=this.massagesList
          massagesList.append(li)
    
        })
        }, function (error) {
          // 异常处理
        });
    },
    saveMassages:function(){
      var Form=this.Form
      Form.addEventListener('submit',(e)=>{
        e.preventDefault()

        let massage=Form.querySelector('input[name=massage]').value
        let name=Form.querySelector('input[name=name]').value
        this.model.save(name,massage).then((object)=>{
          let li=document.createElement('li')
          li.innerText=object.attributes.name+ ' : '  +object.attributes.words
          let massagesList=document.querySelector('#messageList')
          massagesList.append(li)
    
        })
    
      })
    }
  }
    controller.init(view, model)

  }.call()
