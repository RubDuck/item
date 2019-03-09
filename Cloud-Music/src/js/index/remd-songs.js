{
    let view={
        el:'.remd-songs',
        template:`
        <div class="songlist">
            <div class="image">
                <div class="imagebox"><img src="./image/song.webp" alt=""></div>
                    <p>或许 生活的本质就是在黑暗中寻找光芒</p>
            </div>
            <div class="image">
                <div class="imagebox"><img src="./image/song.webp" alt=""></div>
                    <p>或许 生活的本质就是在黑暗中寻找光芒</p>
            </div>
            <div class="image">
                <div class="imagebox"><img src="./image/song.webp" alt=""></div>
                    <p>或许 生活的本质就是在黑暗中寻找光芒</p>
            </div>
        </div>
        <div class="songlist2">
                <div class="image">
                    <div class="imagebox"><img src="./image/song.webp" alt=""></div>
                        <p>或许 生活的本质就是在黑暗中寻找光芒</p>
                </div>
                <div class="image">
                    <div class="imagebox"><img src="./image/song.webp" alt=""></div>
                        <p>或许 生活的本质就是在黑暗中寻找光芒</p>
                </div>
                <div class="image">
                    <div class="imagebox"><img src="./image/song.webp" alt=""></div>
                        <p>或许 生活的本质就是在黑暗中寻找光芒</p>
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
        }
    }
    controller.init(view)
}
