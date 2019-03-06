{
    let view ={
    }
    let module={
    }
    let controller={
        init(view,module){
            this.view=view
            this.module=module
            this.bindevent()
            this.bindeventHub()
        },
        bindevent(){
            let up=$('.setlist .up')
            let modify=$('.setlist .modify')
            up.on('click',function(){
                $(this).addClass('active')
                $(this).siblings('li').removeClass('active')
                $('.upload').css('visibility', 'visible')
                $('.Song-form').css('visibility', 'hidden')
            })
            modify.on('click',function(){
                console.log(11111111111)
                $(this).addClass('active')
                $(this).siblings('li').removeClass('active')
                $('.Song-form').css('visibility', 'visible')
                $('.upload').css('visibility', 'hidden')
            })

        },
        bindeventHub(){
            
            window.eventHub.on('modify', (data) => {
                let modify=$('.setlist .modify')
               modify.addClass('active')
                modify.siblings('li').removeClass('active')
                $('.Song-form').css('visibility', 'visible')
                $('.upload').css('visibility', 'hidden')
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
    controller.init(view,module)
}
