<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong>VietShop</strong></router-link>

        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu"
          @click="showMobileMenu = !showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" id="navbar-menu" v-bind:class="{ 'is-active': showMobileMenu }">
        <div class="navbar-start">
          <div class="navbar-item">
            <form method="get" action="/product/search">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input" placeholder="What are you looking for?" name="query" />
                </div>
                <div class="control">
                  <button class="button is-success">
                    <span class="icon">
                      <i class="fas fa-search"></i>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="navbar-end">
          <div v-for="category in categories" class="navbar-end" v-bind:key="category.id">
            <router-link v-bind:to="category.get_absolute_url" class="navbar-item">{{ category.name }}</router-link>
          </div>
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/cart" class="button is-success is-rounded">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span> Cart ({{ cartTotalLength }})</span>
              </router-link>

              <template v-if="$store.state.isAuthenticated">
                <router-link to="/my-account" class="button is-rounded is-danger">Account</router-link>
              </template>

              <template v-else>
                <router-link to="/login" class="button is-rounded is-light">Log in</router-link>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="is-loading-bar has-text-centered" v-bind:class="{ 'is-loading': $store.state.isLoading }">
      <div class="lds-dual-ring"></div>
    </div>

    <section class="section">
      <router-view />
    </section>

    <footer class="footer">
      <p class="has-text-centered">
        Copyright (C) Viet Dev 2022 - Ecommerce Website
      </p>
      <div style="padding: 10px" class="has-text-centered">
        <!-- Facebook -->
        <a style="color: #3b5998" href="https://www.facebook.com/pikapika0710/" role="button"><i
            class="fab fa-facebook-f fa-lg" style="padding: 10px"></i></a>

        <!-- Twitter -->
        <a style="color: #55acee" href="https://twitter.com/TrnCngVit2" role="button"><i class="fab fa-twitter fa-lg"
            style="padding: 10px"></i></a>

        <!-- Google -->
        <a style="color: #dd4b39" href="https://mail.google.com/mail/?view=cm&fs=1&to=trancongviet0710@gmail.com
" role="button"><i class="fab fa-google fa-lg" style="padding: 10px"></i></a>

        <!-- Instagram -->
        <a style="color: #ac2bac" href="https://www.instagram.com/tranviet._.0710/" role="button"><i
            class="fab fa-instagram fa-lg" style="padding: 10px"></i></a>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: [],
      },
      categories: [],
    };
  },
  beforeCreate() {
    this.$store.commit("initializeStore");

    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  mounted() {
    this.cart = this.$store.state.cart;
    this.getCategories();
  },
  methods: {
    getCategories() {
      axios
        .get("api/v1/category/")
        .then((response) => (this.categories = response.data))
        .catch((error) => console.log(error));
    },
  },
  computed: {
    getCart() {
      return this.$store.state.cart;
    },
    cartTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.getCart.items.length; i++) {
        totalLength += this.getCart.items[i].quantity;
      }
      return totalLength;
    },
  },
};
</script>

<style lang="scss">
@import "../node_modules/bulma";

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}

// .footer {
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   height: 5px;
// }
</style>
