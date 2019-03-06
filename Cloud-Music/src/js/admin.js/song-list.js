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
                    $li.addClass('active')
                }
                return $li
            })
            $(this.el).find('ul').empty()
            songList.map((list) => {
                $(this.el).find('ul').append(list)
            })
        },
        clearActive() {
            $('li').removeClass('active')
        },
    }

    let module = {
        data: {
            songs: [],
            selectSongId: 'ok'
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
                console.log(66666666666,this.module.data)
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
                console.log(data,111111111)
                window.eventHub.emit('modify', data)
                window.eventHub.emit('select', songId)
            })
        },
        bindEventHub() {
            window.eventHub.on('new', (data) => {
                this.view.clearActive()
            })
            window.eventHub.on('addList', (e) => {
                this.module.data.songs.push(e)
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