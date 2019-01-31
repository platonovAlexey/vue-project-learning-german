<template>
  <v-container grid-list-md v-if="part">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <book-part-content :part="part"></book-part-content>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1>
        <book-part-words :words="part.words"></book-part-words>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vue from 'vue'
  import BookPartContent from '../components/BookPartContent'
  import BookPartWords from '../components/BookPartWords'
  export default {
    data () {
      return {
        part: null
      }
    },
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
    components: {
      BookPartContent,
      BookPartWords
    },
    computed: {
      // part () {
      //   let val = this.$store.getters.getParts.find(b => b.bookId === this.bookId && b.bookPartId === this.partId)
      //   // console.log('val', val)
      //   return val
      // }
    },
    created () {
      console.log(Vue.$db.collection('bookParts'))
      Vue.$db.collection('bookParts')
          .where('bookId', '==', this.bookId)
          .where('bookPartId', '==', this.partId)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(s => {
              this.part = s.data()
            })
          })
          .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>