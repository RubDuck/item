{
    let view={
        el:'.main',
        template:`
        <form class="form">
        <div class="title">新建歌曲</div>
        <div class="row">
            <label >歌名</label>
            <input type="text">
        </div>
        <div class="row"> 
            <label >歌手</label>
            <input type="text">
        </div>
        <div class="row">
            <label >外链</label>
            <input type="text">
        </div>
        <div class="row">
            <button>保存</button>
        </div>
    </form>
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let module={}
    let controller={
        init(view ,modle){
            this.view=view
            this.modle=modle
            this.view.render(this.modle.data)
        }
          
    
    }

    controller.init(view,module)
}