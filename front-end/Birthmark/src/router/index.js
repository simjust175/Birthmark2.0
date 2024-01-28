import { createRouter, createWebHistory } from 'vue-router';
import BirthdayArea from '../views/BirthdayArea.vue';
import LoginArea from '../views/LoginArea.vue';
import SignupArea from '../views/SignupArea.vue';
import LandingPage from '../views/LandingPage.vue';
import BirthmarksArea from '../views/headerRoutes/BirthmarksArea.vue';
import ContactUs from '../views/headerRoutes/ContactUs.vue';
import AboutUs from '../views/headerRoutes/AboutUs.vue';
import MarkMultiple from '../views/MarkMultiple.vue';
import ProSignup from '../views/ProSignup.vue';
import ForgotPasswordArea from '../views/ForgotPasswordArea.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/input',
      name: 'BirthdayInput',
      component: BirthdayArea
    },
    {
      path: '/login',
      name: 'LoginArea',
      component: LoginArea
    },
    {
      path: '/signup',
      name: 'SignupArea',
      component: SignupArea
    },
    {
      path: '/marks',
      name: 'BirthmarksArea',
      component: BirthmarksArea
    },
    {
      path: '/about',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/contact',
      name: 'Contactus',
      component: ContactUs
    },
    {
      path: '/prosignup',
      name: 'pro-signup',
      component: ProSignup
    },
    {
      path: '/multimark',
      name: 'mark-mutiple',
      component: MarkMultiple
    },
    {
      path: '/forgot',
      name: 'forgot-password',
      component: ForgotPasswordArea
    },

  ]
})

export default router
