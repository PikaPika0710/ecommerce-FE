<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
      </div>

      <ProductBox
          v-for="product in category.products"
          v-bind:key="product.id"
          v-bind:product="product"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProductBox from '@/components/ProductBox.vue'

export default {
  name: "Category",
  components: {
    ProductBox
  },
  data() {
    return {
      category: {
        products: []
      },
    }
  },
  computed() {

  },
  mounted() {
    this.getCategory()
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Category') {
        this.getCategory()
      }
    }
  },
  methods: {
    async getCategory() {
      this.$store.commit('setIsLoading', true)
      const id = this.$route.params.id
      await axios.get(`api/v1/category/${id}/`).then(response => {
        this.category = response.data
        document.title = this.category.name + ' | Djackets'
      })
          .catch(error => console.log(error))
      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>
<style scoped>

</style>