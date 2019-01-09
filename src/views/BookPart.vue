<template>
  <v-container grid-list-md v-if="part">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <!-- Content -->
      </v-flex>
      <v-flex xs12 sm10 offset-sm1>
        <!-- Words -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      'bookId': {
        type: String,
        required: true
      },
      'partId': {
        type: String,
        required: true
      }
    },
    computed: {
      part () {
        let val = this.$store.getters.getParts.find(b => b.bookId === this.bookId && b.bookPartId === this.partId)
      }
    }
  }
</script>

<style scoped>

</style>