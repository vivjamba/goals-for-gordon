import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingView from '../views/LandingView.vue'
import GoalDetailView from '../views/GoalDetailView.vue'
import GoalContainerView from '../views/GoalContainerView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/:userid',
        name:'user',
        component: { render: () => h( LandingView ) },
        children: [
          {
              path: 'goal/:goalid',
              name:'goal',
              component: GoalDetailView
          }
          
        ]
    },
  ]
})

export default router
