{

    let view={
        el:'.songLists',
        template:`
        <ul class="songList">
       </ul>
        `,
        render(data){
            console.log(00)
            $(this.el).html(this.template)
            console.log(0001)
            let {songs}=data
            console.log(0)
            let songList=songs.map((song)=>$("<li></li>").text(song.Songname))
            console.log(1)
            $(this.el).find('ul').empty()
            console.log(2)
            songList.map((list)=>{
                console.log(3)
                console.log(list)
                $(this.el).find('ul').append(list)
            })
    
        },
        clearActive(){
            $('li').removeClass('active')
        },
      
    }

    let module={
        data:{
            songs:[]
        }
    }
    let controller={
        init(view,module){
            this.view=view
            this.module=module
            this.view.render(this.module.data)
            window.eventHub.on('upload',(data)=>{
                this.view.clearActive()
            })
            window.eventHub.on('addList',(e)=>{
                this.module.data.songs.push(e)
                console.log('ttttttttttttt')
                this.view.render(this.module.data)

            })
        }
    }
    controller.init(view,module)

}