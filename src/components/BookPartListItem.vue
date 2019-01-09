<template>
  <div>
    <v-card color="accent" class="white--text">
      <v-card-title primary-title class="headline">{{part.title}}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat class="primary" :to="{name: 'bookPart', params: {bookId: bookId, partId: part.id}}">Открыть</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: {
      'part': {
        type: Object,
        required: true,
      },
      'bookId': {
        required: true
      }
    }
  }
</script>

<style scoped>

</style>