window.eventHub={
    events:{},
    emit(eventname,data){
        for(let key in this.events){
            if (eventname===key){
                let fnList=this.events[key]
                fnList.map((fn)=>{
                    fn.call(undefined,data)
                })

            }
        }
    },
    on(eventname,data){

        if(this.events[eventname]===undefined){
            this.events[eventname]=[]
        }
        this.events[eventname].push(data)

    }



}