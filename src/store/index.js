import { createStore } from 'vuex'

export default createStore({
    state: {
        cart: {
            items: [],
        },
        isAuthenticated: false,
        token: '',
        isLoading: false,
        user_id: '',
    },
    mutations: {
        initializeStore(state) {
            let cart_item = localStorage.getItem('cart')
            if (cart_item) {
                state.cart = JSON.parse(cart_item)
                console.log(state.cart)
            } else {
                localStorage.setItem('cart', JSON.stringify(state.cart))
            }

            if (localStorage.getItem('token')) {
                state.token = localStorage.getItem('token')
                state.isAuthenticated = true
            } else {
                state.token = ''
                state.isAuthenticated = false
            }

            if (localStorage.getItem('user_id')) {
                state.user_id = localStorage.getItem('user_id')
            } else {
                state.user_id = ''
            }
        },
        addToCart(state, item) {
            const exists = state.cart.items.filter(i => i.product.id === item.product.id)
            if (exists.length) {
                exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
            } else {
                state.cart.items.push(item)
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        setIsLoading(state, status) {
            state.isLoading = status
        },
        setToken(state, token, value) {
            state.token = token
            state.isAuthenticated = true

        },
        removeToken(state) {
            state.token = ''
            state.isAuthenticated = false

        },
        clearCart(state) {
            state.cart = { items: [] }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        setUserId(state, value) {
            state.user_id = value
        },
        // removeUserId(state) {
        //     state.user_id = ''
        // }
    },
    actions: {},
    modules: {}
})