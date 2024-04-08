

import { Watcher } from './Watcher.js';
import { UtilsFunc } from './utils/func.js'
//编译功能方法
export const CompileUtil = {
    //根据表达式取到对应的数据
    getVal(vm, expr) {
        //vm.$data,'school.name',[school,name]
        //reduce，data是函数执行后的返回值
        return expr.split('.').reduce((data, current) => {
            return data[current];
        }, vm.$data);

    },
    setValue(vm, expr, value) {
        //vm.$data 'school.name'=>mumu
        return expr.split('.').reduce((data, current, index, arr) => {
            if (index == arr.length - 1) {
                return data[current] = value;
            }
            return data[current];
        }, vm.$data);

    },
    /**
     * 解析v-model这个指令
     * node是节点，expr是表达式，vm是当前实例
     * @param {*} node 
     * @param {*} expr 
     * @param {*} vm 
     */
    model(node, expr, vm) {//node是节点，expr是表达式，vm是当前实例
        //school.name vm.$data
        //个输入框赋予value属性 node.value=xxx
        let fn = this.updater['modelUpdater'];
        new Watcher(vm, expr, (newVal) => {
            //给输入框加一个观察者，如果稍后数据更新了会触发此方法，会拿新值给输入框赋值
            fn(node, newVal);
        });
        node.addEventListener('input', (e) => {
            let value = e.target.value;//获取用户输入的内容
            this.setValue(vm, expr, value);
        })
        let value = this.getVal(vm, expr);
        fn(node, value);
    },
    /**
     * 给页面html添加数据监控Watcher，动态修改页面数据
     * v-html="message"
     * @param {*} node 
     * @param {*} expr 
     * @param {*} vm 
     */
    html(node, expr, vm) {//v-html="message"
        //node.innerHTML=xxxx
        let fn = this.updater['htmlUpdater'];
        new Watcher(vm, expr, (newVal) => {
            //给加一个观察者，如果稍后数据更新了会触发此方法，会拿新值给输入框赋值
            fn(node, newVal);
        });
        let value = this.getVal(vm, expr);
        fn(node, value);
    },
    /**
     * 获取内容的值，数据变更后的值
     * @param {*} vm 
     * @param {*} expr 
     * @returns 
     */
    getContentValue(vm, expr) {
        //遍历表达式，重新替换成与个完整的内容，返还回去
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1]);
        });

    },
    /**
     * 添加on事件如 v-on:click="change" 
     * @param {*} node  
     * @param {*} expr 
     * @param {*} vm 
     * @param {*} eventName 
     */
    on(node, expr, vm, eventName) {//v-on:click="change" ,expr
        node.addEventListener(eventName, (e) => {
            //动态调用变量只能使用vm.[expr]
            vm[expr].call(vm, e);//this.change
        });
    },
    onEvent(node, expr, vm, eventName) {//v-on:click="change" ,expr
        node.addEventListener(eventName, (e) => {
            //动态调用变量只能使用vm.[expr]
            let newExpr = UtilsFunc.replaceSpaces(expr)
            let pattern = /\b[a-zA-Z_\.\/$][\/\.a-zA-Z_$0-9]*\b/g;
            let params = newExpr.match(pattern);
            let funName=UtilsFunc.getMethodName(newExpr)

            vm[funName].call(vm,e,...params);//this.change
        });
    },
    /**
     * 给页面text添加数据监控Watcher，动态修改页面数据
     * expr=>{{school.name}}{{a}},{{b}}
     * @param {*} node 
     * @param {*} expr 
     * @param {*} vm 
     */
    text(node, expr, vm) {//expr=>{{school.name}}{{a}},{{b}}
        let fn = this.updater['textUpdater'];
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            new Watcher(vm, args[1], (newVal) => {
                //给表达式{{}}都加一个观察者
                fn(node, this.getContentValue(vm, expr));//返回一个全的字符串
            });
            return this.getVal(vm, args[1]);
        });
        fn(node, content);
    },
    /**
     * 把数据插入到节点
     */
    updater: {
        /**
         * 修改属性的值
         * @param {*} node 
         * @param {*} value 
         */
        modelUpdater(node, value) {
            //修改属性的值
            node.value = value;
        },
        /**
         * 修改节点html内容
         * @param {*} node 
         * @param {*} value 
         */
        htmlUpdater(node, value) {
            //修改html的内容
            node.innerHTML = value;
        },
        /**
         * 修改节点文本内容
         * @param {*} node 
         * @param {*} value 
         */
        textUpdater(node, value) {
            //修改节点的文本内容
            node.textContent = value;
        }
    }
}
