export default [
  {
    path: '/',
    exact: true,
    component: require('./entry').default
  },

  {
    path: '/login',
    exact: true,
    component: require('./login').default
  },

  {
    path: '/about',
    exact: true,
    component: require('./about').default
  },
]
