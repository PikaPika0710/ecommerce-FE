<template>
  <div class="page-product">
    <div class="columns is-multiline">
      <div class="column is-9">
        <figure class="image mb-6">
          <img v-bind:src="product.get_image" alt="" />
        </figure>

        <h1 class="title">{{ product.name }}</h1>

        <p>{{ product.description }}</p>
      </div>

      <div class="column is-3">
        <h2 class="subtitle">Information</h2>

        <p><strong>Price: </strong>${{ product.price }}</p>

        <div class="field has-addons mt-6">
          <div class="control">
            <input type="number" class="input" min="1" v-model="quantity" />
          </div>

          <div class="control">
            <a class="button is-dark" @click="addToCart()">Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Product",
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      this.$store.commit("setIsLoading", true);
      const id = this.$route.params.id;

      await axios
        .get(`/api/v1/product/${id}/`)
        .then((response) => {
          this.product = response.data;

          document.title = this.product.name + " | VietShop";
        })
        .catch((error) => console.log(error));

      this.$store.commit("setIsLoading", false);
    },
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      if (!this.$store.state.isAuthenticated) {
        toast({
          message: "Please login before adding to cart!",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
          duration: 5000,
          position: "bottom-right",
        });
      } else {
        const item = {
          product: this.product,
          quantity: this.quantity,
        };
        this.$store.commit("addToCart", item);
        toast({
          message: "The product has been added to the cart",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
          duration: 5000,
          position: "bottom-right",
        });
      }
    },
  },
};
</script>
<style scoped>
img {
  width: 50%;
  height: 50%;
}
</style>