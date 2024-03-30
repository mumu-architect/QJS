
import { Dep } from './Dep.js';

//数据劫持
export default class Observer {
    constructor(data) {
        this.observer(data);
    }
    /**
     * 数据劫持
     * @param {*} data 
     */
    observer(data) {
        //如果是对象
        if (data && typeof data == 'object') {
            for (let key in data) {
                this.defineReactive(data, key, data[key]);
            }
        }
    }
    /**
     * 个每个属性，都加上一个发布订阅功能
     * {school:{name:'mumu'}} school={}
     * @param {*} obj 
     * @param {*} key 
     * @param {*} value 
     */
    defineReactive(obj, key, value) {
        //数据劫持
        this.observer(value);//school:[watcher,watcher] b:[watcher]
        let dep = new Dep()//个每个属性，都加上一个发布订阅功能
        Object.defineProperty(obj, key, {
            get() {
                //创建watcher时，回去到对应的内容，并且把watcher放到全局上
                //添加订阅
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set: (newVal) => {
                //{school:{name:'mumu'}} school={}
                //新旧数据不一样修改数据，通知发布
                if (newVal != value) {
                    this.observer(newVal);
                    value = newVal;
                    dep.notify();
                }
            }
        })
    }
}
export { Observer } 