import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Home from './views/Home.vue';
import Books from './views/Books.vue';
import Book from './views/Book.vue';
// eslint-disable-next-line import/no-unresolved
import BookPart from './views/BookPart.vue';
import Words from './views/Words.vue';
import Profile from './views/Profile.vue';
import Signin from './views/Signin.vue';
import Signup from './views/Signup.vue';
import Store from './store';


Vue.use(Router);

const router = new Router({
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
      path: '/book/:id',
      name: 'book',
      props: true,
      component: Book,
    },
    {
      path: '/book/:bookId/part/:partId',
      name: 'bookPart',
      props: true,
      component: BookPart,
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
      meta: { authRequired: true },
      // eslint-disable-next-line no-use-before-define
      // beforeEnter: authGuard,
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

router.beforeEach((to, from, next) => {
  Store.dispatch('initAuth')
    .then((user) => {
      if (to.matched.some(route => route.meta.authRequired)) {
        if (user) {
          next();
        } else {
          next('/signin');
        }
      } else {
        next();
      }
    });
});

// function authGuard(from, to, next) {
//   if (Store.getters.isUserAuthenticated) {
//     next();
//   } else {
//     next('signin');
//   }
// }

// function authGuard(to, from, next) {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) next();
//     else next('/signin');
//   });
// }

export default router;
