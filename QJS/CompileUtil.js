//编译功能方法
CompileUtil={
    //根据表达式取到对应的数据
    getVal(vm,expr){
        //vm.$data,'school.name',[school,name]
        //reduce，data是函数执行后的返回值
        return expr.split('.').reduce((data,current)=>{
            return data[current];
        },vm.$data);

    },
    setValue(vm,expr,value){
        //vm.$data 'school.name'=>mumu
        return expr.split('.').reduce((data,current,index,arr)=>{
            if(index==arr.length-1){
                return data[current]=value;
            }
            return data[current];
        },vm.$data);

    },
    //解析v-model这个指令
    model(node,expr,vm){//node是节点，expr是表达式，vm是当前实例
        //school.name vm.$data
        //个输入框赋予value属性 node.value=xxx
        let fn = this.updater['modelUpdater'];
        new Watcher(vm,expr,(newVal)=>{
            //给输入框加一个观察者，如果稍后数据更新了会触发此方法，会拿新值给输入框赋值
            fn(node,newVal);
        });
        node.addEventListener('input',(e)=>{
            let value=e.target.value;//获取用户输入的内容
            this.setValue(vm,expr,value);
        })
        let value = this.getVal(vm,expr);
        fn(node,value);
    },
    html(node,expr,vm){//v-html="message"
        //node.innerHTML=xxxx
        let fn = this.updater['htmlUpdater'];
        new Watcher(vm,expr,(newVal)=>{
            //给加一个观察者，如果稍后数据更新了会触发此方法，会拿新值给输入框赋值
            fn(node,newVal);
        });
        let value = this.getVal(vm,expr);
        fn(node,value);
    },
    getContentValue(vm,expr){
        //遍历表达式，重新替换成与个完整的内容，返还回去
        return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            return this.getVal(vm,args[1]);
        });

    },
    on(node,expr,vm,eventName){//v-on:click="change" ,expr
        node.addEventListener(eventName,(e)=>{
            vm[expr].call(vm,e);//this.change
        });
    },
    text(node,expr,vm){//expr=>{{school.name}}{{a}},{{b}}
        let fn=this.updater['textUpdater'];
        let content=expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            new Watcher(vm,args[1],(newVal)=>{
                //给表达式{{}}都加一个观察者
                fn(node,this.getContentValue(vm,expr));//返回一个全的字符串
            });
            return this.getVal(vm,args[1]);
        });
        fn(node,content);
    },
    updater:{
        //把数据插入到节点
        modelUpdater(node,value){
            //修改属性的值
            node.value=value;
        },
        htmlUpdater(node,value){
            node.innerHTML=value;
        },
        textUpdater(node,value){
            //修改节点的文本内容
            node.textContent=value;
        }
    }
}