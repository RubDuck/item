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
        }
    
    }

    let module={}
    let controller={

        init(view,module){
            this.view=view
            this.module=module
            this.view.render(this.module.data)
        }
    }

    controller.init(view,module)
}

