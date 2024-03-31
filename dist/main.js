/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./qvm/CompileUtil.js":
/*!****************************!*\
  !*** ./qvm/CompileUtil.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompileUtil: () => (/* binding */ CompileUtil)
/* harmony export */ });
/* harmony import */ var _Watcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Watcher.js */ "./qvm/Watcher.js");

//编译功能方法
var CompileUtil = {
  //根据表达式取到对应的数据
  getVal: function getVal(vm, expr) {
    //vm.$data,'school.name',[school,name]
    //reduce，data是函数执行后的返回值
    return expr.split('.').reduce(function (data, current) {
      return data[current];
    }, vm.$data);
  },
  setValue: function setValue(vm, expr, value) {
    //vm.$data 'school.name'=>mumu
    return expr.split('.').reduce(function (data, current, index, arr) {
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
  model: function model(node, expr, vm) {
    var _this = this;
    //node是节点，expr是表达式，vm是当前实例
    //school.name vm.$data
    //个输入框赋予value属性 node.value=xxx
    var fn = this.updater['modelUpdater'];
    new _Watcher_js__WEBPACK_IMPORTED_MODULE_0__.Watcher(vm, expr, function (newVal) {
      //给输入框加一个观察者，如果稍后数据更新了会触发此方法，会拿新值给输入框赋值
      fn(node, newVal);
    });
    node.addEventListener('input', function (e) {
      var value = e.target.value; //获取用户输入的内容
      _this.setValue(vm, expr, value);
    });
    var value = this.getVal(vm, expr);
    fn(node, value);
  },
  /**
   * 给页面html添加数据监控Watcher，动态修改页面数据
   * v-html="message"
   * @param {*} node 
   * @param {*} expr 
   * @param {*} vm 
   */
  html: function html(node, expr, vm) {
    //v-html="message"
    //node.innerHTML=xxxx
    var fn = this.updater['htmlUpdater'];
    new _Watcher_js__WEBPACK_IMPORTED_MODULE_0__.Watcher(vm, expr, function (newVal) {
      //给加一个观察者，如果稍后数据更新了会触发此方法，会拿新值给输入框赋值
      fn(node, newVal);
    });
    var value = this.getVal(vm, expr);
    fn(node, value);
  },
  /**
   * 获取内容的值，数据变更后的值
   * @param {*} vm 
   * @param {*} expr 
   * @returns 
   */
  getContentValue: function getContentValue(vm, expr) {
    var _this2 = this;
    //遍历表达式，重新替换成与个完整的内容，返还回去
    return expr.replace(/\{\{(.+?)\}\}/g, function () {
      return _this2.getVal(vm, arguments.length <= 1 ? undefined : arguments[1]);
    });
  },
  /**
   * 添加on事件如 v-on:click="change" 
   * @param {*} node  
   * @param {*} expr 
   * @param {*} vm 
   * @param {*} eventName 
   */
  on: function on(node, expr, vm, eventName) {
    //v-on:click="change" ,expr
    node.addEventListener(eventName, function (e) {
      //动态调用变量只能使用vm.[expr]
      vm[expr].call(vm, e); //this.change
    });
  },
  /**
   * 给页面text添加数据监控Watcher，动态修改页面数据
   * expr=>{{school.name}}{{a}},{{b}}
   * @param {*} node 
   * @param {*} expr 
   * @param {*} vm 
   */
  text: function text(node, expr, vm) {
    var _this3 = this;
    //expr=>{{school.name}}{{a}},{{b}}
    var fn = this.updater['textUpdater'];
    var content = expr.replace(/\{\{(.+?)\}\}/g, function () {
      new _Watcher_js__WEBPACK_IMPORTED_MODULE_0__.Watcher(vm, arguments.length <= 1 ? undefined : arguments[1], function (newVal) {
        //给表达式{{}}都加一个观察者
        fn(node, _this3.getContentValue(vm, expr)); //返回一个全的字符串
      });
      return _this3.getVal(vm, arguments.length <= 1 ? undefined : arguments[1]);
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
    modelUpdater: function modelUpdater(node, value) {
      //修改属性的值
      node.value = value;
    },
    /**
     * 修改节点html内容
     * @param {*} node 
     * @param {*} value 
     */
    htmlUpdater: function htmlUpdater(node, value) {
      //修改html的内容
      node.innerHTML = value;
    },
    /**
     * 修改节点文本内容
     * @param {*} node 
     * @param {*} value 
     */
    textUpdater: function textUpdater(node, value) {
      //修改节点的文本内容
      node.textContent = value;
    }
  }
};

/***/ }),

/***/ "./qvm/Compiler.js":
/*!*************************!*\
  !*** ./qvm/Compiler.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Compiler: () => (/* binding */ Compiler),
/* harmony export */   "default": () => (/* binding */ Compiler)
/* harmony export */ });
/* harmony import */ var _CompileUtil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CompileUtil.js */ "./qvm/CompileUtil.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


