<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            User Menu
          </div>
          <div class="panel-body">
            <ul>
              <li><a href="#"><i class="fa fa-user"></i> My Profile</a></li>
              <li><a href="#"><i class="fa fa-edit"></i> My Orders</a></li>
              <li><a href="#"><i class="fa fa-envelope-o"></i> Edit Profile</a></li>
            </ul>
          </div>
        </div>

      </div>

    </div>
    <div class="page-my-account">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h2 class="title" v-show="orders.length">My orders</h2>
          <OrderSummary v-for="order in orders" v-bind:key="order.id" v-bind:order="order" />
        </div>
        <hr />
        <div class="column is-12">
          <button @click="logout()" class="button is-danger is-rounded">Log out</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import axios from "axios";
import OrderSummary from "@/components/OrderSummary.vue";
export default {
  name: "MyAccount",
  components: {
    OrderSummary,
  },
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    document.title = "My account | VietShop";
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
<style type="text/css">
body {
  margin-top: 20px;
  background: #eee;
}

.tab-pane {
  padding-top: 20px;
}

.panel-body>ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.panel-body>ul>li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.panel-body>ul>li>a {
  display: block;
  padding: 8px 0;
  font-weight: 600;
  font-size: 11px;
  color: #777777;
  text-transform: uppercase;
  text-decoration: none;
}

@import '~font-awesome/css/font-awesome.min.css';
@import '~bootstrap/dist/css/bootstrap.min.css';
</style>
  