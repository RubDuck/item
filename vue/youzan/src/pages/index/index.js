import './index.css'
import 'css/common.css'
import Vue from 'vue'
import url from  'js/api.js'
import axios from 'axios'
import { InfiniteScroll } from 'mint-ui'

import Foot from 'components/Foot.vue'

Vue.use(InfiniteScroll);


let app =new Vue({
    el :'#app',
    data:{
        lists:null,
        pageNum:0,
        pageSize:8,
        loading:false,
        allloaded:false
    },
    created(){
        this.getlist()  
    },
    methods:{
        getlist(){
            if(this.allloaded){
                return
            }
            this.loading=true
            axios.get(url.hotLists,{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then(res=>{
               let  currentlist=res.data.lists
                if(currentlist.length<this.pageSize){
                    this.allloaded=true
                }
                if(this.lists){
                    this.lists=this.lists.concat(currentlist)
                }else
                {
                    this.lists=currentlist
                }
                this.loading=false
                this.pageNum+=1  
            })
        }

    },
    components:{
        Foot
    }

})