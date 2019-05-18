import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Home from '@/views/Home'
import MakeComplain from '@/views/MakeComplain'
import User from '@/views/User'
import Team from '@/views/Team'
import Audit from '@/views/Audit'
import Uploader from '@/components/Uploader'
import ComplainHistory from '@/views/ComplainHistory'
import UserInfo from "../views/UserInfo";
import ChangeAccount from "../views/ChangeAccount";
import ChangePhone from "../views/ChangePhone";
import QRCode from "../views/QRCode";
import MyReward from "../views/MyReward";
import MyPunish from "../views/MyPunish";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
      name: 'Index',
      component: Index,
      children:[
        {
          path:'/login',
          name:'Login',
          component:Login
        },
        {
          path:'/register',
          name:'Register',
          component:Register
        },

      ]
    },
    {
      path:"/make_complain",
      name:"MakeComplain",
      component: MakeComplain
    },
    {
      path:"/uploader",
      name:"Uploader",
      component: Uploader
    },
    {
      path:"/user",
      name:"User",
      component:User
    },
    {
      path:"/team",
      name:"Team",
      component:Team
    },
    {
      path:"/audit",
      name:"Audit",
      component:Audit
    },
   /* {
      path: '/complain',
      name: 'Complain',
      redirect:"/make_complain",
      component: Complain,
      children:[{
        path:"/make_complain",
        name:"MakeComplain",
        component: MakeComplain
      },
        {
          path:"/complain_status",
          name:"ComplainStatus",
          component: ComplainStatus

        },{
          path:"/complain_history",
          name:"ComplainHistory",
          component: ComplainHistory

        },]
    },*/
    {
      path:"/home",
      name:"Home",
      component:Home
    },
      {
          path:'/userInfo',
          name:'UserInfo',
          component:UserInfo
      },
      {
          path:'/changeAccount',
          name:'ChangeAccount',
          component:ChangeAccount
      },
      {
          path:'/changePhone',
          name:'ChangePhone',
          component:ChangePhone
      },
      {
          path:'/qrCode',
          name:'QRCode',
          component:QRCode
      },
      {
          path:'/myReward',
          name:'MyReward',
          component:MyReward
      },
      {
          path:'/myPunish',
          name:'MyPunish',
          component:MyPunish
      }
  ]
})
