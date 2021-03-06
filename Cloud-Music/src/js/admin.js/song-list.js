
{
    let view = {
        el: '.songLists',
        template: `
        <ul class="songList">
        
        </ul>
        `,
        render(data) {
            $(this.el).html(this.template)
            let { songs, selectSongId } = data
          
            let songList = songs.map((song) => {
                let $li = $("<li></li>").text(song.name).attr('data-song-id', song.id)
           
                if (song.id === selectSongId) {
                    $li.addClass('actives')   
                }
            
                return $li
            })
    
   
    
            // $(this.el).find('ul').empty()
            songList.map((list) => {
                $(this.el).find('ul').append(list)
            })
        },
        clearActive() {
       
            $('li').removeClass('actives')
        },
    }

    let module = {
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

    let controller = {
        init(view, module) {
            this.view = view
            this.module = module
            this.bindEvents()
            this.bindEventHub()
            this.getsong()
        },
        getsong() {
            return this.module.find().then(() => {
                this.view.render(this.module.data)
            })
        },
        bindEvents() {
            $('.songLists').on('click', 'li', (e) => {
                let songId = e.currentTarget.getAttribute('data-song-id')
                this.module.data.selectSongId = songId
                this.view.render(this.module.data)
                let data
                let songs = this.module.data.songs
                for (let i = 0; i < songs.length; i++) {
                    if (songs[i].id === songId) {
                        data = songs[i]
                        break
                    }
                }
                window.eventHub.emit('modify', data)
                window.eventHub.emit('status',this.module.data.selectSongId)
            })
        },
        bindEventHub() {
            window.eventHub.on('new', (data) => {
                console.log('tttttttt')
                this.view.clearActive()
            })
            window.eventHub.on('addList', (e) => {
                this.module.data.songs.push(e)
                this.module.data.selectSongId=e.id
        
                this.view.render(this.module.data)
            })
            window.eventHub.on('update', (e) => {
                let songs = this.module.data.songs
                for (let i = 0; i < songs.length; i++) {
                    if (songs[i].id === e.id) {
                        songs[i] = e
                    }
                }
                this.view.render(this.module.data)
            })
        }
    }
    controller.init(view, module)
}