!function(){
  let spacialTasgs=document.querySelectorAll('[data-x]')
  for (let i=0;i<spacialTasgs.length;i++){
    spacialTasgs[i].classList.add('offset')
  }
  yyy()
  window.addEventListener('scroll', function(x){
  yyy()

}
  )
//**************** */
function yyy(){
  let spacialTasgs=document.querySelectorAll('[data-x]')
  let minIndex=0
  for(let i=1;i<spacialTasgs.length;i++){
   if(Math.abs(spacialTasgs[i].offsetTop-window.scrollY)<Math.abs(spacialTasgs[minIndex].offsetTop-window.scrollY))
   {
     minIndex=i
   }
  }
  spacialTasgs[minIndex].classList.remove('offset')
  let id =spacialTasgs[minIndex].id
  let a=document.querySelector('a[href="#'+id+'"]')
  let li=a.parentNode
  let brother=li.parentNode.children
  for (let i=0;i<brother.length;i++){
    brother[i].classList.remove('hlight')
  }
  li.classList.add('hlight')
  }
}.call()
