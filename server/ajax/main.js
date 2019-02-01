myButton.addEventListener('click',(e)=>{
    let request=new XMLHttpRequest()
    request.onreadystatechange=()=>{
        if(request.readyState===4){
            console.log('请求完毕')
            if(request.status>=200&&request.status<300){
                console.log('说明请求成功')
                console.log(request.status)
                let string=request.responseText
                let obj=window.JSON.parse(string)
                console.log('obj.note')
                console.log(obj.note)
            }
            else if(status>=400){
                console.log('请求失败')
            }
        }
    }
    request.open('get','/xxx')
    request.send()
    
})