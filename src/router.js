import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Books from '@/components/Books.vue';
import Words from '@/components/Words.vue';
import Profile from '@/components/Profile.vue';
import Signin from '@/components/Signin.vue';
import Signup from '@/components/Signup.vue';

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
