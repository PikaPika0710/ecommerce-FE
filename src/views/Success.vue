<template>
  <!-- <div class="page-success">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Thank you very much!</h1>

        <p>Your order will be processed within 48 hours.</p>
      </div>
    </div>
  </div> -->
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto mt-5">
        <div class="payment">
          <div class="payment_header">
            <div class="check">
              <i class="fa fa-check" aria-hidden="true"></i>
            </div>
          </div>
          <div class="content">
            <h1>Payment Success !</h1>
            <p>Your order will be processed within 48 hours.</p>
            <router-link to="/">Go to Home</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success",
  mounted() {
    document.title = "Success | VietShop";
  },
};
</script>

<style type="text/css">
body {
  background: #f2f2f2;
}

.payment {
  border: 1px solid #f2f2f2;
  height: 280px;
  border-radius: 20px;
  background: #fff;
}

.payment_header {
  background: rgba(255, 102, 0, 1);
  padding: 20px;
  border-radius: 20px 20px 0px 0px;
}

.check {
  margin: 0px auto;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #fff;
  text-align: center;
}

.check i {
  vertical-align: middle;
  line-height: 50px;
  font-size: 30px;
}

.content {
  text-align: center;
}

.content h1 {
  font-size: 25px;
  padding-top: 25px;
}

.content a {
  width: 200px;
  height: 35px;
  color: #fff;
  border-radius: 30px;
  padding: 5px 10px;
  background: rgba(255, 102, 0, 1);
  transition: all ease-in-out 0.3s;
}

.content a:hover {
  text-decoration: none;
  background: #000;
}
</style>