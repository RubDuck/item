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
        total:0,
        rmall:false
       
    },
    created(){
        this.getcartList()
    },
    methods:{
        getcartList(){
            axios.get(url.cartList).then((res)=>{
                 let cartlist=res.data.cartList
                cartlist.forEach(ress => {
                    ress.checked=true
                    ress.rmchecked=false
                    ress.edit=false
                    ress.goodsList.map(function(e){
                        e.checked=true
                        e.rmchecked=false
                    })
                })
                this.cartlist=cartlist
            })
        },
        checkbot(buystatue,goods,shop){
            let attr=buystatue?'checked':'rmchecked'
            goods[attr]=!goods[attr]
            if(shop){
                shop[attr]= shop.goodsList.every((e)=>{
                    return e[attr]==true
                })  
                return shop
            }
            else{
                if(goods[attr]){
                    goods.goodsList.map((e)=>{
                     e[attr]=true
                 })
                }
                else{
                    goods.goodsList.map((e)=>{    
                     e[attr]=false
                 })
                }         
            }
      
        },
        selectall(buystatue,all){
            let attr=buystatue?'checked':'rmchecked'
            all= (attr=='rmchecked')?this.rmall:this.all
            if(all){
                this.cartlist.forEach(e=>{
                    e[attr]=false
                    e.goodsList.map(e=>{
                        e[attr]=false
                    })
                })
                this.all=false
            }
            else(
                this.cartlist.forEach(e=>{
                    e[attr]=true
                    e.goodsList.map(e=>{
                        e[attr]=true
                    })
                })
            )
        },
        edit(list){
            list.edit=!list.edit
        },
        goodsnum(a,b){
            if(a>0){
                b.number+=1
             
            }
            else{
                if(b.number<2){
                    return
                }
                else{
                    b.number-=1
                }
            }
        },
        removegood(goodsList,goodsindex,shopindex){
            
            axios.post(url.cartrmList,{id:goodsList[goodsindex].id}).then(res=>{
                if(goodsList.length==1){
                
                   this.cartlist.splice(shopindex,1)
                }
                goodsList.splice(goodsindex,1)
            })
    },
    removegoods(){
        let arr=[]
        this.cartlist.forEach((cart,index1)=>{
            cart.goodsList.forEach((e,index)=>{
                if(this.rmall==true){
                    console.log(111111111)
                    this.cartlist.splice(0,this.cartlist.length)
                }
                if(this.cartlist[index1].rmchecked==true){
                    this.cartlist.splice(index1,1)
                }
                else{
                    if(e.rmchecked==true){
                        this.cartlist[index1].goodsList.splice(index,1)
                    }
                }
                })
               
        })
   
        axios.post(url.cartrmList,{id:arr}).then(res=>{
            
        })
       
    }
    },
    computed:{
       allselect:{
           get(){
               if(this.cartlist&&this.cartlist.every(e=>{return e.checked}))
               {
                   this.all=true
               return false
            }
               else{
                   this.all=false
               }    
           }
       },
       
       rmallselect(){
        if(this.cartlist&&this.cartlist.every((e)=>{return e.rmchecked}))
        {this.rmall=true
        return false}
        else{
            this.rmall=false
        }    
       },
       selectlist:function(){
           if(this.cartlist){
               let num=0
               let total=0
               this.cartlist.forEach(e=>{
                   e.goodsList.forEach(e=>{
                       if(e.checked){
                           total+=e.price*e.number
                           num+=1
                       }
                   })
               })
             this.total=total
             return num
           }
       },
       buystatue(){
           if(this.cartlist){
          return this.cartlist.every((e)=>{
                return e.edit==false
          })
           }
       
       
        }
    }
})
