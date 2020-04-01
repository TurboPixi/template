module.exports = {
  presets: [
    ['@babel/env', {useBuiltIns: 'usage', corejs: 3}],
    '@babel/react'
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/proposal-private-methods',
    '@babel/proposal-class-properties',
    '@babel/proposal-export-default-from',
    '@babel/proposal-export-namespace-from',
    ['@babel/transform-runtime', {
      corejs: 3,
      helpers: true,
      regenerator: true,
      useESModules: true
    }],
    [
      '@babel/proposal-pipeline-operator', {
        proposal: 'smart'
      }
    ]
  ]
}
