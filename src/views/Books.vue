<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12 offset-sm1>
        <BooksList/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BooksList from "../components/BooksList";
export default {
  components: {
    BooksList
  }
};
</script>

<style scoped>
</style>