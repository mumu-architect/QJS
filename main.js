import axios from './node_modules/axios';


import {getUserList, changeUserState, addUser, getUserById, editUser, deleteUser} from '@/api'
import { Qvm } from './qvm/Qvm.js';



    let vm = new Qvm({
        el: '#app',
        data: {
            school: {
                name: 'mumu',
                age: 18
            },
            message:'<h1>欢迎使用Qvm ^_^ !</h1>'
        },
        computed: {
            getNewName() {
                return this.school.name + '架构';
            }
        },
        methods: {
            change() {
                this.school.name = "mumu";
            }
        }
    })