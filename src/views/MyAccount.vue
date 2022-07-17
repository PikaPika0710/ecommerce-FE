<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <div class="panel panel-default" style="text-align: center;">
          <div class="panel-heading">
            User Menu
          </div>
          <div class="panel-body">
            <ul>
              <li>
                <router-link to=""><i class="fa fa-user"></i> My Profile</router-link>
              </li>
              <li>
                <router-link to="/my-orders"><i class="fa fa-edit"></i> My Orders</router-link>
              </li>
              <li>
                <router-link to="/my-vouchers"><i class="fa fa-gift"></i> Vouchers</router-link>
              </li>
              <li>
                <router-link to="/notifications"><i class="fa fa-bell"></i> Notifications</router-link>
              </li>
            </ul>
          </div>
          <div>
            <button @click="logout()" class="button is-danger is-rounded">Log out</button>
          </div>
        </div>
      </div>
      <div class="col-sm-9" @change="change = !change">
        <div class="panel panel-default">
          <div class="panel-heading" style="text-align: center;">
            Profile
          </div>
          <div class=" row mt-3">
            <div class="col-md-12"><label class="labels">Name</label><input type="text" class="form-control"
                placeholder="Name" v-model="user.name"></div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12"><label class="labels">Phone Number</label><input type="text" class="form-control"
                placeholder="Phone number" v-model="user.phone"></div>
            <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control"
                placeholder="Email" v-model="user.email"></div>
            <div class="col-md-12"><label class="labels">Career</label><input type="text" class="form-control"
                placeholder="Career" v-model="user.career"></div>
          </div>
          <div class="row mt-3">
            <div class="col-md-6"><label class="labels">Gender</label><input type="text" class="form-control"
                placeholder="Gender" v-model="user.gender"></div>
            <div class="col-md-6"><label class="labels">Birthday</label><input type="date" class="form-control"
                placeholder="Birthday" v-model="user.birthday"></div>
          </div>
          <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button"
              @click="save_profile()" :disabled="change">Save
              Profile</button></div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import axios from 'axios';
export default {
  name: "MyAccount",
  mounted() {
    document.title = "VietShop | My Account";
    this.getUser();
  },
  data() {
    return {
      user: {},
      change: true,
      user_id: '',
    }
  },
  methods: {
    async getUser() {
      this.$store.commit("setIsLoading", true);
      await axios.get('/api/v1/user/get_info').
        then(response => {
          this.user = response.data;
        }).
        catch(error => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
    async save_profile() {
      const form_data = {
        name: this.user.name,
        phone: this.user.phone,
        email: this.user.email,
        career: this.user.career,
        gender: this.user.gender,
        birthday: this.user.birthday
      }

      await axios.put('api/v1/user/' + this.$store.state.user_id + '/', form_data).then(response => {
        toast({
          message: 'Update sucessfully!',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 5000,
          position: 'bottom-right',
        })
        this.$router.push('/my-account/')
      }).catch((error) => {
        if (error.response) {
          for (const property in error.response.data) {
            this.errors.push(`${property}: ${error.response.data[property]}`)
          }
          console.log(JSON.stringify(error.response.data))
        } else if (error.message) {
          this.errors.push('Something went wrong. Please try again')

          console.log(JSON.stringify(error))
        }
      })
    },
    logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
      this.$store.commit("removeToken");
      this.$router.push("/");
    },
  }
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

body {
  background: rgb(99, 39, 120)
}

.form-control:focus {
  box-shadow: none;
  border-color: #BA68C8
}

.profile-button {
  background: rgb(99, 39, 120);
  box-shadow: none;
  border: none
}

.profile-button:hover {
  background: #682773
}

.profile-button:focus {
  background: #682773;
  box-shadow: none
}

.profile-button:active {
  background: #682773;
  box-shadow: none
}

.back:hover {
  color: #682773;
  cursor: pointer
}

.labels {
  font-size: 15px;
  padding: 5px;
}

.add-experience:hover {
  background: #BA68C8;
  color: #fff;
  cursor: pointer;
  border: solid 1px #BA68C8
}

@import '~font-awesome/css/font-awesome.min.css';
@import '~bootstrap/dist/css/bootstrap.min.css';
</style>
  