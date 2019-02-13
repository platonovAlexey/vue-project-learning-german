<template>
  <div>
    <v-container fluid>
    <h4 class="display-1 mb-3">Слова</h4>
    <v-data-iterator
      :items="words"
      :hide-actions="true"
      content-tag="v-layout"
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm12
        md6
        lg6
      >
        <v-card>
          <v-card-title>
            <div class="headline">
              <v-tooltip bottom>
                <v-avatar slot="activator" v-if="props.item.type == 1" color="teal" size="45">
                  <span class="white--text">W</span>
                </v-avatar>
                <span>Слово / das Wort</span>
              </v-tooltip>
              <v-tooltip bottom>
              <v-avatar slot="activator" v-if="props.item.type == 2" color="indigo" size="45">
                <span class="white--text">RW</span>
              </v-avatar>
              <span>Выражение / die Redewendung</span>
              </v-tooltip>
              {{ getFullOriginalWord(props.item) }}
            </div>
            </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="headline">{{props.item.transText}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn fab dark small color="primary" @click="addWord(props.item)" :disabled="checking || processing">
              <v-icon dark>add</v-icon>
            </v-btn>
            <v-snackbar v-model="snackbar" bottom light color="error">
              <v-icon>warning</v-icon> {{ snackbarText }}
            </v-snackbar>
          </v-card-actions>
        </v-card>
        </v-flex>
    </v-data-iterator>
  </v-container>
  </div>
</template>

<script>
  import { getFullOriginalWord } from '../helpers/words'
  export default {
    data () {
      return {
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 4
        },
        snackbar: false,
        snackbarText: null,
        checking: false,
      }
    },
    props: {
      "data": {
        type: Object,
        default: null
      }
    },
    computed: {
      words () {
        if(!this.data) return []

        let words = []

        for(let property in this.data) {
          if(this.data.hasOwnProperty(property)) {
            let word = this.data[property]
            word.key = property
            words.push(word)
          }
        }

        return words
      },
      processing () {
        return this.$store.getters.getProcessing
      },
    },
    methods: {
      getFullOriginalWord: getFullOriginalWord,
      addWord (entity) {
        this.checking = true
        let userWords = this.$store.getters.userData.words
        let wordAdded = userWords[entity.key]

        if(wordAdded) {
          this.snackbar = true
          this.snackbarText = 'Вы уже добавили это слово для изучения'
        } else if(Object.keys(userWords).length > 100) {
          this.snackbar = true
          this.snackbarText = 'Вы уже добавили слишком много слов для изучения'
        } else {
          this.$store.dispatch('addUserWord', entity)
        }

        this.checking = false
      },
    },
  }
</script>

<style scoped>

</style>