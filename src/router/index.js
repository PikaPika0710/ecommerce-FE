import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";

import Home from '../views/HomePage.vue'
import About from '../views/About.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import MyAccount from '../views/MyAccount.vue'
import Checkout from "@/views/Checkout.vue";
import Orders from "@/views/Orders.vue";
import Success from "@/views/Success.vue";
import Notifications from "@/views/Notifications.vue";
import Vouchers from "@/views/Vouchers.vue";
const routes = [{
        path: "/product/search/",
        name: "search",
        component: Search
    },
    {
        path: "/category/:id",
        name: "Category",
        component: Category
    },
    {
        path: "/product/:id",
        name: "Product",
        component: Product
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: About
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/cart/success',
        name: 'Success',
        component: Success
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/my-account',
        name: 'MyAccount',
        component: MyAccount,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/cart/checkout',
        name: 'Checkout',
        component: Checkout,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/my-orders',
        name: 'Orders',
        component: Orders,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/notifications',
        name: 'Notification',
        component: Notifications,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/my-vouchers',
        name: 'vouchers',
        component: Vouchers,
        meta: {
            requireLogin: true
        }
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
        next({ name: 'Login', query: { to: to.path } });
    } else {
        next()
    }
})
export default router