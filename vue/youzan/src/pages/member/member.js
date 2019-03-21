import Vue from 'vue'
import Rooter from 'vue-router'
Vue.use(Rooter)


let routes=[
    {path:'/',component:require('./components/member.vue')},
    {path:'/all',name:'all',component:require('./components/all.vue'),
    children:[
        {path:'',name:'address',component:require('./components/address.vue')},
        {path:'address',name:'address',component:require('./components/address.vue')},
        {path:'edit',name:'edit',component:require('./components/edit.vue')}
    ]
}
]

let router=new Rooter({
    routes
})

let vue=new Vue({
    el:'.app',
    router
})
