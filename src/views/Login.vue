<template>
  <div class="page-log-in">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Log in</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username" />
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password" />
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Log in</button>
            </div>
          </div>

          <hr />

          Or
          <router-link to="/signup">click here</router-link>
          to sign up!
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Login | Djackets";
  },
  methods: {
    async submitForm() {
      this.errors = [];
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      if (this.username === "") {
        this.errors.push("Username must not be empty!");
      }
      if (this.password === "") {
        this.errors.push("Password must not be empty!");
      }
      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        };
        await axios
          .post("api/v1/account/login/", formData)
          .then((response) => {
            const token = response.data.access_token;
            console.log("Token: ", token);
            this.$store.commit("setToken", token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("token", token);

            const toPath = this.$route.query.to || "/cart";
            this.$router.push(toPath);

            toast({
              message: "Signed you in!",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 5000,
              position: "bottom-right",
            });
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
            } else {
              this.errors.push("Something went wrong. Please try again");
              console.log(JSON.stringify(error));
            }
          });
      }
    },
  },
};
</script>

<style scoped>
</style>