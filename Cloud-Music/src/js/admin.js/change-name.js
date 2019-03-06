{
    let view ={
        el:'.change-name',
        template:`
        <div class='mainbar'>
            <span>上传歌曲</span>
            <div class="setlist">
                <li class="up active">文件</li>
                <li class="modify">歌曲</li>
            </div>
        </div>
        `,
        render() {
            $(this.el).html(this.template)
        }
    }

    let module={}
    let controller={
        init(view,module){
            this.module=module
            this.view=view
            this.view.render()
         
        }
    }

    controller.init(view,module)


}