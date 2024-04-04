

/**
 * 观察者（发布订阅），被观察者
 */
export default class Dep {
    constructor() {
        this.subs = [];//存放watcher
    }
    /**
     * 订阅
     * @param {*} watcher 
     */
    addSub(watcher) {
        //添加watcher
        this.subs.push(watcher);
    }
    /**
     * 发布，执行监控的所有对象的修改方法
     */
    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
}
export { Dep }