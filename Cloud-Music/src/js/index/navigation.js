{

    let view={
        el:'.navigation',
        template:`
        <div class="nav">
        <div class="recommed active">
            <span>推荐音乐</span>
        </div>
    </div>
    <div class="nav">
        <div class="hotsong">
            <span>热歌榜</span>
        </div>
    </div>
    <div class="nav">
        <div class="search">
            <span>搜索</span>
        </div>
    </div>
        `,
        render(){
            $(this.el).html(this.template)
        }
    }
    let module={}
    let controller={
        init(view){
            this.view=view
            this.view.render()
            this.bindevent()
        },
        bindevent(){
            console.log(2)
            $(this.view.el).on('click','.nav',(e)=>{
                let tag=$(e.currentTarget).children('div')
                needname=tag.attr('class').split(' ')[0]
                $(e.currentTarget).children('div').addClass('active')
                $(e.currentTarget).siblings().children('div').removeClass('active')
                $(`#${needname}`).addClass('active').siblings().removeClass('active')
                
            })
        }
    }
    controller.init(view)


}