//编译模板
var Compiler = /*#__PURE__*/function () {
  function Compiler(el, vm) {
    _classCallCheck(this, Compiler);
    //判断el属性，是不是一个元素，如果不是元素，那就获取
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    //console.log(this.el);
    //把当前节点中的元素，获取到，放到内存

    this.vm = vm;
    var fragment = this.node2fragment(this.el);

    //console.log(fragment);
    //把节点中的内容进行替换

    //编译模板 用数据编译
    this.compile(fragment);

    //把内容塞到页面
    this.el.appendChild(fragment);
  }
  //判断是否v-开头
  return _createClass(Compiler, [{
    key: "isDirective",
    value: function isDirective(attrName) {
      return attrName.startsWith('v-');
    }
    /**
     * 编译元素
     * @param {*} node 
     */
  }, {
    key: "compileElement",
    value: function compileElement(node) {
      var _this = this;
      //拿到当前的属性
      var attributes = node.attributes;
      //console.log(attributes);
      _toConsumableArray(attributes).forEach(function (attr) {
        //type="text" v-model="school.name"
        var name = attr.name,
          expr = attr.value; //v-model="school.msg"
        //console.log(name,value);
        if (_this.isDirective(name)) {
          //v-model, v-html, v-bind,
          //console.log(node,'element');
          var _name$split = name.split('-'),
            _name$split2 = _slicedToArray(_name$split, 2),
            directive = _name$split2[1]; //v-on:click
          var _directive$split = directive.split(':'),
            _directive$split2 = _slicedToArray(_directive$split, 2),
            directiveName = _directive$split2[0],
            eventName = _directive$split2[1];
          //需要调用不同指令来处理
          _CompileUtil_js__WEBPACK_IMPORTED_MODULE_0__.CompileUtil[directiveName](node, expr, _this.vm, eventName);
        }
      });
    }
    /**
     * 编译文本
     * @param {*} node 
     */
  }, {
    key: "compileText",
    value: function compileText(node) {
      //判断当前文本节点内容是否包含{{xxxx}} {{aaaa}}
      var content = node.textContent;
      // console.log(content,'内容');
      if (/\{\{(.+?)\}\}/g.test(content)) {
        //console.log(content);//找到所有文本
        //文本节点
        _CompileUtil_js__WEBPACK_IMPORTED_MODULE_0__.CompileUtil['text'](node, content, this.vm); //{{a}},{{b}}
      }
    }
    /**
     * 核心编译方法
     * @param {*} node 
     */
  }, {
    key: "compile",
    value: function compile(node) {
      var _this2 = this;
      var childNodes = node.childNodes;
      _toConsumableArray(childNodes).forEach(function (child) {
        //console.log(child.nodeType);
        if (_this2.isElementNode(child)) {
          //编译元素
          // console.log(child);
          _this2.compileElement(child);
          //如果是元素，需要把自己传进去，遍历子节点
          _this2.compile(child);
        } else {
          //console.log(child);
          //编译文本
          _this2.compileText(child);
        }
      });
    }
    /**
     * 把节点移动到内存中
     * @param {*} node 
     * @returns 
     */
  }, {
    key: "node2fragment",
    value: function node2fragment(node) {
      //创建一个文档碎片
      var fragment = document.createDocumentFragment();
      var firstChild;
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
  }, {
    key: "isElementNode",
    value: function isElementNode(node) {
      //判断是否是input=1
      return node.nodeType === 1;
    }
  }]);
}();



/***/ }),

/***/ "./qvm/Dep.js":
/*!********************!*\
  !*** ./qvm/Dep.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dep: () => (/* binding */ Dep),
/* harmony export */   "default": () => (/* binding */ Dep)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * 观察者（发布订阅），被观察者
 */
var Dep = /*#__PURE__*/function () {
  function Dep() {
    _classCallCheck(this, Dep);
    this.subs = []; //存放watcher
  }
  /**
   * 订阅
   * @param {*} watcher 
   */
  return _createClass(Dep, [{
    key: "addSub",
    value: function addSub(watcher) {
      //添加watcher
      this.subs.push(watcher);
    }
    /**
     * 发布，执行监控的所有对象的修改方法
     */
  }, {
    key: "notify",
    value: function notify() {
      this.subs.forEach(function (watcher) {
        return watcher.update();
      });
    }
  }]);
}();



/***/ }),

/***/ "./qvm/Observer.js":
/*!*************************!*\
  !*** ./qvm/Observer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Observer: () => (/* binding */ Observer),
/* harmony export */   "default": () => (/* binding */ Observer)
/* harmony export */ });
/* harmony import */ var _Dep_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dep.js */ "./qvm/Dep.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


