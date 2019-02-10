<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0"><v-icon>person</v-icon>{{userName}}</h3>
          <h3 class="headline mb-0"><v-icon>email</v-icon>{{userEmail}}</h3>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="420">
          <v-btn slot="activator" color="orange" dark>Изменить мои данные</v-btn>
          <v-card>
            <v-card-title class="headline">Изменить мои данные ?</v-card-title>
            <v-card-text>
              <v-alert :value="getError" type="warning">
                {{getError}}
              </v-alert>
              <v-form v-model="valid">
                <v-text-field prepend-icon="person" name="login" label="E-mail" type="email" required v-model="email" :rules="emailRules"></v-text-field>
                <v-text-field id="password" prepend-icon="lock" name="password" label="Пароль" type="password" required v-model="password" :rules="passwordRules"></v-text-field>
                <h3>Я хочу изменить</h3>
                <v-radio-group v-model="changeType">
                  <v-radio label="Имя" :value="'name'"></v-radio>
                  <v-text-field v-if="changeType === 'name'" label="Новое имя" prepend-icon="person" name="newname" type="text" required v-model="newname" :rules="nameRules"></v-text-field>
                  <v-radio label="Email" :value="'email'"></v-radio>
                  <v-text-field v-if="changeType === 'email'" label="Новый e-mail" prepend-icon="email" name="newlogin" type="email" required v-model="newemail" :rules="emailRules"></v-text-field>
                  <v-radio label="Пароль" :value="'password'"></v-radio>
                  <v-text-field v-if="changeType === 'password'" label="Новый пароль" prepend-icon="lock" name="newpassword" type="password" required v-model="newpassword" :rules="passwordRules"></v-text-field>
                </v-radio-group>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="dialog = false">Отмена</v-btn>
              <v-btn color="green darken-1" flat @click.prevent="changeUserData" :disabled="getProcessing || !valid">Изменить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        changeType: 'name',
        dialog: false,
        email: null,
        password: null,
        newname: null,
        newemail: null,
        newpassword: null,
        valid: false,
        emailRules: [
          v => !!v || 'Пожалуйста введите e-mail',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Не правильный e-mail'
        ],
        passwordRules: [
          v => !!v || 'Пожалуйста введите пароль',
          v => (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'
        ],
        nameRules: [
          v => !!v || 'Пожалуйста введите ваше имя',
        ],
      }
    },
    computed: {
      ...mapGetters(['userName', 'userEmail', 'getProcessing', 'getError'])
    },
    methods: {
      changeUserData () {
        this.$store.dispatch('changeUserProfileData', {
          email: this.email,
          password: this.password,
          newName: this.newname,
          newEmail: this.newemail,
          newPassword: this.newpassword,
          changeType: this.changeType,
        })
      }
    },
  }
</script>

<style scoped>

</style>