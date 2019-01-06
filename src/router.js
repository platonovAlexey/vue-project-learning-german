import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Home from './views/Home.vue';
import Books from './views/Books.vue';
import Words from './views/Words.vue';
import Profile from './views/Profile.vue';
import Signin from './views/Signin.vue';
import Signup from './views/Signup.vue';
import Store from './store';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/books',
      name: 'books',
      component: Books,
    },
    {
      path: '/words',
      name: 'words',
      component: Words,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      // eslint-disable-next-line no-use-before-define
      beforeEnter: authGuard,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
  ],
});

// function authGuard(from, to, next) {
//   if (Store.getters.isUserAuthenticated) {
//     next();
//   } else {
//     next('signin');
//   }
// }

function authGuard(to, from, next) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) next();
    else next('/signin');
  });
}
