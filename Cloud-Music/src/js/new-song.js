{

    let view={
        el:'.newsong',
        template:`
           <div class="newSong">
                你的歌单
            </div>
        `,
        render(data){
            $(this.el).html(this.template)
        },
        active(){
            console.log(2)
            $(this.el).addClass('active')
        }
    
    }

    let module={}
    let controller={
        init(view,module){
            this.view=view
            this.module=module
            this.view.render(this.module.data)
            window.eventHub.on('upload',(e)=>{
                console.log(1)
                console.log(e)
                this.view.active()
            })
        }
    }
     

    controller.init(view,module)
}

