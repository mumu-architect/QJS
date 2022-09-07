
//数据劫持
class Observer{
    constructor(data){
        this.observer(data);
    }
    observer(data){
        //如果是对象
        if(data&&typeof data=='object'){
            for(let key in data){
                this.defineReactive(data,key,data[key]);
            }
        }
    }
    defineReactive(obj,key,value){
        //数据劫持
        this.observer(value);//school:[watcher,watcher] b:[watcher]
        let dep=new Dep()//个每个属性，都加上一个发布订阅功能
        Object.defineProperty(obj,key,{
            get(){
                //创建watcher时，回去到对应的内容，并且把watcher放到全局上
                Dep.target&&dep.addSub(Dep.target);
                return value;
            },
            set:(newVal)=>{
                //{school:{name:'mumu'}} school={}
                if(newVal!=value){
                    this.observer(newVal);
                    value=newVal;
                    dep.notify();
                } 
            }
        })
    }
}
