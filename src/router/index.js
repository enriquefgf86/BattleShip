import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Games from '../components/Games.vue'
import GamesGrid from '../components/GamesGrid.vue'
import PlayersPoll from '../views/PlayersPoll.vue'
import LogInForm from '../views/LogInForm.vue'
import SignUpForm from '../views/SignUpForm.vue'
// import GameDetail from '../views/GameDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/generalGames/',
    name: 'Games',
    component: Games,
    
  },
  ,
  // {
  //   path: '/generalGamesDetails/:id',
  //   name: 'GamesDetail',
  //   component: GameDetail,
  //   props:true
    
  // },
  {
    path: '/gamesGrid/:gamePlayerId',
    name: 'GamesGrid',
    component:GamesGrid,
    props:true
  },
  {
  path: '/tablePoll',
    name: 'PlayersPoll',
    component:PlayersPoll,
  },
  {
    path: '/logIn',
      name: 'LogInForm',
      component:LogInForm,
    },
    
  {
    path: '/signUp',
      name: 'SignUpForm',
      component:SignUpForm,
    },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
