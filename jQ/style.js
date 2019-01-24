var allbuttons=$('.button>span')
for (let i=0;i<allbuttons.length;i++){
  $(allbuttons[i]).on('click',function(x){
   var index=$(x.currentTarget).index()
    s=index*-500
    $('.images').css({
      transform:'translate('+s+'px)'
    })
    
  })
}