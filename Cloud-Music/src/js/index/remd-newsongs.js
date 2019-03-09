{
    let view={
        el:'.newsonglist',
        temple:`
                <div class='main-song'>
                    <div class='name-song'>
                        <div class='song'>
                        <li>__songname__</li>
                        </div>
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sq"></use>
                        </svg>
                    </div>
                    <div class='player'>
                        <svg class="icon2" aria-hidden="true">
                            <use xlink:href="#icon-bofang"></use>
                            </svg>
                    </div>
                </div>
    `,
    render(data){
        let { songs} = data  
        songs.map((list) => {
            let li=this.temple.replace('__songname__',list.name)
            $('.newsonglist').append(li)
        })
    }
}

    let module={
        data: {
            songs: [],
            selectSongId: ''
        },
        find() {
            let query = new AV.Query('Song');
            return query.find().then((songs) => {
             
                this.data.songs = songs.map((song) => {
                    return { id: song.id, ...song.attributes }
                })
                return songs
            })
        },
    }
    let controller={
        init(view,module){
            this.module=module
            this.view=view
            this.getsong()
        },
        getsong() {
            return this.module.find().then(() => {
                console.log(this.module.data)
                this.view.render(this.module.data)
            })
        }
    }
    controller.init(view,module)
}
