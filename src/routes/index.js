import {
  CarOutlined,
  UserOutlined,
  RobotOutlined,
  ClusterOutlined,
  MessageOutlined,
  SettingOutlined,
  DashboardOutlined,
  CreditCardOutlined,
  ThunderboltOutlined,
  AccountBookOutlined,
} from '@ant-design/icons'

export default [
  {
    exact: true,
    menu: <span><DashboardOutlined /><span>监控中心</span></span>,
    name: '监控中心',
    routes: [
      {
        path: '/',
        exact: true,
        name: '首页',
        component: require('./Dashboard').default
      }
    ],

    implicit: [
      {
        path: '/info/:id',
        pKey: {name: '详情', path: '/info'}, // 指向高亮菜单项
        exact: true,
        name: 'sss',
        component: require('./Info').default
      }
    ]
  },

  {
    name: '换电站管理',
    exact: true,
    menu: <span><RobotOutlined /><span>换电站管理</span></span>,
    component: require('./Entry').default,
    routes: [
      {
        path: '/info1',
        exact: true,
        name: '详情',
        component: require('./Info').default
      }
    ]
  },

  {
    name: '电池管理',
    exact: true,
    menu: <span><ThunderboltOutlined /><span>电池管理</span></span>,
    component: require('./Entry').default,
    routes: [
      {
        path: '/info2',
        exact: true,
        name: '详情',
        component: require('./Info').default
      }
    ]
  },

  {
    name: '订单管理',
    exact: true,
    menu: <span><AccountBookOutlined /><span>订单管理</span></span>,
    component: require('./Entry').default,
    routes: [
      {
        path: '/info3',
        exact: true,
        name: '详情',
        component: require('./Info').default
      }
    ]
  },

  {
    name: '车辆管理',
    exact: true,
    menu: <span><CarOutlined /><span>车辆管理</span></span>,
    component: require('./Entry').default,
    routes: [
      {
        path: '/info4',
        exact: true,
        name: '详情',
        component: require('./Info').default
      }
    ]
  },

  {
    name: '会员管理',
    exact: true,
    menu: <span><UserOutlined /><span>会员管理</span></span>,
    component: require('./Entry').default,
    routes: [
      {
        path: '/info5',
        exact: true,
        name: '详情',
        component: require('./Info').default
      }
    ]
  },

  {
    name: '计费管理',
    exact: true,
    menu: <span><CreditCardOutlined /><span>计费管理</span></span>,
    component: require('./Entry').default,
    routes: [
      {
        path: '/info6',
        exact: true,
        name: '详情',
        component: require('./Info').default
      }
    ]
  },

  {
    name: '消息管理',
    exact: true,
    menu: <span><MessageOutlined /><span>消息管理</span></span>,
    component: require('./Entry').default,
    routes: [
      {
        path: '/info7',
        exact: true,
        name: '详情',
        component: require('./Info').default
      }
    ]
  },

  {
    name: '资产管理',
    exact: true,
    menu: <span><ClusterOutlined /><span>资产管理</span></span>,
    component: require('./Entry').default,
    routes: [
      {
        path: '/info8',
        exact: true,
        name: '详情',
        component: require('./Info').default
      }
    ]
  },

  {
    name: '系统管理',
    exact: true,
    menu: <span><SettingOutlined /><span>系统管理</span></span>,
    component: require('./Entry').default,
    routes: [
      {
        path: '/info9',
        exact: true,
        name: '详情',
        component: require('./Info').default
      }
    ]
  }
]
