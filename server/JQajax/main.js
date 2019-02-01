window.jQuery = function(nodeOrSelector){
    let nodes = {}
    nodes.addClass = function(){}
    nodes.html = function(){}
    return nodes
  }
window.$=window.jQuery

window.jQuery.ajax=function(url,method,body,success,fail){
        let request=new XMLHttpRequest()
        request.onreadystatechange=()=>{
            if(request.readyState===4){
                if(request.status>=200&&request.status<300){
                    success.call(undefined,request.responseText)
                }
                else if(status>=400){
                    fail.call(undefined,request)
                }
            }
        }
        request.open(method,url)
        request.send(body)

}
function f1(x){
    console.log('请求成功')
    console.log(x)
}

myButton.addEventListener('click', (e)=>{
    window.jQuery.ajax({
      url: '/xxx',
      method: 'get',
      success: (x)=>{
        f1.call(undefined,x)
      },
      fail: (x)=>{
        console.log(x)
        console.log(x.status)
        console.log(x.responseText)
      }
    })
  })

