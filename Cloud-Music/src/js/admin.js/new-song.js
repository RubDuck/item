{
    let view = {
        el: '.newsong',
        template: `
           <div class="newSong">
           <span>添加歌曲    +</span> 
           </div>
        `,
        render() {
            console.log(1)
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
                console.log(this.module.data,33333333)
                window.eventHub.emit('new',this.module.data)
            })
        },
        bindEventHub() {
            window.eventHub.on('new', (data) => {
                this.view.active()
            })
            window.eventHub.on('select', (data) => {
                this.view.deactive()
            })
            window.eventHub.on('updata', (data) => {
            })
        }
    }
    controller.init(view, module)
}

