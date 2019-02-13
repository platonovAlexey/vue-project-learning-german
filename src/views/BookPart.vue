<template>
  <v-container grid-list-md v-if="part">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 v-if="finishedDate">
        <v-card>
          <v-responsive>
            <v-img max-width="350px" src="https://firebasestorage.googleapis.com/v0/b/lerninggerman.appspot.com/o/erledigt.jpg?alt=media&token=bc19b619-b316-4607-b84f-8311d6106887"></v-img>
          </v-responsive>
          <v-card-title primary-title>
            <div class="headline">Я закончил читать эту часть! {{finishedDate | formattedDate}}</div>
          </v-card-title>
          <v-card-actions>
            <span>Моя оценка</span>
            <v-rating v-model="savedRating" color="success" readonly large></v-rating>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1>
        <book-part-content :part="part"></book-part-content>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1>
        <book-part-words :data="part.words"></book-part-words>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 class="text-xs-center">
        <v-dialog v-model="finishDialog" persistent max-width="600px">
          <v-btn v-if="!finishedDate" slot="activator" color="success" dark @click="finishDialog = true">
            <v-icon>check</v-icon> Я закончил читать эту часть!
          </v-btn>
          <v-card>
            <v-responsive>
              <v-img max-width="350px" src="https://firebasestorage.googleapis.com/v0/b/lerninggerman.appspot.com/o/erledigt.jpg?alt=media&token=bc19b619-b316-4607-b84f-8311d6106887"></v-img>
            </v-responsive>
            <v-card-title primary-title>
              <div class="headline">Я закончил читать эту часть!</div>
            </v-card-title>
            <v-card-text>
              <span>Моя оценка</span>
              <v-rating v-model="rating" color="success" half-increments large></v-rating>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark flat @click.native="finishDialog = false">
                <v-icon>close</v-icon> Закрыть
              </v-btn>
              <v-btn color="success" dark flat @click.native="finishWork">
                <v-icon>check</v-icon> Готово
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
        part: null,
        finishDialog: false,
        rating: 0,
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
    methods: {
      finishWork () {
        this.$store.dispatch('finishUserBookPart', {bookId: this.bookId, partId: this.partId, rating: this.rating})
        this.finishDialog = false
      },
    },
    computed: {
      finishedDate () {
        return this.$store.getters.userData.books[this.bookId].parts[this.partId].finishedDate
      },
      savedRating () {
        return this.$store.getters.userData.books[this.bookId].parts[this.partId].rating
      }
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
          .then(() => {
            this.$store.dispatch('updateUserBookPartStats', {bookId: this.bookId, partId: this.partId})
          })
          .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>