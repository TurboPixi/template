export default [
  {
    path: '/',
    exact: true,
    component: require('./Entry').default
  },

  {
    path: '/login',
    exact: true,
    component: require('./Login').default
  }
]
