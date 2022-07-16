<template>
    <div>
        <div class="column is-12" id="my_profile">
            <h2 class="title">My orders</h2>
            <OrderSummary v-for="order in orders" v-bind:key="order.id" v-bind:order="order" />
        </div>
    </div>
</template>
<script>
import axios from "axios";
import OrderSummary from "@/components/OrderSummary.vue";
export default {
    name: "Order",
    components: {
        OrderSummary,
    },
    data() {
        return {
            orders: [],
        };
    },
    mounted() {
        document.title = "VietShop | My Orders";
        this.getMyOrders();
    },
    methods: {
        logout() {
            axios.defaults.headers.common["Authorization"] = "";
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userid");
            this.$store.commit("removeToken");
            this.$router.push("/");
        },
        async getMyOrders() {
            this.$store.commit("setIsLoading", true);
            await axios
                .get("/api/v1/order/your_order")
                .then((response) => {
                    this.orders = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
            this.$store.commit("setIsLoading", false);
        },
    },
};
</script>
<style>
</style>