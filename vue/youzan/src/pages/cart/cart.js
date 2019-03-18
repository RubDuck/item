import 'css/common.css'
import './cart.css'
import './cart_base.css'
import './cart_trade.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'

let app= new Vue({
    el:'.app',
    data:{
        cartlist:'',
        checked:'',
        all:false,
        total:0
       
    },
    created(){
        this.getcartList()
    },
    methods:{
        getcartList(){
            axios.get(url.cartList).then((res)=>{
                 let cartlist=res.data.cartList
                cartlist.forEach(ress => {
                    ress.checked=false
                    ress.goodsList.map(function(e){
                        e.checked=false
                    })
                })
                this.cartlist=cartlist
            })
        },
        checkbot(goods,shop){
            goods.checked=!goods.checked
            if(shop){
                shop.checked= shop.goodsList.every((e)=>{
                    return e.checked==true
                })  
                return shop
            }
            else{
                
                if(goods.checked){
                    goods.goodsList.map((e)=>{
                        e.checked=true
                    })
            }else{
                goods.goodsList.map((e)=>{
                    e.checked=false 
                })
            }
            }
          
        },


        selectall(all){
            if(all){
                this.cartlist.forEach(e=>{
                    e.checked=false
                    e.goodsList.map(e=>{
                        e.checked=false
                    })
                })
                this.all=false
            }
            else(
                this.cartlist.forEach(e=>{
                    e.checked=true
                    e.goodsList.map(e=>{
                        e.checked=true
                    })
                })

            )
        }

    },
    computed:{
       allselect:{
           get(){
               if(this.cartlist&&this.cartlist.every((e)=>{return e.checked}))
               {this.all=true
               return false}
               else{
                   this.all=false
               }    
           },
       },
       selectlist:function(){
           if(this.cartlist){
               let total=0
               this.cartlist.forEach(e=>{
                   e.goodsList.forEach(e=>{
                       if(e.checked){
                           total+=e.price*e.number
                       }
                   })
               })
             this.total=total
             return total
           }
       
    

       }
         
       






    }
})