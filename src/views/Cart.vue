<template>
  <div class="page-cart">
    <div class="columns is-multiline" v-if="this.$store.state.isAuthenticated">
      <div class="column is-12">
        <h1 class="title">Cart</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth" v-if="cartTotalLength">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <CartItem v-for="item in cart.items" v-bind:key="item.product.id" v-bind:initialItem="item"
              v-on:removeFromCart="removeFromCart">
            </CartItem>
          </tbody>
        </table>

        <p v-else>You don't have any products in your cart...</p>
      </div>
      <div class="column is-12 box">
        <h2 class="subtitle">Summary</h2>
        <strong>${{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items
        <hr />
        <router-link to="/cart/checkout" class="button is-dark" v-show="cart.items.length">Proceed to checkout
        </router-link>
      </div>
    </div>
    <div class="alert" v-else>
      You must login before shopping ^^. Let's enjoy!
    </div>
  </div>
</template>
<script>
import CartItem from "@/components/CartItem.vue";

export default {
  name: "Cart",
  components: {
    CartItem,
  },
  data() {
    return {
      cart: {
        items: [],
      },
    };
  },
  methods: {
    removeFromCart(item) {
      this.cart.items = this.cart.items.filter(
        (i) => i.product.id !== item.product.id
      );
    },
  },
  mounted() {
    this.cart = this.$store.state.cart;
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity * curVal.product.price);
      }, 0);
    },
  },
};
</script>
<style scoped>
/* The alert message box */
.alert {
  padding: 20px;
  background-color: rgb(19, 121, 155);
  /* Red */
  color: white;
  margin-bottom: 15px;
}
</style>