import Vue from "vue";
import VueRouter from "vue-router";
// import MapView from '@/view/mapView/index.vue'


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
        path: '/',
        // name: 'index',
        // component: MapView,
        component: () =>
            import ('@/view/mapView/index.vue'), //这是一种动态路由的写法，懒加载。也可以直接在最上面导入import，然后这里加组件名字
        // 路由元，可以用来路由判断的
        meta: {
            a: true
        },
        // 子路由
        // children: [{

        // }]
    }]
})

// 路由守卫主要的用途是做路由的拦截用的（登录验证、权限验证），它的执行优先于组件生命周期的开始。
// router.beforeEach((to, from, next) => {
// to.path可以拿到将要去哪里的路径，from是从哪里来，next('/path')是放行去哪个path
// })

// router/index.js 里面添加动态路由
// router.addRoute({ path: '', component: '' })
// 删除路由
// removeRoute('')


// 暴露路由接口
export default router