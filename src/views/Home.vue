<template>
  <div>
    <section v-if="books.length">
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-2">
          <v-flex xs12 sm8>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Случайные книги</div>
              </v-card-title>
              <v-card-text class="layout justify-center">
                <v-carousel xs12 md4>
                  <v-carousel-item 
                    v-for="(book, i) in books" 
                    :key="i" 
                    :src="book.imageUrl"
                    @click="goToBook(book.id)"
                    style="cursor: pointer;"
                  >
                    <div class="bookTitle">{{book.title}}</div>
                  </v-carousel-item>
                </v-carousel>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  computed: {
    books() {
      let books = this.$store.getters.getBooks
      if(!books) return []

      const shuffled = books.sort(() => {
        .5 - Math.random()
      })
      let result = []
      if(shuffled.length < 5)
        result = shuffled
      else
        result = shuffled.slice(0, 5)

      return result
    }
  },
  methods: {
    goToBook(id) {
      this.$router.push({name: 'book', params: {id:id}})
    }
  }
};
</script>

<style scoped lang="scss">
.bookTitle{
  position: absolute;
  color: white;
  font-size: 2em;
  padding: 15px;
  background: rgba(0, 0, 0, .5);
  width: 100%;
  text-align: center;
}
</style>

