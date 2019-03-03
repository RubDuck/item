{
    let view={
        el:'.main',
        template:`
        <form class="form">
        <div class="title">新建歌曲</div>
        <div class="row">
            <label >歌名</label>
            <input type="text" name='Songname' value='__Songname__'>
        </div>
        <div class="row"> 
            <label >歌手</label>
            <input type="text">
        </div>
        <div class="row">
            <label >外链</label>
            <input type="text" name='Link' value='__Link__'>
        </div>
        <div class="row">
            <button type='submit'>保存</button>
        </div>
    </form>
        `,
        render(data){
            let placeholders = ['Songname', 'Link']
            let html=this.template
                placeholders.map((string)=>{
                    html=html.replace(`__${string}__`,data[string]||'')
                })
    
            $(this.el).html(html)
        }
    }
    let module={
        data:{'Songname':'','Links':''},
        create(data){
            var TestObject = AV.Object.extend('Song');
            var testObject = new TestObject();
            return testObject.save({
            name:data.Songname,
            link:data.Link,
            }).then((newsong)=> {
              
                this.data.Songname=newsong.attributes.name
                this.data.Links=newsong.attributes.link   
            })
        }
}
    let controller={
        init(view ,module){
            this.view=view
            this.module=module
            this.view.render(this.module.data)
            this.bindEvent()
            window.eventHub.on('upload',(data)=>{
            this.module.data = data
            this.view.render(this.module.data)    
        })
    },
    bindEvent(){
       
        $(this.view.el).on('submit','form',(e)=>{
            e.preventDefault()
            let needs='Songname Link'.split(' ')
            let data={}
            needs.map((dat)=>{
                data[dat]=$(this.view.el).find(`[name='${dat}']`).val()
            })
            this.module.create(data).then((e)=>{
                this.view.render('')
                let copy=JSON.stringify(this.module.data)
                let string=JSON.parse(copy)
                window.eventHub.emit('addList',string)
            })
        })  
    }
    }

    controller.init(view,module)
   
}