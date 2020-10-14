<template>
  <div class="container">
    <div class="columns is-multiline is-mobile is-centered">
      <div class="column is-one-quarter" v-for="img in images" :key="img.id">
        <Card :image="img" />
      </div>
      <div v-if="!images || !images.length" class="is-size-3">
        No results found
      </div>
    </div>
  </div>
</template>

<script>
  import Card from './Card';
  export default {
    name: 'SearchResult',
    props: {
      images: Array
    },
    components: {
      Card
    }
  }
</script>