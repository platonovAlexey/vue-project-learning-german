<template>
  <v-container grid-list-md v-if="book">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <book-details :book="book"></book-details>
      </v-flex>
      <v-flex v-for="(part, index) in book.parts" :key="index" xs12 sm10 offset-sm1>
        <book-part-list-item :part="part" :bookId="book.id"></book-part-list-item>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import BookDetails from '../components/BookDetails'
  import BookPartListItem from '../components/BookPartListItem'

  export default {
    props: {
      'id': {
        type: String,
        required: true
      }
    },
    components: {
      BookDetails,
      BookPartListItem
    },
    computed: {
      book () {
        return this.$store.getters.getBooks.find(b => b.id === this.id)
      }
    }
  }
</script>

<style scoped>

</style>