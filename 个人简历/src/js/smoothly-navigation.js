!function(){
  let  view=document.querySelector('nav.menu')

  var controller={
    view:null,
    aTags:null,
    initAnimation:function(){
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);

    },
    init:function(view){
      this.view=view
      this.bindEvents()
      this.initAnimation()
    },
    bindEvents:function(){
      let aTags=this.view.querySelectorAll('nav.menu>ul>li')
      for (let i=0;i<aTags.length;i++){
        aTags[i].onmouseenter=function(x){
          let b=x.currentTarget
          b.classList.add('active')
        }
      
        aTags[i].onmouseleave=function(x){
          let b=x.currentTarget
          b.classList.remove('active')
        }
      }
      let aTag=this.view.querySelectorAll('nav.menu>ul>li>a')
      for(let i=0;i<aTag.length;i++){
        aTag[i].onclick=function(x){
          x.preventDefault()
          let a=x.currentTarget
          let href=a.getAttribute('href')
          let element=document.querySelector(href)
          let top=element.offsetTop
      
          let currentTop=window.scrollY
          let targetTop=top-80
          var coords={ y: currentTop};
          let s=targetTop-currentTop
          var t=Math.abs((s/100)*300)
          if(t>500){
            t=500
          }
          var tween = new TWEEN.Tween(coords)
              .to({  y: targetTop}, t)
            
              .easing(TWEEN.Easing.Quadratic.InOut)
            
              .onUpdate(function(){
               
                window.scrollTo(0,coords.y)
              })
              .start(); 
        }
      }
    }
    }

controller.init(view)
}.call()
