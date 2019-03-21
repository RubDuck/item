<template>
<div class="container " style="min-height: 597px;">
    <div class="block-list address-list   section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item"  :class="{active:list.id==id.id}"  @click='editor(list)' v-for=' list in addresslist' >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class='address_edit' >修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name:'edit', query: { status: 'add' }}">
            新增地址
        </router-link>
    </div>
  </div>
</template>



<script>
import fetch from 'js/fetch.js'
import url from 'js/api.js'
import axios from 'axios'



export default{
  data(){
    return{
      addresslist:'',
      id:'',
    }
    },
  created(){
    this.id=this.$route.query
    this.getaddressList()
  },
  methods:{
    editor(message){
        this.$router.push({name:'edit', query: { status: 'modify',instance:message}})
    },
    getaddressList(){
      axios.get(url.addressList).then(res=>{
        this.addresslist=res.data.lists
      })
    }
  }
}

</script>