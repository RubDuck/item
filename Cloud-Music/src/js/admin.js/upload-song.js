{
    let view = {
        el: '.upload',
        find(selector) {
            return $(this.el).find(selector)[0]
        }
    }

    let module = {
        data: {
            status: 'open'
          }
    }
    let controller = {
        init(view, module) {
            this.view = view
            this.module = module
            this.initqiniu()
        },
        initqiniu() {
            var uploader = Qiniu.uploader({
                runtimes: 'html5',
                browse_button: this.view.find('#xxx'),
                uptoken_url: 'http://localhost:8080/uptoken',
                domain: 'http://pnoe8bs5p.bkt.clouddn.com/',
                max_file_size: '40mb',
                dragdrop: true,
                drop_element: this.view.find('#yyy'),
                chunk_size: '4mb',
                auto_start: true,
                init: {
                    'FilesAdded': function (up, files) {
                        plupload.each(files, function (file) {
                        });
                    },
                    'BeforeUpload':(up, file)=> {
                        window.eventHub.emit('beforeUpload')
                    if(this.module.data.status === 'closed'){
                    return false
                    }else{
                    this.module.data.status = 'closed'
                    return true
                    }
                    },
                    'UploadProgress': function (up, file) {
                        
                    },
                    'FileUploaded':  (up, file, info)=> {
                        window.eventHub.emit('afterUpload')
                        this.module.data.status = 'open'
                        var domain = up.getOption('domain');
                        var response = JSON.parse(info.response);
                        var sourceLink = domain + "/" + encodeURIComponent(response.key)
                        window.eventHub.emit('new', {
                            "name": response.key,
                            "link": sourceLink,
                            "id": ''
                        })
                    },
                    'Error': function (up, err, errTip) {
                        //上传出错时,处理相关的事情
                    },
                    'UploadComplete': function () {
                        //队列文件处理完毕后,处理相关的事情
                    },
                }
            });
        }
    }
    controller.init(view, module)

}