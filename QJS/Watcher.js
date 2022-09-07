//监听，监听数据的变化
class Watcher{
    constructor(vm,expr,cb){
        this.vm=vm;
        this.expr=expr;
        this.cb=cb;
        //默认现存一个旧值
        this.oldValue=this.get();
    }
    get(){
        Dep.target=this;//先把自己放在this上
        //vm.$data.school, vm.$data.school.name
        //取值，把这个观察者和数据关联起来
        let value =CompileUtil.getVal(this.vm,this.expr);
        Dep.target=null;//不取消，任何值取值，都会添加watcher
        return value;
    }
    //更新操作，数据变化后，会调用观察者的update方法
    update(){
        let newVal=CompileUtil.getVal(this.vm,this.expr);
        if(newVal!==this.oldValue){
            this.cb(newVal);
        }
    }
}