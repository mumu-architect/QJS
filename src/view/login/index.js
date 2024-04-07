
//import {Qvm} from '../../../node_modules/qvm-mvvm/Qvm.js'
import {Qvm} from '../../../qvm/Qvm.js'
//import { getUserList, changeUserState, addUser, getUserById, editUser, deleteUser } from './api/index.js'


let vm = new Qvm({
    el: '#login-container',
    data: {
        login: {
            name: 'mumu',
            password: 18
        },
        message: '欢迎使用Qvm ^_^ !'
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
                "name": "mumu",
                "password": "123456"
            }
            addUser(params);

            //return axios.get('users', params).then(res => res.data)

        },
        loginSubmit() {
            let params ={
                "name": this.login.name,
                "password":this.login.password
            }
            console.log(params)
            
           
        }
    }
})