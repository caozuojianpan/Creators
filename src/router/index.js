import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Complain from '@/Views/Complain'
import MakeComplain from '@/Views/MakeComplain'
import ComplainList from '@/Views/ComplainList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
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
          path:"/complain_list",
          name:"ComplainList",
          component: ComplainList
        }]
    }
  ]
})
