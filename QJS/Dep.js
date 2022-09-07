//观察者（发布订阅），被观察者
class Dep{
    constructor(){
        this.subs=[];//存放watcher
    }
    //订阅
    addSub(watcher){
        //添加watcher
        this.subs.push(watcher);
    }
    //发布
    notify(){
        this.subs.forEach(watcher=>watcher.update());
    }
}