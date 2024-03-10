import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import mainPage from '@/views/mainPage.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import WebCookies from '@/components/WebCookies.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'mainPage',
    component: mainPage
  },
  {
    path: '/loadingscreen',
    name: 'loadingscreen',
    component: LoadingScreen
  },
  // {
  //   path: '/webcookies',
  //   name: 'webcookies',
  //   component: WebCookies
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
