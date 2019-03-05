{

    let view={
        el:'.upload',
        find(selector){
            return $(this.el).find(selector)[0]
        }
       
    }

    let module={}

    let controller={
        init(view,module){
            this.view=view
            this.module=module
            this.initqiniu()
        },
        initqiniu(){
            var uploader = Qiniu.uploader({
                runtimes: 'html5',     
                browse_button: this.view.find('#xxx'),     
                uptoken_url:'http://localhost:8080/uptoken' ,   
                
                domain: 'http://pnoe8bs5p.bkt.clouddn.com/',     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
                   
                max_file_size: '40mb',             // 最大文件体积限制
            
                dragdrop: true,                     // 开启可拖曳上传
                drop_element: this.view.find('#yyy'),         // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                  // 分块上传时，每块的体积
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
            
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {
                            // 文件添加进队列后,处理相关的事情
                        });
                    },
                    'BeforeUpload': function(up, file) {
                           // 每个文件上传前,处理相关的事情
                    },    
                    'UploadProgress': function(up, file) {
                        UploadProgress.textContent='上传中'
                           // 每个文件上传时,处理相关的事情
                    },
                    'FileUploaded': function(up, file, info) {
                        FileUploaded.textContent='上传完成'
                     
                             var domain = up.getOption('domain');
                             var response = JSON.parse(info.response);
                             var sourceLink = domain +"/"+ encodeURIComponent(response.key)
                             window.eventHub.emit('new',{
                                 "name":response.key,
                                 "link":sourceLink,
                                 "id":''
                             })


                            
                             
                   
             
                    },
                    'Error': function(up, err, errTip) {
                           //上传出错时,处理相关的事情
                    },
                    'UploadComplete': function() {
                           //队列文件处理完毕后,处理相关的事情
                    },
                   
                }
            });
        }
    }

    controller.init(view,module)

}