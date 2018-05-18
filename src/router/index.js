import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/containers/Main'
import Login from '@/containers/Login'
import Register from '@/containers/Register'
import Home from '@/containers/Home'
import Personal from '@/containers/Personal'
import Information from '@/containers/me/Information'
import PasswordEdition from '@/containers/me/PasswordEdition'
import TelephoneEdition from '@/containers/me/TelephoneEdition'
import MyGoods from '@/containers/goods/MyGoods'
import GoodAddiction from '@/containers/goods/GoodAddiction'
import GoodEdition from '@/containers/goods/GoodEdition'
import GoodDetail from '@/containers/goods/GoodDetail'
import OrderCheck from '@/containers/order/OrderCheck'
import MessageList from '@/containers/message/MessageList'
import MessageDetail from '@/containers/message/MessageDetail'
import OrderList from '@/containers/order/OrderList'
import TodoOrderList from '@/containers/order/TodoOrderList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
      // name: 'HelloWorld',
      // component: HelloWorld
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/goodDetail/:id',
          name: 'goodDetail',
          component: GoodDetail,
        },
        {
          path: '/orderCheck/:id',
          name: 'orderCheck',
          component: OrderCheck,
        },
        {
          path: '/personal',
          name: 'personal',
          component: Personal,
          children: [
            {
              path: '/information',
              name: 'information',
              component: Information,
            },
            {
              path: '/passwordEdition',
              name: 'passwordEdition',
              component: PasswordEdition,
            },
            {
              path: '/telephoneEdition',
              name: 'telephoneEdition',
              component: TelephoneEdition,
            },
            {
              path: '/myGoods',
              name: 'myGoods',
              component: MyGoods,
            },
            {
              path: '/goodAddiction',
              name: 'goodAddiction',
              component: GoodAddiction,
            },
            {
              path: '/goodEdition/:id',
              name: 'goodEdition',
              component: GoodEdition,
            },
            {
              path: '/messageList',
              name: 'messageList',
              component: MessageList,
            },
            {
              path: '/messageDetail/:id',
              name: 'messageDetail',
              component: MessageDetail,
            },
            {
              path: '/orderList',
              name: 'orderList',
              component: OrderList,
            },
            {
              path: '/todoOrderList',
              name: 'todoOrderList',
              component: TodoOrderList,
            }
          ]
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
