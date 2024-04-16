import '../node_modules/axios/dist/axios.js';

//import { Qvm } from '../node_modules/qvm-mvvm/Qvm.js'

import { Qvm } from '../qvm/Qvm.js'
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
            location.href = "http://localhost:9000/src/view/user/index.html"
        },
        localButton() {
            location.href = "http://localhost:9000/src/view/button/index.html"
        },
        loginButton() {
            location.href = "http://localhost:9000/src/view/login/index.html"
        },
        showNav(id, title) {
            if (!id || !title) {
                return;
            }
            let navDivs = document.querySelectorAll('.tags-view-item')
            navDivs.forEach(function (iframe) {
                if (iframe.classList.contains('active')) {
                    iframe.classList.remove('active');
                }
            });
            let html = '';
            let newId = "nav-" + id;
            let newCloseId = "nav-close-" + id;
            html += '<span id="' + newId + '" class="tags-view-item  active">';
            html += title;
            html += ' <span id="' + newCloseId + '" class="q-icon-close"></span>';
            html += '</span>';
            let scrollbarDivs = document.querySelectorAll('.q-scrollbar-view')
            if (scrollbarDivs.length > 0) {
                //appContainers[0].innerHTML = html;
                scrollbarDivs[0].insertAdjacentHTML('beforeend', html);
            }
            //点击nav关闭内容页
            document.getElementById(newCloseId).addEventListener('click', function (event) {
                event.stopPropagation();
                if (document.getElementById(newId)) {
                    document.getElementById(newId).parentNode.removeChild(document.getElementById(newId));
                    document.getElementById(id).parentNode.removeChild(document.getElementById(id));
                }
                let navDivs = document.querySelectorAll('.tags-view-item')
                navDivs.forEach(function (iframe) {
                    if (iframe.classList.contains('active')) {
                        iframe.classList.remove('active');
                    }
                });
                navDivs[navDivs.length - 1].classList.add('active');
                let iframeDivs = document.querySelectorAll('.q-iframe-dev')
                iframeDivs.forEach(function (iframe) {
                    if (iframe.classList.contains('active')) {
                        iframe.classList.remove('active');
                    }
                });
                iframeDivs[iframeDivs.length - 1].classList.add('active');
            });
            //展示点击的导航nav
            document.getElementById(newId).addEventListener('click', function () {
                let iframeDivs = document.querySelectorAll('.q-iframe-dev')
                iframeDivs.forEach(function (iframe) {
                    if (iframe.classList.contains('active')) {
                        iframe.classList.remove('active');
                    }
                });

                let navDivs = document.querySelectorAll('.tags-view-item')
                navDivs.forEach(function (iframe) {
                    if (iframe.classList.contains('active')) {
                        iframe.classList.remove('active');
                    }
                });
                if (document.getElementById(id)) {
                    document.getElementById(id).classList.add('active');
                }
                this.classList.add('active');
            });
        },
        localIframe(vm, e, href, title) {
            //点导航显示内容页面使用iframe
            if (!href || !title) {
                return;
            }
            let iframes = document.querySelectorAll('.q-iframe');
            let newIframe = true;
            iframes.forEach(function (iframe) {
                console.log(iframe.src);
                if (iframe.src.includes(href)) {
                    newIframe = false;

                }
            });
            if (!newIframe) {
                return;
            }
            let html = '';
            let id = generateUniqueString();
            let newId = 'q-iframe-' + id;
            let iframeDivs = document.querySelectorAll('.q-iframe-dev')
            iframeDivs.forEach(function (iframe) {
                if (iframe.classList.contains('active')) {
                    iframe.classList.remove('active');
                }
            });

            // html = document.createElement("div");
            // html.id = newId;
            // html.className = 'q-iframe-dev active';
            // // 创建一个iframe元素
            // let iframe = document.createElement('iframe');
            // // 设置iframe的属性
            // iframe.src = href;
            // iframe.width = '100%';
            // iframe.height = '100%';
            // iframe.frameborder = 'no';
            // iframe.marginwidth = '0';
            // iframe.marginheight = '0';
            // iframe.className = 'q-iframe-dev q-iframe';
            // // 添加iframe到div
            // html.appendChild(iframe);
            html += '<div id="' + newId + '" class="q-iframe-dev active">';
            html += '<iframe class="q-iframe"   width="100%" height="100%" frameborder="no"  marginwidth="0" marginheight="0" src="' + href + '"></iframe>';
            html += ' </div>'
            let appContainers = document.querySelectorAll('.app-container');
            if (appContainers.length > 0) {
                //appContainers[0].innerHTML = html;
                appContainers[0].insertAdjacentHTML('beforeend', html);
                //appContainers[0].appendChild('beforeend', html);

                //展示导航
                this.showNav(newId, title);
            }
        }
    }
})


function generateUniqueString() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return timestamp + '_' + randomNum;
}