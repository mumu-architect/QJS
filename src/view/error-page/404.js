
import {Qvm} from '../../../node_modules/qvm-mvvm/Qvm.js'
//import {Qvm} from '../../../qvm/Qvm.js'
//import { getUserList, changeUserState, addUser, getUserById, editUser, deleteUser } from './api/index.js'


let vm = new Qvm({
    el: '#page404',
    data: {
        message: '欢迎使用Qvm ^_^ !'
    },
    computed: {
    },
    methods: {
    }
})