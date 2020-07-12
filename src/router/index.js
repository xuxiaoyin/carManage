import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/infoManage',
    component: Layout,
    redirect: '/infoManage/power',
    name: 'infoManage',
    meta: { title: '信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'power',
        name: 'Power',
        component: () => import('@/views/infoManage/power/index'),
        meta: { title: '权限管理', icon: 'table' }
      },
      {
        path: 'customer',
        name: 'Customer',
        redirect: '/infoManage/customer/list',
        component: () => import('@/views/infoManage/customer/index'),
        meta: { title: '客户管理', icon: 'tree' },
        children: [
          {
            path: 'list',
            hidden: true,
            component: () => import('@/views/infoManage/customer/list'),
            name: 'driver-list',
            meta: { title: '客户列表', activeMenu: '/infoManage/customer' }
          },
          {
            path: 'customer-add',
            hidden: true,
            component: () => import('@/views/infoManage/customer/add/index'),
            name: 'customer-add',
            meta: { title: '新增客户', activeMenu: '/infoManage/customer' }
          }
        ]
      },
      {
        path: 'staff',
        name: 'Staff',
        component: () => import('@/views/infoManage/staff/index'),
        redirect: '/infoManage/staff/list',
        meta: { title: '员工管理', icon: 'tree' },
        children: [
          {
            path: 'list',
            hidden: true,
            component: () => import('@/views/infoManage/staff/list'),
            name: 'driver-list',
            meta: { title: '员工列表', activeMenu: '/infoManage/staff' }
          },
          {
            path: 'staff-add',
            hidden: true,
            component: () => import('@/views/infoManage/staff/add/index'),
            name: 'staff-add',
            meta: { title: '新增员工', activeMenu: '/infoManage/staff' }
          }
        ]
      },
      {
        path: 'driver',
        name: 'Driver',
        redirect: '/infoManage/driver/list',
        component: () => import('@/views/infoManage/driver/index'),
        meta: { title: '司机管理', icon: 'tree' },
        children: [
          {
            path: 'list',
            hidden: true,
            component: () => import('@/views/infoManage/driver/list'),
            name: 'driver-list',
            meta: { title: '司机列表', activeMenu: '/infoManage/driver' }
          },
          {
            path: 'driver-add',
            hidden: true,
            component: () => import('@/views/infoManage/driver/add/index'),
            name: 'driver-add',
            meta: { title: '新增司机', activeMenu: '/infoManage/driver' }
          }
        ]
      },
      {
        path: 'car',
        name: 'Car',
        redirect: '/infoManage/car/list',
        component: () => import('@/views/infoManage/car/index'),
        meta: { title: '车辆管理', icon: 'tree' },
        children: [
          {
            path: 'list',
            name: 'carList',
            component: () => import('@/views/infoManage/car/list'),
            meta: { title: '车辆列表' }
          },
          {
            path: 'longTermList',
            name: 'longTermList',
            component: () => import('@/views/infoManage/car/longTermList'),
            meta: { title: '长租车辆列表' }
          },
          {
            path: 'relyList',
            name: 'relyList',
            component: () => import('@/views/infoManage/car/relyList'),
            meta: { title: '挂靠车辆列表' }
          },
          {
            path: 'carlist-add',
            hidden: true,
            component: () => import('@/views/infoManage/car/add/addList'),
            name: 'carlist-add',
            meta: { title: '新增车辆', activeMenu: '/infoManage/car/list' }
          },
          {
            path: 'longTermList-add',
            hidden: true,
            component: () => import('@/views/infoManage/car/add/addLongTermList'),
            name: 'longTermList-add',
            meta: { title: '添加长租车辆', activeMenu: '/infoManage/car/longTermList' }
          },
          {
            path: 'relyList-add',
            hidden: true,
            component: () => import('@/views/infoManage/car/add/addRelyList'),
            name: 'relyList-add',
            meta: { title: '添加挂靠车辆', activeMenu: '/infoManage/car/relyList' }
          }
        ]
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
