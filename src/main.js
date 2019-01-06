import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vuetify/dist/vuetify.min.css';
import firebase from 'firebase';
import firebaseConfig from './config/firebase';

Vue.use(Vuetify);


Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('stateChanged', user);
    });
  },
}).$mount('#app');
