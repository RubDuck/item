{
    let view={
        el:'.main',
        template:`
        <form class="form">
     
        <div class="row">
            <label >歌名</label>
            <input type="text" name='name' value='__name__'>
        </div>
        <div class="row"> 
            <label >歌手</label>
            <input type="text">
        </div>
        <div class="row">
            <label >外链</label>
            <input type="text" name='link' value='__link__'>
        </div>
        <div class="row">
            <button type='submit'>保存</button>
        </div>
    </form>
        `,
        render(data) {
     
            let placeholders = ['name', 'link']
            let html = this.template
        
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
            $(this.el).html(html)
            if(data.id){
              $(this.el).prepend('<h1>编辑歌曲</h1>')
            }else{
              
              $(this.el).prepend('<h1>新建歌曲</h1>')
            }
        }
    }


    let module = {
        data: { 'name': '', 'link': '', 'id': '' },
        create(data) {
            var TestObject = AV.Object.extend('Song');
            var testObject = new TestObject();
            return testObject.save({
                name: data.name,
                link: data.link,
            }).then((newsong) => {
                let { id, attributes } = newsong
                Object.assign(this.data, { id, ...attributes })
             
            })
        },
        updata(data){
               // 第一个参数是 className，第二个参数是 objectId
         
               var todo = AV.Object.createWithoutData('Song', this.data.id);
               // 修改属性
               todo.set('name', data.name);
               todo.set('link',data.link)
               
               // 保存到云端
               return todo.save().then((response)=>{
                  
              
                Object.assign(this.data,data)
               
                return response
              })
        }
    }


    let controller = {
        init(view, module) {
            this.view = view
            this.module = module
            this.view.render(this.module.data)
            this.bindEvent()
            this.bindEventHub()
        },
        bindEvent() {
            $(this.view.el).on('submit', 'form', (e) => {
    
                e.preventDefault()
                let needs = 'name link'.split(' ')
                let data = {}
                needs.map((dat) => {
                    data[dat] = $(this.view.el).find(`[name='${dat}']`).val()
                })
               
                if(this.module.data.id){
                   
                    this.update()
                   
                }
                else{
                 
                    this.createdata(data)
                }

            
            })
            },
            createdata(data){
                
                this.module.create(data).then((e) => {
                    // this.view.render('')
                   
                    let copy = JSON.stringify(this.module.data)
                    let string = JSON.parse(copy)
                   
                    window.eventHub.emit('addList', string)
                })

            },
            update(){
                let needs = 'name link'.split(' ')
                let data = {}
                needs.map((string)=>{
                  data[string] = $(this.view.el).find(`[name="${string}"]`).val()
                })
                
                this.module.updata(data)
                  .then((response)=>{
                    window.eventHub.emit('update', JSON.parse(JSON.stringify(this.module.data)))
                  })
             
        },
        bindEventHub() {
            window.eventHub.on('modify',(data)=>{
             
                this.module.data = data
                this.view.render(this.module.data)
            })
            window.eventHub.on('new',(data)=>{
                if(data){
                    this.module.data=data
                    this.view.render(this.module.data)
                }
                else{
                    senectid=this.module.data.id
                    if(senectid){
                        data={name:'',link:'',id:''}
                        this.view.render(data)
                    }
                  
                }
                

            })

        }
    }

    controller.init(view,module)
   
}