{
    let view ={
        el:'.change-name',
        template:`
        <div class='mainbar'>
        <span class='upmusic'>上传歌曲</span>
        <span class="edmusic">编辑歌曲</span>
        <div class="setlist">
            <li class="up active">文件</li>
            <li class="modify">歌曲</li>
        </div>
    </div>`,
    render(){
        $(this.el).html(this.template)
    }
    }


    let controller={
        init(view,module){
            this.view=view
            this.view.render()
     
            this.addclick()
            this.bindevent()
            this.bindeventHub()
        },
        bindevent(){
            $('.mainbar .setlist .up').on('click',function(){
                $(this).addClass('active')
                $(this).siblings('li').removeClass('active')
                $('.upload').css('visibility', 'visible')
                $('.Song-form').css('visibility', 'hidden')
                $('span.upmusic').css('visibility', 'visible')
                $('span.edmusic').css('visibility', 'hidden')
            })

            $('.mainbar .setlist .modify').on('click',function(){
                $(this).addClass('active')
                $(this).siblings('li').removeClass('active')
                $('.Song-form').css('visibility', 'visible')
                $('.upload').css('visibility', 'hidden')
            })

        },addclick(){
            let data={'name': '', 'link': '', 'id': ''}
            $('.mainbar .setlist .up').on('click',()=>{
                window.eventHub.emit('new',data)
            })
        },
        bindeventHub(){
            window.eventHub.on('status',(e)=>{
          
                if(e){
                    $('.edmusic').css('visibility', 'visible')
                    $('.upmusic').css('visibility', 'hidden')
                }
                else{
                    $('.upmusic').css('visibility', 'visible')
                    $('.edmusic').css('visibility', 'hidden')
                }


            })

            window.eventHub.on('new',(data)=>{
                 let modify=$('.setlist .modify')
                 modify.addClass('active')
                 modify.siblings('li').removeClass('active')
                 $('.Song-form').css('visibility', 'visible')
                 $('.upload').css('visibility', 'hidden')

            })
         
        }
        
    }
    controller.init(view)
}
