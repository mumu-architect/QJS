/*
compile：编译模板，编译元素三个步骤：
1. 先把真实DOM放入内存中 fragment；
2.编译 => 提取元素节点含有v- v-model 文本节点{{}}；
3. 把编译好的fragment 放入页面
observer：数据劫持，其主要使用ES5中的Object.defineProperty(vue3.x中表示弃用Object.defineProperty使用更快的原生proxy) 去给对象的属性添加get和set
watcher：监听，监听数据的变化
*/
//基类 调度class QJS{}
//基类 调度
import { Compiler } from './Compiler.js';
import { Observer } from './Observer.js';

export default class Qvm {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        let computed = options.computed;
        let methods = options.methods;
        //这个根元素 存在 编译模板
        if (this.$el) {
            //把数据全部转成Object.defineProperty来定义

            //数据劫持
            new Observer(this.$data);


            //计算方法
            //{{getNewName}} reduce vm.$data.getNewName
            for (let key in computed) {//有依赖关系，数据
                Object.defineProperty(this.$data, key, {
                    get: () => {
                        return computed[key].call(this);
                    }
                })
            }

            //所有普通事件方法
            for (let key in methods) {
                //方法用于在对象上定义一个新属性，或者修改对象现有属性，并返回此对象。
                Object.defineProperty(this, key, {
                    get() {
                        //动态调用变量只能使用methods[key]
                        return methods[key];
                    }
                })
            }
            //把数据获取操作，vm上的取值操作，都代理到vm.$data
            this.proxyVm(this.$data);
            //编译
            new Compiler(this.$el, this);
        }
    }
    /**
     * 代理视图
     * @param {*} data {school:{name,age}}
     */
    proxyVm(data) {
        for (let key in data) {
            //{school:{name,age}}
            //方法用于在对象上定义一个新属性，或者修改对象现有属性，并返回此对象。
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set(newValue) {//设置代理方法
                    data[key] = newValue;
                }
            })
        }
    }
}
export { Qvm } 