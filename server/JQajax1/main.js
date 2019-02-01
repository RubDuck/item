window.jQuery = function(nodeOrSelector){
    let nodes = {}
    nodes.addClass = function(){}
    nodes.html = function(){}
    return nodes
  }
window.$=window.jQuery
window.Promise=function(fn){
    return {then:function(){

    }}
}

window.jQuery.ajax=function(url,method,body){
    return new Promise(function(resolve,reject){

        let request=new XMLHttpRequest()
        request.onreadystatechange=()=>{
            if(request.readyState===4){
                if(request.status>=200&&request.status<300){
                    resolve.call(undefined,request.responseText)
                }
                else if(status>=400){
                    reject.call(undefined,request)
                }
            }
        }
        request.open(method,url)
        request.send(body)
    })

}
function f1(x){
    console.log('请求成功')
    console.log(x)
}

myButton.addEventListener('click', (e)=>{
  let promise=  window.jQuery.ajax({
      url: '/xxx',
      method: 'get',
    })
promise.then(
    (text)=>{console.log(text)},
    (request)=>{console.log(request)}
)
})
