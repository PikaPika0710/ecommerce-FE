<template>
  <!-- <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Sign up</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username">
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password">
            </div>
          </div>

          <div class="field">
            <label>Repeat password</label>
            <div class="control">
              <input type="password" class="input" v-model="password_2">
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Sign up</button>
            </div>
          </div>

          <hr>

          Or
          <router-link to="/login">click here</router-link>
          to log in!
        </form>
      </div>
    </div>
  </div> -->
  <section class="">
    <div class="container py-5 h-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-12 col-lg-9 col-xl-7">
          <div class="card shadow-2-strong card-registration" style="border-radius: 15px;">
            <div class="card-body p-4 p-md-5">
              <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">User Registration</h3>
              <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <input type="text" id="name" class="form-control form-control-lg" placeholder="Name"
                      v-model="name" />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <input type="text" id="career" class="form-control form-control-lg" placeholder="Career"
                      v-model="career" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4 d-flex align-items-center">
                  <div class="form-outline datepicker w-100">
                    <input type="date" class="form-control form-control-lg" id="birthdayDate" v-model="birthday" />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <h6 class="mb-2 pb-1">Gender: </h6>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="" id="femaleGender" value="Nữ"
                      v-model="gender" />
                    <label class="form-check-label" for="femaleGender">Female</label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="" id="maleGender" value="Nam" v-model="gender" />
                    <label class="form-check-label" for="maleGender">Male</label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="" id="otherGender" value="Khác"
                      v-model="gender" />
                    <label class="form-check-label" for="otherGender">Other</label>
                  </div>

                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4 pb-2">

                  <div class="form-outline">
                    <input type="email" id="emailAddress" class="form-control form-control-lg" placeholder="Email"
                      v-model="email" />
                  </div>

                </div>
                <div class=" col-md-6 mb-4 pb-2">
                  <div class="form-outline">
                    <input type="tel" id="phoneNumber" class="form-control form-control-lg" placeholder="Phone number"
                      v-model="phone" />
                  </div>

                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-4 ">
                  <div class="form-outline">
                    <input type="text" id="username" class="form-control form-control-lg" placeholder="Username"
                      v-model="username" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4 pb-2">
                  <div class="form-outline">
                    <input type="password" id="password" class="form-control form-control-lg" placeholder="Password"
                      v-model="password" />
                  </div>

                </div>
                <div class=" col-md-6 mb-4 pb-2">
                  <div class="form-outline">
                    <input type="password" id="password_2" class="form-control form-control-lg" placeholder="Password_2"
                      v-model="password_2" />
                  </div>

                </div>
              </div>
              <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
              </div>
              <button class="btn btn-primary btn-lg" type="submit" @click="submitForm">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


</template>


<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Signup",
  data() {
    return {
      name: '',
      phone: '',
      birthday: '',
      email: '',
      gender: '',
      career: '',
      username: '',
      password: '',
      password_2: '',
      errors: [],
    }
  },
  mounted() {
    document.title = 'Sign Up | VietShop'
  },
  methods: {
    async submitForm() {
      this.errors = []
      if (this.username === '') {
        this.errors.push('The username is missing.')
      }

      if (this.password === '') {
        this.errors.push('The password is too short.')
      }

      if (this.password_2 !== this.password) {
        this.errors.push('The password does not match.')
      }

      if (!this.errors.length) {
        const formData = {
          name: this.name,
          phone: this.phone,
          birthday: this.birthday,
          career: this.career,
          email: this.email,
          gender: this.gender,
          username: this.username,
          password: this.password

        }

        await axios.post('api/v1/account/sign_up/', formData).then(response => {
          toast({
            message: 'Account created, please log in!',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 5000,
            position: 'bottom-right',
          })
          this.$router.push('/login')
        }).catch((error) => {
          if (error.response.length < 100) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`)
            }
            // console.log(JSON.stringify(error.response.data))
          } else if (error.message) {
            this.errors.push('Something went wrong. Please try again')
            // console.log(JSON.stringify(error))
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.gradient-custom {
  /* fallback for old browsers */
  background: #f093fb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to bottom right, rgba(240, 147, 251, 1), rgba(245, 87, 108, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to bottom right, rgba(240, 147, 251, 1), rgba(245, 87, 108, 1))
}

.card-registration .select-input.form-control[readonly]:not([disabled]) {
  font-size: 1rem;
  line-height: 2.15;
  padding-left: .75em;
  padding-right: .75em;
}

.card-registration .select-arrow {
  top: 13px;
}
</style>