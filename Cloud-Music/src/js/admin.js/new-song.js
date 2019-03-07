{
    let view = {
        el: '.newsong',
        template: `
           <div class="newSong">
           <span>添加歌曲    +</span> 
           </div>
        `,
        render() {

            $(this.el).html(this.template)
        },
        active() {
            $(this.el).addClass('active')
        },
        deactive() {
            $(this.el).removeClass('active')
        }
    }

    let module = {
        data: { 'name': '', 'link': '', 'id': '' },
    }
    
    let controller = {
        init(view, module) {
            
            this.view = view
            this.module = module
            this.view.render()
            this.bindEventHub()
            this.bindEvent()
        },
        bindEvent() {
            $(this.view.el).on('click', () => {
                let data={ 'name': '', 'link': '', 'id': '' }
                window.eventHub.emit('new',data)
                window.eventHub.emit('status',this.module.data.id)
            })
        },
        bindEventHub() {
            window.eventHub.on('new', (data) => {
                this.view.active()
            })
            window.eventHub.on('addList', (data) => {
             
                this.view.deactive()
            })
            window.eventHub.on('modify', (data) => {
                this.view.deactive()
            })
        }
    }
    controller.init(view, module)
}

