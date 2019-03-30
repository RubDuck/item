var yyy=document.getElementById('canvas')
var context=yyy.getContext('2d')
var linewidth=4
// function creatarc(x,y){
//     context.fillStyle='red'
//     context.beginPath()
//     context.arc(x,y,3,0,360)
//     context.fill()
// }
var useerase=false
erase.onclick=function(){
    useerase=true
    erase.classList.add('active')
    brush.classList.remove('active')
}
brush.onclick=function(){
    useerase=false
    brush.classList.add('active')
    erase.classList.remove('active')
}
black.onclick=function(){
    context.strokeStyle='black'
    black.classList.add('actives')
    yellow.classList.remove('actives')
    blue.classList.remove('actives')
    red.classList.remove('actives')
    orange.classList.remove('actives')
    pink.classList.remove('actives')
    purple.classList.remove('actives')
}
red.onclick=function(){
    context.strokeStyle='red'
    red.classList.add('actives')
    yellow.classList.remove('actives')
    blue.classList.remove('actives')
    black.classList.remove('actives')
    orange.classList.remove('actives')
    pink.classList.remove('actives')
    purple.classList.remove('actives')
}
yellow.onclick=function(){
    context.strokeStyle='yellow'
    yellow.classList.add('actives')
    red.classList.remove('actives')
    blue.classList.remove('actives')
    black.classList.remove('actives')
    orange.classList.remove('actives')
    pink.classList.remove('actives')
    purple.classList.remove('actives')
}

blue.onclick=function(){
    context.strokeStyle='blue'
    blue.classList.add('actives')
    red.classList.remove('actives')
    yellow.classList.remove('actives')
    black.classList.remove('actives')
    orange.classList.remove('actives')
    pink.classList.remove('actives')
    purple.classList.remove('actives')
}
orange.onclick=function(){
    context.strokeStyle='#FF7B00'
    orange.classList.add('actives')
    red.classList.remove('actives')
    blue.classList.remove('actives')
    black.classList.remove('actives')
    yellow.classList.remove('actives')
    pink.classList.remove('actives')
    purple.classList.remove('actives')
}
pink.onclick=function(){
    context.strokeStyle='#FF00FF'
    pink.classList.add('actives')
    red.classList.remove('actives')
    blue.classList.remove('actives')
    black.classList.remove('actives')
    orange.classList.remove('actives')
    yellow.classList.remove('actives')
    purple.classList.remove('actives')
}
purple.onclick=function(){
    context.strokeStyle='#7F00FF'
    purple.classList.add('actives')
    red.classList.remove('actives')
    blue.classList.remove('actives')
    black.classList.remove('actives')
    orange.classList.remove('actives')
    pink.classList.remove('actives')
    yellow.classList.remove('actives')
}
thin.onclick=function(){
    linewidth=3
    thin.classList.add('active')
    two.classList.remove('active')
    three.classList.remove('active')
    four.classList.remove('active')
    thick.classList.remove('active')
}
two.onclick=function(){
    linewidth=5
    two.classList.add('active')
    thin.classList.remove('active')
    three.classList.remove('active')
    four.classList.remove('active')
    thick.classList.remove('active')
}
three.onclick=function(){
     linewidth=7
     three.classList.add('active')
     two.classList.remove('active')
     thin.classList.remove('active')
     four.classList.remove('active')
     thick.classList.remove('active')
}
four.onclick=function(){
    linewidth=9
    four.classList.add('active')
    two.classList.remove('active')
    three.classList.remove('active')
    thin.classList.remove('active')
    thick.classList.remove('active')
}

thick.onclick=function(){
     linewidth=11
     thick.classList.add('active')
     two.classList.remove('active')
     three.classList.remove('active')
     four.classList.remove('active')
     thin.classList.remove('active')
}
del.onclick=function(){
    context.clearRect(0,0,document.documentElement.clientWidth,document.documentElement.clientHeight)
}
download.onclick=function(){
    url=yyy.toDataURL('image/png')
    a=document.createElement('a')
    a.href=url
    yyy.appendChild(a)
    a.download='我的画板'
    a.click()

}

setcavassize(yyy)
listenTomouse()



function setcavassize(yyy){
    var pageWidth=document.documentElement.clientWidth
    var pageheight=document.documentElement.clientHeight
    yyy.width=pageWidth
    yyy.height=pageheight

}
function listenTomouse(){
    var useing=false
    var lastpoint={"x":undefined,"y":undefined}
    if ('ontouchstart' in document.body !=true)
    {
        document.onmousedown=function(xx){
        var x=xx.clientX
        var y=xx.clientY
        useing=true
        if(useerase){
            context.clearRect(x,y,20,20)
        }
        else{
            lastpoint.x=x
            lastpoint.y=y
            }
        }
        document.onmousemove=function(yy){
            var x=yy.clientX
            var y=yy.clientY
            if (!useing){
                return
            }
            else{
            if(useerase){
            context.clearRect(x-5,y-5,10,10)  
            }
            else{
            var newpoint={"x":x,"y":y}
            creatline(lastpoint.x,lastpoint.y,newpoint.x,newpoint.y)
            lastpoint=newpoint
                } 
            }    
                
        }
    
        document.onmouseup=function(z){
            useing=false
        }

    }
    else{
        document.ontouchstart=function(xx){
            var x=xx.touches[0].clientX
            var y=xx.touches[0].clientY
            useing=true
            if(useerase){
                context.clearRect(x,y,10,10)
            }
            else{
                lastpoint.x=x
                lastpoint.y=y
                }
            }

            document.ontouchmove=function(yy){
                var x=yy.touches[0].clientX
                var y=yy.touches[0].clientY
                if (!useing){
                    return
                }
                else{
                if(useerase){
                context.clearRect(x-5,y-5,10,10)  
                }
                else{
                var newpoint={"x":x,"y":y}
                creatline(lastpoint.x,lastpoint.y,newpoint.x,newpoint.y)
                lastpoint=newpoint
                    } 
                }    
                    
            }
        
            document.ontouchend=function(z){
                useing=false
            }
        }
    
   

}



function creatline(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineWidth=linewidth
    context.lineTo(x2,y2)
    context.stroke()
}





































































//div画圆--缺点是不连续的线条

// var div= document.getElementById('canvas')
// var paint=false
// document.onmousedown=function(xx){
//     paint=true
//     var x=xx.clientX
//     var y=xx.clientY

//     var divA=document.createElement('div')
//     divA.style="width:6px;height:6px;"+"background:black;"+"border-radius:3px;"+"position:absolute;left:"+(x-3)+"px;"+"top:"+(y-3)+"px;"
//     div.appendChild(divA)
// }
// document.onmousemove=function(yy){
//     if(paint){
//         var x=yy.clientX
//         var y=yy.clientY

//         var divB=document.createElement('div')
//         divB.style="width:6px;height:6px;"+"background:black;"+"border-radius:3px;"+"position:absolute;left:"+(x-3)+"px;"+"top:"+(y-3)+"px;"
//         div.appendChild(divB)

//     }
// }
// document.onmouseup=function(z){
//     paint=false
// }