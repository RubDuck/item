var css1 = `/* 
 * 面试官你好，我是XXX
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
*{
  transition: all 1s;
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}
/* 我需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }

/* 加一个浮动效果 */
#code{
  animation: breath 0.5s infinite alternate-reverse;
}
/* 现在正式开始 */
/* 我需要一张白纸 */
.code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height：100%;
}
#paper > .content {
display:block;

}
/* 于是我就可以在白纸上写字了，请看右边 */
`
var css3 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`

var md = `
# 自我介绍

我叫 XXX
1994 年 10 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位
# 技能介绍
熟悉 JavaScript CSS
# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`

function writecode(prefix,code,fn){
let n=0
let Domcode=document.querySelector('#code')
let mianstyle=document.querySelector('#mainstyle')
let id=setInterval(()=>{
n+=1
Domcode.innerHTML=Prism.highlight(prefix+code.substring(0,n),Prism.languages.css)
mianstyle.innerHTML=prefix+code.substring(0,n)
Domcode.scrollTop=Domcode.scrollHeight
if(n>=code.length){
    clearInterval(id)
    fn.call()

}
},10)

}





function creatpaper(fn){
    var paper=document.createElement('div')
    paper.id='paper'
    var content=document.createElement('pre')
    content.className='content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()

}
function writepaper(markdown,fn){
    let n=0
    let Docode=document.querySelector('.content')
    let id=setInterval(()=>{
    n+=1
    Docode.innerHTML=markdown.substring(0,n)
    Docode.scrollTop = Docode.scrollHeight
    if(n>markdown.length){
        clearInterval(id)
        fn.call()
    }
    },10)
}
function markdown(){
  let div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML=marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
}


writecode('',css1,()=>{
  creatpaper(()=>{
    writepaper(md,()=>{
      writecode(css1,css3,()=>{
        markdown()

      })
    })
  })

})