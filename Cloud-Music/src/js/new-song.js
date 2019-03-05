{
    let view={
        el:'.newsong',
        template:`
           <div class="newSong">
                新建歌单
            </div>
        `,
        render(data) {
            $(this.el).html(this.template)
        },
        active() {
            $(this.el).addClass('active')
        },
          deactive(){
            $(this.el).removeClass('active')
          }
    }

    let module={}
    let controller = {
        init(view, module) {
            this.view = view
            this.module = module
            this.view.render()
            this.bindEventHub()
            this.bindEvent()
        },
        bindEvent(){
            $(this.view.el).on('click', ()=>{
                // data={name:'',link:'',id:''}
                window.eventHub.emit('new')
              })

        },
        bindEventHub() {
            window.eventHub.on('new', (data)=>{
                this.view.active()
              })
              window.eventHub.on('select', (data)=>{
                this.view.deactive()
              })
              window.eventHub.on('updata',(data)=>{
                
              })
        }
    }


    controller.init(view, module)
}

