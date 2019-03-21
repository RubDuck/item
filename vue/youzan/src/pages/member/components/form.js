
import Member from 'js/memberServer.js'

export default{
    data(){
      return{
        instance:'',
        address:'',
        id:'',
        name:'',
        provinceValue:'-1',
        cityValue:'-1',
        cityName:'',
        districtValue:'-1',
        Districtname:'',
        tel:'',
        status:'',
        citydata:require('./address.json')
      }
    },
    created(){
      this.getmessage()
    },
    methods:{
      getmessage(){
      let instance=this.$route.query.instance
      let status=this.$route.query.status
      this.instance=instance
      this.status=status
      if(this.status=='modify'){
        Object.assign(this, instance)
      }
    },
    add(){
      let{address,cityValue,districtValue,name,tel,provinceValue}=this
      let data={address,cityValue,districtValue,name,tel,provinceValue}
      if(this.status=='add'){
        Member.add(data).then(res=>{
          this.$router.push({name:'address',query: { id: this.id }})
        })
      }
      if(this.status=='modify'){
        Member.updata(data).then(res=>{
          this.$router.push({name:'address',query: { id: this.id }})
        })
      }
    },
    deldate(){
      if(this.status=='modify'){
        Member.remove(this.id).then(
          res=>{
            this.$router.push({name:'address',query: { id: this.id }})
          }
        )
      }
    },
    setDefault(){
      Member.setDefault(this.id).then(
        res=>{this.$router.push({name:'address',query: { id: this.id }})}
      )
    }
  
    },
    watch:{
      provinceValue(val){
        if(val==-1)return
        let list=this.citydata.list
        let index=list.findIndex(item=>{
          return item.value==val
        })
        this.cityName=list[index].children

      },
      cityValue(val){
        if(val==-1)return
        let list=this.cityName
        let index=list.findIndex(item=>{
          return item.value==val
        })
        this.Districtname=list[index].children

      },
      // districtValue(val){
      //   if(val==-1)return
      //   let list=this.Districtname
      //   let index=list.findIndex(item=>{
      //     return item.value==val
      //   })
    

      // }
    
    }
  
  }