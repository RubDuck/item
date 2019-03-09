{
    let view={
        el:'.app',
        template:`
     
        <audio  src={{url}}></audio>
        <div>
        <button class='play'>播放</button>
        <button class='stop'>暂停</button>
        </div>
        `,
        render(id){
            console.log(2222)
            console.log(id)
            $(this.el).html(this.template.replace('{{url}}',id))


        },
        play(){
            let auto=$(this.el).find('audio')[0]
            console.log(2)
            console.log(auto)
            auto.play()
        },
        stop(){
            let auto=$(this.el).find('audio')[0]
       
            auto.pause()
        }

    }
    let module={
        data:{
            id:window.location.search,

        },
        find(id){
            let query = new AV.Query('Song');
            return query.get(id).then((songs) => {
                link=songs.attributes.link
                return link
                })
            
        },

    }
    let controller={
        init(view,module){
            this.view=view
            this.module=module
            this.getsong()
            this.bindevent()
        },
        getsong(){
            let id=this.module.data.id.split('=')[1]

            if(id.indexOf('&')!=-1){
                let relid=id.split('&')
            }
            else{
              let relid=id
              this.module.find(relid).then((e)=>{
                  console.log(e)
                this.view.render(e)
              })
            }
         
        },
        bindevent(){
            console.log(0)
            $(this.view.el).on('click','.play',()=>{
                console.log(1)
                this.view.play()
            })
            $(this.view.el).on('click','.stop',()=>{
                this.view.stop()
            })
        }

    }
    controller.init(view,module)


}
