<template>
  <div class="column is-3">
    <div class="box">
      <figure class="image mb-4">
        <img :src="product.get_thumbnail" alt="">
      </figure>
      <div class="box_name">
        <h3 class="is-size-4">{{ product.name }}</h3>
      </div>
      <p class="id-size-6-has-text-grey">${{ product.price }}</p>
      <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">View details</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductBox',
  data() {

  },
  props: {
    product: Object
  }
}
</script>

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}

.box_name {
  height: 150px;
}
</style>