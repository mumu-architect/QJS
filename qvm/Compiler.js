
import { CompileUtil } from './CompileUtil.js';

//编译模板
export default class Compiler {
    constructor(el, vm) {
        //判断el属性，是不是一个元素，如果不是元素，那就获取
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        //console.log(this.el);
        //把当前节点中的元素，获取到，放到内存

        this.vm = vm;
        let fragment = this.node2fragment(this.el);

        //console.log(fragment);
        //把节点中的内容进行替换

        //编译模板 用数据编译
        this.compile(fragment);

        //把内容塞到页面
        this.el.appendChild(fragment);
    }
    //判断是否v-开头
    isDirective(attrName) {
        return attrName.startsWith('v-');
    }
    /**
     * 编译元素
     * @param {*} node 
     */
    compileElement(node) {
        //拿到当前的属性
        let attributes = node.attributes;
        //console.log(attributes);
        [...attributes].forEach(attr => {
            //type="text" v-model="school.name"
            let { name, value: expr } = attr;//v-model="school.msg"
            //console.log(name,value);
            if (this.isDirective(name)) {//v-model, v-html, v-bind,
                //console.log(node,'element');
                let [, directive] = name.split('-');//v-on:click
                let [directiveName, eventName] = directive.split(':');
                //需要调用不同指令来处理
                CompileUtil[directiveName](node, expr, this.vm, eventName);
            }

        })
    }
    /**
     * 编译文本
     * @param {*} node 
     */
    compileText(node) {
        //判断当前文本节点内容是否包含{{xxxx}} {{aaaa}}
        let content = node.textContent;
        // console.log(content,'内容');
        if (/\{\{(.+?)\}\}/g.test(content)) {
            //console.log(content);//找到所有文本
            //文本节点
            CompileUtil['text'](node, content, this.vm);//{{a}},{{b}}

        }
    }
    /**
     * 核心编译方法
     * @param {*} node 
     */
    compile(node) {
        let childNodes = node.childNodes;

        [...childNodes].forEach(child => {
            //console.log(child.nodeType);
            if (this.isElementNode(child)) {
                //编译元素
                // console.log(child);
                this.compileElement(child);
                //如果是元素，需要把自己传进去，遍历子节点
                this.compile(child);
            } else {
                //console.log(child);
                //编译文本
                this.compileText(child);
            }
        })
    }
    /**
     * 把节点移动到内存中
     * @param {*} node 
     * @returns 
     */
    node2fragment(node) {
        //创建一个文档碎片
        let fragment = document.createDocumentFragment();

        let firstChild;
        while (firstChild = node.firstChild) {
            //appendChild具有移动性
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
    /**
     * 判断是否是input文本框
     * @param {*} node 
     * @returns 
     */
    isElementNode(node) {
        //判断是否是input=1
        return node.nodeType === 1;
    }

}

export { Compiler }
