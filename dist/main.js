/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/qvm-mvvm/Qvm.js":
/*!***************************************!*\
  !*** ../node_modules/qvm-mvvm/Qvm.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Qvm: () => (/* reexport safe */ _core_Qvm_js__WEBPACK_IMPORTED_MODULE_0__.Qvm)
/* harmony export */ });
/* harmony import */ var _core_Qvm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Qvm.js */ "../node_modules/qvm-mvvm/core/Qvm.js");
//导入js

//start以下是错误的加载
// import {Compiler} from '@/Compiler.js';
// import {CompileUtil} from '@/CompileUtil.js';
// import {Dep} from '@/Dep.js';
// import {Observer} from '@/Observer.js';
// import {Watcher} from '@/Watcher.js';
// import {QVM} from '@/QVM.js';



// import './Compiler.js';
// import './CompileUtil.js';
// import './Dep.js';
// import './Observer.js';
// import './Watcher.js';
// import './QVM.js';
//end

 

/***/ }),

/***/ "../node_modules/qvm-mvvm/core/CompileUtil.js":
/*!****************************************************!*\
  !*** ../node_modules/qvm-mvvm/core/CompileUtil.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompileUtil: () => (/* binding */ CompileUtil)
/* harmony export */ });
/* harmony import */ var _Watcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Watcher.js */ "../node_modules/qvm-mvvm/core/Watcher.js");



//编译功能方法
const CompileUtil = {
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
        new _Watcher_js__WEBPACK_IMPORTED_MODULE_0__.Watcher(vm, expr, (newVal) => {
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
        new _Watcher_js__WEBPACK_IMPORTED_MODULE_0__.Watcher(vm, expr, (newVal) => {
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
            new _Watcher_js__WEBPACK_IMPORTED_MODULE_0__.Watcher(vm, args[1], (newVal) => {
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


/***/ }),

/***/ "../node_modules/qvm-mvvm/core/Compiler.js":
/*!*************************************************!*\
  !*** ../node_modules/qvm-mvvm/core/Compiler.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Compiler: () => (/* binding */ Compiler),
/* harmony export */   "default": () => (/* binding */ Compiler)
/* harmony export */ });
/* harmony import */ var _CompileUtil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CompileUtil.js */ "../node_modules/qvm-mvvm/core/CompileUtil.js");



//编译模板
class Compiler {
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
                _CompileUtil_js__WEBPACK_IMPORTED_MODULE_0__.CompileUtil[directiveName](node, expr, this.vm, eventName);
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
            _CompileUtil_js__WEBPACK_IMPORTED_MODULE_0__.CompileUtil['text'](node, content, this.vm);//{{a}},{{b}}

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




/***/ }),

/***/ "../node_modules/qvm-mvvm/core/Dep.js":
/*!********************************************!*\
  !*** ../node_modules/qvm-mvvm/core/Dep.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dep: () => (/* binding */ Dep),
/* harmony export */   "default": () => (/* binding */ Dep)
/* harmony export */ });


/**
 * 观察者（发布订阅），被观察者
 */
class Dep {
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


/***/ }),

/***/ "../node_modules/qvm-mvvm/core/Observer.js":
/*!*************************************************!*\
  !*** ../node_modules/qvm-mvvm/core/Observer.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Observer: () => (/* binding */ Observer),
/* harmony export */   "default": () => (/* binding */ Observer)
/* harmony export */ });
/* harmony import */ var _Dep_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dep.js */ "../node_modules/qvm-mvvm/core/Dep.js");



//数据劫持
class Observer {
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
        let dep = new _Dep_js__WEBPACK_IMPORTED_MODULE_0__.Dep()//个每个属性，都加上一个发布订阅功能
        Object.defineProperty(obj, key, {
            get() {
                //创建watcher时，回去到对应的内容，并且把watcher放到全局上
                //添加订阅
                _Dep_js__WEBPACK_IMPORTED_MODULE_0__.Dep.target && dep.addSub(_Dep_js__WEBPACK_IMPORTED_MODULE_0__.Dep.target);
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
 

/***/ }),

/***/ "../node_modules/qvm-mvvm/core/Qvm.js":
/*!********************************************!*\
  !*** ../node_modules/qvm-mvvm/core/Qvm.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Qvm: () => (/* binding */ Qvm),
/* harmony export */   "default": () => (/* binding */ Qvm)
/* harmony export */ });
/* harmony import */ var _Compiler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Compiler.js */ "../node_modules/qvm-mvvm/core/Compiler.js");
/* harmony import */ var _Observer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Observer.js */ "../node_modules/qvm-mvvm/core/Observer.js");
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



class Qvm {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        let computed = options.computed;
        let methods = options.methods;
        //这个根元素 存在 编译模板
        if (this.$el) {
            //把数据全部转成Object.defineProperty来定义

            //数据劫持
            new _Observer_js__WEBPACK_IMPORTED_MODULE_1__.Observer(this.$data);


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
            new _Compiler_js__WEBPACK_IMPORTED_MODULE_0__.Compiler(this.$el, this);
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
 

/***/ }),

/***/ "../node_modules/qvm-mvvm/core/Watcher.js":
/*!************************************************!*\
  !*** ../node_modules/qvm-mvvm/core/Watcher.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Watcher: () => (/* binding */ Watcher),
/* harmony export */   "default": () => (/* binding */ Watcher)
/* harmony export */ });
/* harmony import */ var _CompileUtil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CompileUtil.js */ "../node_modules/qvm-mvvm/core/CompileUtil.js");
/* harmony import */ var _Dep_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dep.js */ "../node_modules/qvm-mvvm/core/Dep.js");




/**
 * 监听，监听数据的变化
 */
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        //默认现存一个旧值
        this.oldValue = this.get();
    }
    /**
     * 取值，把这个观察者和数据关联起来
     * @returns 
     */
    get() {
        _Dep_js__WEBPACK_IMPORTED_MODULE_1__.Dep.target = this;//先把自己放在this上
        //vm.$data.school, vm.$data.school.name
        //取值，把这个观察者和数据关联起来
        let value = _CompileUtil_js__WEBPACK_IMPORTED_MODULE_0__.CompileUtil.getVal(this.vm, this.expr);
        _Dep_js__WEBPACK_IMPORTED_MODULE_1__.Dep.target = null;//不取消，任何值取值，都会添加watcher
        return value;
    }
    /**
     * 更新操作，数据变化后，会调用观察者的update方法
     */
    update() {
        let newVal = _CompileUtil_js__WEBPACK_IMPORTED_MODULE_0__.CompileUtil.getVal(this.vm, this.expr);

        //新旧数据不一样在数据劫持已经判断过了，修改页面数据
        //TODO: 暂时修改为直接修改数据
        this.cb(newVal);
    }
}
 

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Qvm: () => (/* reexport safe */ _node_modules_qvm_mvvm_Qvm_js__WEBPACK_IMPORTED_MODULE_0__.Qvm)
/* harmony export */ });
/* harmony import */ var _node_modules_qvm_mvvm_Qvm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/qvm-mvvm/Qvm.js */ "../node_modules/qvm-mvvm/Qvm.js");


})();

/******/ })()
;
//# sourceMappingURL=main.js.map