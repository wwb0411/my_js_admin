//配置基本信息
import {createRouter,createWebHashHistory} from "vue-router";

const router = createRouter({
    history:createWebHashHistory(),//配置路由模式
    //配置路由地址
    routes:[
        //首页地址
        {
            path:"/",
            name:"",
            component: ()=> import("../views/Home.vue")
        },
        {
            path:"/newpeo",
            name:"newpeo",
            component: ()=> import("../views/newpeo.vue")
        },
        {
            path:"/jiaren",
            name:"jiaren",
            component: ()=> import("../views/jiaren.vue")
        },
        {
            path:"/xinxi",
            name:"xinxi",
            component: ()=> import("../views/xinxi.vue")
        },
        {
            path:"/qianyue",
            name:"qianyue",
            component: ()=> import("../views/qianyue.vue")
        },
        {
            path:"/jieguo",
            name:"jieguo",
            component: ()=> import("../views/jieguo.vue")
        },
        {
            path:"/qyxq",
            name:"qyxq",
            component: ()=> import("../views/qyxq.vue")
        },
        {
            path:"/qyxq2",
            name:"qyxq2",
            component: ()=> import("../views/qyxq2.vue")
        },
    ],
})

export default router;//抛出对象的内容