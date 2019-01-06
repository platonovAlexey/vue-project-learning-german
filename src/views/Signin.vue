<template>
    <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Вход</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert
              :value="error"
              type="warning"
            >
            {{error}}
            </v-alert>
            <v-form>
              <v-text-field prepend-icon="person" name="login" label="E-mail" type="email" required v-model="email"></v-text-field>
              <v-text-field id="password" prepend-icon="lock" name="password" label="Пароль" type="password" required v-model="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.prevent="signin" :disabled="processing">Войти</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
      data () {
          return {
              email: null,
              password: null
          }
      },
      computed: {
        error () {
          return this.$store.getters.getError
        },
        processing () {
          return this.$store.getters.getProcessing
        },
        isUserAuthenticated () {
          return this.$store.getters.isUserAuthenticated
        }
      },
      watch: {
        isUserAuthenticated(val) {
          if (val === true) {
            this.$router.push('/')
          }
        }
      },
      methods: {
          signin () {
              this.$store.dispatch('signIn', {email: this.email, password: this.password})
          }
      }
  }
</script>

<style scoped>

</style>