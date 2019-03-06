<template>
  <div>
    <v-card v-if="currentWord" class="mt-2" dark>
      <v-card-title>
        <div class="headline">
          <OriginalWord :word="currentWord" :size="45"/>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="headline" v-if="currentWord.showTrans">
        {{currentWord.transText}}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark small color="primary" 
               @click="currentWord.showTrans = true" 
               v-if="!currentWord.showTrans">
        <v-icon>visibility</v-icon> Показать перевод
        </v-btn>
        <v-btn small dark color="success" @click="processWord(currentWord)">
          <v-icon>check</v-icon> Я запомнил(а) это слово
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mt-2">
      <v-card-title class="display-1" v-if="words.length">
        <span>Все слова на сегодня: {{words.length}}</span>
      </v-card-title>
      <v-card-title v-else>
        <span>Нет слов для изучения. Добавляйте новые слова из книг</span>
      </v-card-title>
      <v-card-text>
        <v-list>
          <div v-for="(word, index) in words" :key="index">
            <v-list-tile @click="selectWord(word)">
              <div class="title pa-1">
                <OriginalWord :word="word" :size="35" />
              </div>
            </v-list-tile>
          </div>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import OriginalWord from './OriginalWord'
  export default {
    name: "UserProfileWords",
    data () {
      return {
        words: [],
        currentWord: null
      }
    },
    components: {
      OriginalWord
    },
    methods: {
      setWords () {
        this.words = []
        let userWords = this.$store.getters.userData.words
        for(let property in userWords) {
          if(userWords.hasOwnProperty(property)){
            let word = userWords[property]

            let isAvailable = (word.nextShowDate instanceof Date)
              ? word.nextShowDate <= new Date()
              : word.nextShowDate.toDate() <= new Date()

            if(isAvailable) {
              this.words.push({
                origText: word.origText,
                origPrefix: word.origPrefix,
                transText: word.transText,
                type: word.type,
                key: property,
                showTrans: false
              })
            }
          }
        }

        this.currentWord = this.words.length > 0 ? this.words[0] : null
      },
      processWord (word) {
        this.$store.dispatch('processUserWord', word.key)
      },
      selectWord (word) {
        word.showTrans = false
        this.currentWord = word
      }
    },
    mounted() {
      this.$bus.$on('userword:updated', () => {
        this.setWords()
      })
      this.setWords()
    }
  }
</script>

<style scoped>

</style>