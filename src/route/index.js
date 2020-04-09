export default [
  {
    path: '/',
    exact: true,
    component: require('./Entry').default
  },

  {
    path: '/about',
    exact: true,
    component: require('./About').default
  },

  {
    path: '/upgrade',
    exact: true,
    component: require('./Upgrade').default
  },

  {
    path: '/login',
    exact: true,
    component: require('./Login').default
  }
]
