import Vue from 'vue';
import Vuex from 'vuex';
import userModules from './store/user';
import generalModules from './store/general';
import booksModules from './store/books';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModules,
    generalModules,
    booksModules,
  },
});
