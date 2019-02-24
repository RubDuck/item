var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}
let sessions={}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)
  if (path==='/'){
    let string = fs.readFileSync('./index.html', 'utf8')
    let cookies=request.headers.cookie


    if(cookies===undefined){
     
      string=string.replace('__password__','不知道')
    }
    else{
    
      cookies=cookies.split('=')[1]
      console.log(sessions)
      real_cookie=sessions[cookies]
      console.log(real_cookie)
      let db =fs.readFileSync('./db/user')
      let strings=JSON.parse(db)
      let code =false
   if(real_cookie){
    
  for (i=0;i<strings.length;i++){
    console.log(real_cookie)
  
    real=strings[i]
    if(real.email===real_cookie.sign_in_email){
      console.log('ok')
      code =true
      
      break
    }
  }


   }
      
    console.log(code)
    if(code){
      console.log(3)
      string=string.replace('__password__',real.password)
    }
    else{
      console.log(4)
        string=string.replace('__password__','不知道')
      }
    }
    

    response.write(string)
    response.end()
  }else if(path==='./test.js'){
    let string = fs.readFileSync('./test.js', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/javascript;charset=utf-8')
    response.write(string)
    response.end()
  }
 else if(path === '/sign_up' && method === 'GET'){ 
    let string = fs.readFileSync('./sign_up.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()

    
  }else if(path==='/sign_up'&&method==='POST'){
let body = []
request.on('data', (chunk) => {
body.push(chunk)
}).on('end', () => {
  body = Buffer.concat(body).toString();
  let strings=body.split('&')
  hash={}
  strings.forEach((string)=>{

    let parts=string.split('=')
    let key=parts[0]
    let value=parts[1]
    hash[key]=decodeURIComponent(value)
  })
  let {email,password,password_confirmation}=hash
  if(email.indexOf('@')===-1){
    response.statusCode=400
    response.setHeader('Content-Type', 'application/json;charset=utf-8')
    response.write(`{
      "errors":
      {
        "email":"invalid"}
    }`)
  }
  else if(password!==password_confirmation){
    response.write('password not match')
  }
  else{
    let users = fs.readFileSync('./db/user', 'utf8')
    user=JSON.parse(users)
    let inUse = false
    for(let i=0; i<user.length; i++){
      let use = user[i]
      console.log(1)
      if(use.email === email){
        console.log(2)
        inUse = true
        break;
      }

    }
    if(inUse){
      console.log(3)
      response.statusCode = 400
      response.write('email in use')
    }else{
   
      user.push({"email": email, "password": password})
      var usersString = JSON.stringify(user)
      fs.writeFileSync('./db/user',usersString)
      response.statusCode = 200
  
    }

  }

  response.end()
});

  }
  
  else if(path==='/sign_in'&&method==='GET'){
    let string = fs.readFileSync('./sign_in.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }


else if(path==='/sign_in'&&method==='POST'){
let body = []
request.on('data', (chunk) => {
body.push(chunk)
}).on('end', () => {
  body = Buffer.concat(body).toString();
  let strings=body.split('&')
  hash={}

  strings.forEach((string)=>{


    let parts=string.split('=')
    let key=parts[0]
    let value=parts[1]
    hash[key]=decodeURIComponent(value)
  })
  let {email,password,password_confirmation}=hash
  let users = fs.readFileSync('./db/user', 'utf8')
    user=JSON.parse(users)
    let found=false
    console.log(response.statusCode)
    for(let i=0; i<user.length; i++){
      let use = user[i]
      if(use.email === email&&use.password===password){
        found =true
        break
      }
    }
    console.log(found)
    if(found){
      let sessionID=Math.random()*1000000
      sessions[sessionID]={sign_in_email:email}
      response.setHeader('Set-Cookie',`sessionID=${sessionID}`)
      response.statusCode=200
    }
    else{
      response.statusCode=400
    }
    response.end()
  })

  



} 
  else if(path==='/xxx'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', 'http://frank.com:8001')
    response.write(`
    {
      "note":{
        "to": "小谷",
        "from": "方方",
        "heading": "打招呼",
        "content": "hi"
      }
    }
    `)
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
      {
        "error": "not found"
      }
    `)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})


server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


