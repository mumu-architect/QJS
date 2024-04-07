import '../node_modules/axios/dist/axios.js';

import {Qvm} from 'qvm-mvvm/Qvm.js'
import { getUserList, changeUserState, addUser, getUserById, editUser, deleteUser } from './api/index.js'


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
            let params = {
                "username": "mumu",
                "pwd": "123456"
            }
            addUser(params);

            return axios.get('users', params).then(res => res.data)

        },
        change() {
            this.school.name = "mumu";
        },
        localUser() {
            location.href="http://localhost:9000/src/view/user/index.html"
        },
        localButton() {
            location.href="http://localhost:9000/src/view/button/index.html"
        },
        loginButton(){
            location.href="http://localhost:9000/src/view/login/index.html"
        }
    }
})