//数据劫持
var Observer = /*#__PURE__*/function () {
  function Observer(data) {
    _classCallCheck(this, Observer);
    this.observer(data);
  }
  /**
   * 数据劫持
   * @param {*} data 
   */
  return _createClass(Observer, [{
    key: "observer",
    value: function observer(data) {
      //如果是对象
      if (data && _typeof(data) == 'object') {
        for (var key in data) {
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
  }, {
    key: "defineReactive",
    value: function defineReactive(obj, key, value) {
      var _this = this;
      //数据劫持
      this.observer(value); //school:[watcher,watcher] b:[watcher]
      var dep = new _Dep_js__WEBPACK_IMPORTED_MODULE_0__.Dep(); //个每个属性，都加上一个发布订阅功能
      Object.defineProperty(obj, key, {
        get: function get() {
          //创建watcher时，回去到对应的内容，并且把watcher放到全局上
          //添加订阅
          _Dep_js__WEBPACK_IMPORTED_MODULE_0__.Dep.target && dep.addSub(_Dep_js__WEBPACK_IMPORTED_MODULE_0__.Dep.target);
          return value;
        },
        set: function set(newVal) {
          //{school:{name:'mumu'}} school={}
          //新旧数据不一样修改数据，通知发布
          if (newVal != value) {
            _this.observer(newVal);
            value = newVal;
            dep.notify();
          }
        }
      });
    }
  }]);
}();



/***/ }),

/***/ "./qvm/Qvm.js":
/*!********************!*\
  !*** ./qvm/Qvm.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Qvm: () => (/* binding */ Qvm),
/* harmony export */   "default": () => (/* binding */ Qvm)
/* harmony export */ });
/* harmony import */ var _Compiler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Compiler.js */ "./qvm/Compiler.js");
/* harmony import */ var _Observer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Observer.js */ "./qvm/Observer.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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


var Qvm = /*#__PURE__*/function () {
  function Qvm(options) {
    var _this = this;
    _classCallCheck(this, Qvm);
    this.$el = options.el;
    this.$data = options.data;
    var computed = options.computed;
    var methods = options.methods;
    //这个根元素 存在 编译模板
    if (this.$el) {
      //把数据全部转成Object.defineProperty来定义

      //数据劫持
      new _Observer_js__WEBPACK_IMPORTED_MODULE_1__.Observer(this.$data);

      //计算方法
      //{{getNewName}} reduce vm.$data.getNewName
      var _loop = function _loop(key) {
        //有依赖关系，数据
        Object.defineProperty(_this.$data, key, {
          get: function get() {
            return computed[key].call(_this);
          }
        });
      };
      for (var key in computed) {
        _loop(key);
      }

      //所有普通事件方法
      var _loop2 = function _loop2(_key) {
        //方法用于在对象上定义一个新属性，或者修改对象现有属性，并返回此对象。
        Object.defineProperty(_this, _key, {
          get: function get() {
            //动态调用变量只能使用methods[key]
            return methods[_key];
          }
        });
      };
      for (var _key in methods) {
        _loop2(_key);
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
  return _createClass(Qvm, [{
    key: "proxyVm",
    value: function proxyVm(data) {
      var _this2 = this;
      var _loop3 = function _loop3(key) {
        //{school:{name,age}}
        //方法用于在对象上定义一个新属性，或者修改对象现有属性，并返回此对象。
        Object.defineProperty(_this2, key, {
          get: function get() {
            return data[key];
          },
          set: function set(newValue) {
            //设置代理方法
            data[key] = newValue;
          }
        });
      };
      for (var key in data) {
        _loop3(key);
      }
    }
  }]);
}();



/***/ }),

/***/ "./qvm/Watcher.js":
/*!************************!*\
  !*** ./qvm/Watcher.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Watcher: () => (/* binding */ Watcher),
/* harmony export */   "default": () => (/* binding */ Watcher)
/* harmony export */ });
/* harmony import */ var _CompileUtil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CompileUtil.js */ "./qvm/CompileUtil.js");
/* harmony import */ var _Dep_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dep.js */ "./qvm/Dep.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * 监听，监听数据的变化
 */
var Watcher = /*#__PURE__*/function () {
  function Watcher(vm, expr, cb) {
    _classCallCheck(this, Watcher);
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
  return _createClass(Watcher, [{
    key: "get",
    value: function get() {
      _Dep_js__WEBPACK_IMPORTED_MODULE_1__.Dep.target = this; //先把自己放在this上
      //vm.$data.school, vm.$data.school.name
      //取值，把这个观察者和数据关联起来
      var value = _CompileUtil_js__WEBPACK_IMPORTED_MODULE_0__.CompileUtil.getVal(this.vm, this.expr);
      _Dep_js__WEBPACK_IMPORTED_MODULE_1__.Dep.target = null; //不取消，任何值取值，都会添加watcher
      return value;
    }
    /**
     * 更新操作，数据变化后，会调用观察者的update方法
     */
  }, {
    key: "update",
    value: function update() {
      var newVal = _CompileUtil_js__WEBPACK_IMPORTED_MODULE_0__.CompileUtil.getVal(this.vm, this.expr);

      //新旧数据不一样在数据劫持已经判断过了，修改页面数据
      //TODO: 暂时修改为直接修改数据
      this.cb(newVal);
    }
  }]);
}();



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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Qvm: () => (/* reexport safe */ _qvm_Qvm_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _qvm_Qvm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../qvm/Qvm.js */ "./qvm/Qvm.js");


})();

/******/ })()
;
//# sourceMappingURL=main.js.map