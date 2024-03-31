//import axios from './node_modules/axios';


import Qvm from '../qvm/Qvm.js';
//import {getUserList, changeUserState, addUser, getUserById, editUser, deleteUser} from './src/api/index.js'
//import * as math from './node_modules/mathjs'

let vm = new Qvm({
    el: '#app',
    data: {
        school: {
            name: 'mumu',
            age: 18
        },
        message: '<h1>欢迎使用Qvm ^_^ !</h1>'
    },
    computed: {
        getNewName() {
            return this.school.name + '架构';
        }
    },
    methods: {
        initPath() {
            // 获取用户列表
            getUserList = params => {
                return axios.get('users', params).then(res => res.data)
            }
        },
        change() {
            this.school.name = "mumu";
            let a = math.evaluate(2+3*5);
            console.log(a)
        }
    }
})