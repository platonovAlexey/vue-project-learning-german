/* eslint-disable import/order */
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vuetify/dist/vuetify.min.css';
import firebase from 'firebase';
import firebaseConfig from './config/firebase';
import "firebase/firestore"
import VuetifyConfirm from 'vuetify-confirm';
import VueYouTubeEmbed from 'vue-youtube-embed';

Vue.use(Vuetify);
Vue.use(VueYouTubeEmbed);

Vue.config.productionTip = false;

Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Да',
  buttonFalseText: 'Нет',
  width: 400,
});

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

db.settings({
  timestampsInSnapshots: true,
});

Vue.$db = db;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('stateChanged', user);
    });

    this.$store.dispatch('loadBooks');
  },
}).$mount('#app');
